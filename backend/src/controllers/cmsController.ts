import { Request, Response } from 'express';
import Joi from 'joi';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import FormData from 'form-data';

dotenv.config();

const CMS_API_TOKEN = process.env.CMS_API_TOKEN;

// Validation schema for news data
const newsSchema = Joi.object({
  Heading: Joi.string().required().trim().max(200),
  Date: Joi.string().required().trim(),
  Category: Joi.string().required().trim().max(100),
  Description: Joi.string().required().trim().max(500),
  Content: Joi.string().required().trim(),
  // Note: image validation is handled separately
});

/**
 * Get all news from the CMS
 */
export const getNews = async (req: Request, res: Response) => {
  try {
    // Force this to use the environment variable directly 
    // and transform the URL to the proper format
    const apiUrl = (process.env.CMS_API_URL || 'http://localhost:1337').replace(/\/$/, '');
    const cmsApiToken = process.env.CMS_API_TOKEN;
    // We discovered the correct endpoint is news-and-updates-panel
    const newsApiId = process.env.CMS_NEWS_PANEL_API_ID || 'news-and-updates-panel';
    
    if (!apiUrl) {
      console.error('CMS API URL is not configured');
      return res.status(200).json(getFallbackNewsData('CMS API URL not configured'));
    }

    if (!cmsApiToken) {
      console.error('CMS API token is not configured');
      return res.status(200).json(getFallbackNewsData('CMS API token not configured'));
    }
    
    // Log the request for debugging
    console.log(`CMS connection details:`);
    console.log(`- URL: ${apiUrl}`);
    console.log(`- Endpoint: /api/${newsApiId}`);
    console.log(`- Token (first 10 chars): ${cmsApiToken.substring(0, 10)}...`);
    console.log(`- Full URL: ${apiUrl}/api/${newsApiId}?populate=*`);
    
    try {
      const fullUrl = `${apiUrl}/api/${newsApiId}?populate=*`;
      
      // Use the successful authentication method (direct token without 'Bearer' prefix)
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cmsApiToken,
        },
      });
      
      console.log(`Response status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch news: ${response.status} ${response.statusText}`, errorText);
        return res.status(200).json(getFallbackNewsData(`API error: ${response.status} ${response.statusText}`));
      }
      
      const result = await response.json();
      
      // Log the structure of the response to help debug
      console.log('Response data structure:', Object.keys(result));
      console.log('Data array length:', result.data ? result.data.length : 'No data array');
      
      // Process data to match the expected format
      if (!result.data || !Array.isArray(result.data)) {
        console.error('Unexpected response format:', JSON.stringify(result).substring(0, 200));
        return res.status(200).json(getFallbackNewsData('Unexpected API response format'));
      }
      
      const processedData = result.data.map((item: any, index: number) => {
        // Get properties directly from item or use empty object as fallback
        // (Strapi 4 typically has attributes nested, but your API returns them directly in the item)
        const attributes = item || {};
        
        // Add detailed debugging logs for the first item
        if (index === 0) {
          console.log('****** DEBUG ITEM MAPPING START *******');
          console.log('Raw item:', JSON.stringify(item, null, 2));
          console.log('Item ID:', item.id);
          
          // Log values from the item directly
          console.log('Direct Heading value:', item.Heading);
          console.log('Direct Date value:', item.Date);
          console.log('Direct Category value:', item.Category);
          console.log('Direct Excerpt value:', item.Excerpt);
          console.log('Direct Content value:', item.Content);
          
          // Check if Media exists and is correctly structured
          if (item.Media) {
            console.log('Media exists:', JSON.stringify(item.Media, null, 2));
            console.log('Media is array?', Array.isArray(item.Media));
            if (Array.isArray(item.Media) && item.Media.length > 0) {
              console.log('First Media item:', JSON.stringify(item.Media[0], null, 2));
              console.log('First Media URL:', item.Media[0]?.url);
            }
          } else {
            console.log('Media does not exist');
          }
          
          // Check if DOCUMENT exists
          if (item.DOCUMENT) {
            console.log('DOCUMENT exists:', JSON.stringify(item.DOCUMENT, null, 2));
            console.log('DOCUMENT is array?', Array.isArray(item.DOCUMENT));
            if (Array.isArray(item.DOCUMENT) && item.DOCUMENT.length > 0) {
              console.log('First DOCUMENT item:', JSON.stringify(item.DOCUMENT[0], null, 2));
              console.log('First DOCUMENT URL:', item.DOCUMENT[0]?.url);
            }
          } else {
            console.log('DOCUMENT does not exist');
          }
          
          console.log('****** DEBUG ITEM MAPPING END *******');
        }
        
        // Check for Media (new structure) or image (old structure)
        let imageUrl = null;
        
        // Handle Media field which is directly on the item
        if (item.Media && Array.isArray(item.Media) && item.Media.length > 0) {
          const mediaItem = item.Media[0];
          if (mediaItem && mediaItem.url) {
            imageUrl = mediaItem.url.startsWith('http')
              ? mediaItem.url
              : `${apiUrl}${mediaItem.url}`;
          }
        }
        
        // Handle DOCUMENT field for PDF downloads
        let documentUrl = null;
        if (item.DOCUMENT && Array.isArray(item.DOCUMENT) && item.DOCUMENT.length > 0) {
          const documentItem = item.DOCUMENT[0];
          if (documentItem && documentItem.url) {
            documentUrl = documentItem.url.startsWith('http')
              ? documentItem.url
              : `${apiUrl}${documentItem.url}`;
          }
        }
        
        // Use fields directly from the item object
        const result = {
          id: item.id,
          title: item.Heading || 'Untitled',
          date: item.Date || new Date().toISOString(),
          category: item.Category || 'General',
          excerpt: item.Excerpt || '',
          content: item.Content || '',
          image: imageUrl,
          documentUrl: documentUrl // Add the document URL for download
        };
        
        // Log the final processed item
        if (index === 0) {
          console.log('Final processed item:', JSON.stringify(result, null, 2));
        }
        
        return result;
      });
      
      return res.status(200).json(processedData);
    } catch (fetchError: any) {
      console.error('Fetch error details:', fetchError);
      console.log('Returning fallback data since the CMS is unreachable');
      
      let errorReason = 'Unknown error';
      if (fetchError.code === 'ENOTFOUND') {
        errorReason = 'CMS server not found';
      } else if (fetchError.code === 'ECONNREFUSED') {
        errorReason = 'Connection refused';
      } else {
        errorReason = fetchError.message || 'Fetch error';
      }
      
      // Return fallback data instead of throwing
      return res.status(200).json(getFallbackNewsData(errorReason));
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Return fallback data in case of API errors
    return res.status(200).json(getFallbackNewsData('General error'));
  }
};

// Helper function to get fallback news data with reason
function getFallbackNewsData(reason: string = 'CMS unavailable') {
  console.log(`Using fallback news data. Reason: ${reason}`);
  
  return [
    {
      id: 1,
      title: "Rashmi Group Achieves Record Production Targets",
      date: "2023-05-15",
      category: "Achievement",
      excerpt: "Rashmi Group has achieved record-breaking production targets in the first quarter of 2023, surpassing industry standards.",
      content: "Rashmi Group has achieved record-breaking production targets in the first quarter of 2023, surpassing industry standards. This achievement highlights our commitment to excellence and efficient operations.",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Rashmi Metaliks Launches New Sustainability Initiative",
      date: "2023-04-10",
      category: "Sustainability",
      excerpt: "Our new sustainability program aims to reduce carbon emissions by 30% over the next five years.",
      content: "Rashmi Metaliks is proud to announce our ambitious new sustainability initiative that aims to reduce carbon emissions by 30% over the next five years, reinforcing our commitment to environmentally responsible manufacturing.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];
}

/**
 * Create a new news article in the CMS
 * Requires authentication
 */
export const createNews = async (req: Request, res: Response) => {
  try {
    // Get configuration from environment
    const apiUrl = (process.env.CMS_API_URL || 'http://localhost:1337').replace(/\/$/, '');
    const cmsApiToken = process.env.CMS_API_TOKEN;
    const newsPanelApiId = process.env.CMS_NEWS_PANEL_API_ID || 'news-and-updates-panel';
    
    if (!apiUrl) {
      console.error('CMS API URL is not configured');
      return res.status(500).json({ message: 'CMS API URL not configured' });
    }

    if (!cmsApiToken) {
      console.error('CMS API token is not configured');
      return res.status(500).json({ message: 'CMS API token not configured' });
    }
    
    // Validate the request data
    const { error: validationError } = newsSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ 
        message: 'Invalid news data', 
        error: validationError.details[0].message 
      });
    }
    
    // Handle image upload if provided
    let imageId = null;
    if (req.file) {
      const formData = new FormData();
      formData.append('files', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      });
      
      const uploadResponse = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        headers: {
          // Use correct token format without Bearer prefix
          'Authorization': cmsApiToken,
        },
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        return res.status(500).json({ message: 'Failed to upload image' });
      }
      
      const uploadResult = await uploadResponse.json();
      imageId = uploadResult[0]?.id;
    }
    
    // Prepare the data for Strapi API
    const strapiData = {
      data: {
        Heading: req.body.Heading,
        Date: req.body.Date,
        Category: req.body.Category,
        Description: req.body.Description,
        Content: req.body.Content,
        ...(imageId && { image: imageId }),
      }
    };
    
    // Create the news article
    const createResponse = await fetch(`${apiUrl}/api/${newsPanelApiId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Use correct token format without Bearer prefix
        'Authorization': cmsApiToken,
      },
      body: JSON.stringify(strapiData),
    });
    
    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      return res.status(500).json({ 
        message: 'Failed to create news article',
        error: errorText
      });
    }
    
    const result = await createResponse.json();
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating news:', error);
    return res.status(500).json({ 
      message: 'Failed to create news article',
      error: (error as Error).message 
    });
  }
};

/**
 * Update an existing news article in the CMS
 * Requires authentication
 */
export const updateNews = async (req: Request, res: Response) => {
  try {
    // Get configuration from environment
    const apiUrl = (process.env.CMS_API_URL || 'http://localhost:1337').replace(/\/$/, '');
    const cmsApiToken = process.env.CMS_API_TOKEN;
    const newsPanelApiId = process.env.CMS_NEWS_PANEL_API_ID || 'news-and-updates-panel';
    
    if (!apiUrl) {
      console.error('CMS API URL is not configured');
      return res.status(500).json({ message: 'CMS API URL not configured' });
    }

    if (!cmsApiToken) {
      console.error('CMS API token is not configured');
      return res.status(500).json({ message: 'CMS API token not configured' });
    }
    
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'News ID is required' });
    }
    
    // Validate the request data
    const { error: validationError } = newsSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ 
        message: 'Invalid news data', 
        error: validationError.details[0].message 
      });
    }
    
    // Handle image upload if provided
    let imageId = null;
    if (req.file) {
      const formData = new FormData();
      formData.append('files', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      });
      
      const uploadResponse = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        headers: {
          // Use correct token format without Bearer prefix
          'Authorization': cmsApiToken,
        },
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        return res.status(500).json({ message: 'Failed to upload image' });
      }
      
      const uploadResult = await uploadResponse.json();
      imageId = uploadResult[0]?.id;
    }
    
    // Prepare the data for Strapi API
    const strapiData = {
      data: {
        Heading: req.body.Heading,
        Date: req.body.Date,
        Category: req.body.Category,
        Description: req.body.Description,
        Content: req.body.Content,
        ...(imageId && { image: imageId }),
      }
    };
    
    // Update the news article
    const updateResponse = await fetch(`${apiUrl}/api/${newsPanelApiId}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Use correct token format without Bearer prefix
        'Authorization': cmsApiToken,
      },
      body: JSON.stringify(strapiData),
    });
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      return res.status(500).json({ 
        message: 'Failed to update news article',
        error: errorText
      });
    }
    
    const result = await updateResponse.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating news:', error);
    return res.status(500).json({ 
      message: 'Failed to update news article',
      error: (error as Error).message 
    });
  }
}; 