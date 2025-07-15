import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { ContactFormData } from '../types/contact';
import { VendorFormData } from '../types/vendor';

// Country code to name mapping
const countryMapping: { [key: string]: string } = {
  'in': 'India',
  'ae': 'United Arab Emirates',
  'au': 'Australia',
  'bg': 'Bangladesh',
  'bt': 'Bhutan',
  'ca': 'Canada',
  'cn': 'China',
  'de': 'Germany',
  'fr': 'France',
  'gb': 'United Kingdom',
  'id': 'Indonesia',
  'it': 'Italy',
  'jp': 'Japan',
  'kr': 'South Korea',
  'lk': 'Sri Lanka',
  'my': 'Malaysia',
  'np': 'Nepal',
  'nz': 'New Zealand',
  'qa': 'Qatar',
  'ru': 'Russia',
  'sa': 'Saudi Arabia',
  'sg': 'Singapore',
  'th': 'Thailand',
  'us': 'United States',
  'za': 'South Africa',
  'others': 'Others'
};

// Helper function to get country name from code
const getCountryName = (countryCode: string): string => {
  return countryMapping[countryCode] || countryCode;
};

// Job application data interface for custom email service
export interface CustomJobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department?: string;
  experience?: string;
  education?: string;
  resumeUrl?: string;
  coverLetter?: string;
  source?: string;
  applicationId?: string;
}

// Create custom email transporter using the provided rashmigroup.com credentials
const createCustomTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.office365.com', // Use Microsoft's SMTP server for rashmigroup.com
    port: 587,
    secure: false, // Should be false for port 587 with STARTTLS
    auth: {
      user: 'anoop.singh@rashmigroup.com',
      pass: 'Sanskar28@'
    },
    requireTLS: true, // Ensure TLS is used
    pool: true, // Use connection pooling
    maxConnections: 5, // Maximum number of connections
    maxMessages: 100, // Maximum messages per connection
    rateDelta: 1000, // Rate limiting - 1 second between messages
    rateLimit: 5 // Rate limiting - 5 messages per rateDelta
  });
};

// Create contact email transporter for globalenquiry@rashmigroup.com
const createContactEmailTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.office365.com', // Use Microsoft's SMTP server for rashmigroup.com
    port: 587,
    secure: false, // Should be false for port 587 with STARTTLS
    auth: {
      user: 'globalenquiry@rashmigroup.com',
      pass: 'Headoffice@2025'
    },
    requireTLS: true, // Ensure TLS is used
    pool: true, // Use connection pooling
    maxConnections: 5, // Maximum number of connections
    maxMessages: 100, // Maximum messages per connection
    rateDelta: 1000, // Rate limiting - 1 second between messages
    rateLimit: 5 // Rate limiting - 5 messages per rateDelta
  });
};

// Create HR email transporter for globalhr@rashmigroup.com
const createHREmailTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.office365.com', // Use Microsoft's SMTP server for rashmigroup.com
    port: 587,
    secure: false, // Should be false for port 587 with STARTTLS
    auth: {
      user: 'globalhr@rashmigroup.com',
      pass: 'RashmiHRhead2004'
    },
    requireTLS: true, // Ensure TLS is used
    pool: true, // Use connection pooling
    maxConnections: 5, // Maximum number of connections
    maxMessages: 100, // Maximum messages per connection
    rateDelta: 1000, // Rate limiting - 1 second between messages
    rateLimit: 5 // Rate limiting - 5 messages per rateDelta
  });
};

// Create vendor/procurement email transporter for procurement@rashmigroup.com
const createProcurementEmailTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.office365.com', // Use Microsoft's SMTP server for rashmigroup.com
    port: 587,
    secure: false, // Should be false for port 587 with STARTTLS
    auth: {
      user: 'procurement@rashmigroup.com',
      pass: 'Rashmi@2026'
    },
    requireTLS: true, // Ensure TLS is used
    pool: true, // Use connection pooling
    maxConnections: 5, // Maximum number of connections
    maxMessages: 100, // Maximum messages per connection
    rateDelta: 1000, // Rate limiting - 1 second between messages
    rateLimit: 5 // Rate limiting - 5 messages per rateDelta
  });
};

/**
 * Send contact form data to custom email address
 */
export const sendCustomContactFormEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    const transporter = createContactEmailTransporter(); // Use the new contact email transporter

    // Generate unique reference ID for tracking
    const refId = `RMQ-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Format the selected products string if any are selected
    const productsText = data.selectedProducts && data.selectedProducts.length > 0
      ? `<p><strong>Products of Interest:</strong><br>${data.selectedProducts.join(', ')}</p>`
      : '<p><strong>Products of Interest:</strong> None selected</p>';

    // Create email HTML content with improved formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; }
          h2 { color: #e53935; }
          h3 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .info-row { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .message-box { background-color: #f9f9f9; padding: 15px; border-left: 3px solid #e53935; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission from Rashmi Metaliks Website - Ref: ${refId}</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3>Contact Details</h3>
          <div class="info-row"><span class="label">Name:</span> ${data.name}</div>
          <div class="info-row"><span class="label">Email:</span> ${data.email}</div>
          <div class="info-row"><span class="label">Subject:</span> ${data.subject}</div>
          <div class="info-row">${productsText}</div>

          <h3>Message</h3>
          <div class="message-box">
            ${data.message.replace(/\n/g, '<br>')}
          </div>

          <div class="footer">
            <p>This inquiry was submitted via the Rashmi Metaliks website contact form.</p>
            <p>Reference ID: ${refId}</p>
            <p>Website: https://rashmigroup.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to the new contact address (notification email)
    await transporter.sendMail({
      from: '"Rashmi Metaliks Website" <globalenquiry@rashmigroup.com>',
      to: 'globalenquiry@rashmigroup.com',
      subject: `Contact Inquiry: ${data.subject} - Ref: ${refId}`,
      html: htmlContent,
      headers: {
        'X-Priority': '1', // High priority
        'X-Reference-ID': refId
      }
    });

    console.log(`Contact form email sent to globalenquiry@rashmigroup.com - Ref: ${refId}`);

    // Send thank you confirmation email to the person who submitted the form
    const thankYouHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; text-align: center; }
          .logo { max-width: 200px; margin-bottom: 15px; }
          h2 { color: #e53935; }
          .content { padding: 20px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .reference { background-color: #f9f9f9; padding: 10px; text-align: center; margin: 15px 0; border: 1px dashed #ddd; }
          .highlight { color: #e53935; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank you for contacting Rashmi Metaliks</h2>
          </div>
          
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>We have successfully received your inquiry about "<span class="highlight">${data.subject}</span>".</p>
            <p>Our team will review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
            
            <div class="reference">
              <p><strong>Your Reference ID:</strong> <span class="highlight">${refId}</span></p>
              <p>Please use this reference in any future correspondence about this inquiry.</p>
            </div>
            
            ${data.selectedProducts && data.selectedProducts.length > 0 ? 
              `<p><strong>Products you expressed interest in:</strong><br>${data.selectedProducts.join(', ')}</p>` : ''}
              
            <p>In the meantime, you can:</p>
            <ul>
              <li>Visit our website: <a href="https://rashmigroup.com" style="color: #e53935;">rashmigroup.com</a></li>
              <li>Learn more about our products and services</li>
              <li>Download our product brochures</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>Regards,<br><strong>Customer Support Team</strong><br>Rashmi Metaliks Ltd.</p>
            <p>📧 Email: globalenquiry@rashmigroup.com | 📞 Phone: +91-40-23723000</p>
            <p>© ${new Date().getFullYear()} Rashmi Metaliks. All rights reserved.</p>
            <p><small>Please note that this is an automated response. Please do not reply to this email.</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send thank you email to the person who submitted the form
    try {
      await transporter.sendMail({
        from: '"Rashmi Metaliks Customer Support" <globalenquiry@rashmigroup.com>',
        to: data.email,
        subject: `Thank you for contacting Rashmi Metaliks - Ref: ${refId}`,
        html: thankYouHtml,
        headers: {
          'X-Reference-ID': refId
        }
      });
      console.log(`Thank you email sent to ${data.email} - Ref: ${refId}`);
    } catch (thankYouError) {
      console.error('Error sending thank you email:', thankYouError);
      // Don't fail the entire process if thank you email fails
    }

    return true;
  } catch (error) {
    console.error('Error sending custom contact form email:', error);
    return false;
  }
};

/**
 * Send thank you email to job applicant
 */
const sendJobApplicationThankYouEmail = async (data: CustomJobApplicationData, appId: string, transporter: any): Promise<void> => {
  try {
    const thankYouHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Application - Rashmi Group</title>
          <style>
              body { 
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                  line-height: 1.6; 
                  color: #333333; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #f8f9fa;
              }
              .container { 
                  max-width: 600px; 
                  margin: 20px auto; 
                  background-color: #ffffff; 
                  border-radius: 10px; 
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .header { 
                  background: linear-gradient(135deg, #eb5951 0%, #c53030 100%); 
                  color: white; 
                  text-align: center; 
                  padding: 30px 20px; 
              }
              .header h1 { 
                  margin: 0; 
                  font-size: 28px; 
                  font-weight: 700; 
              }
              .header p { 
                  margin: 10px 0 0 0; 
                  font-size: 16px; 
                  opacity: 0.9; 
              }
              .content { 
                  padding: 40px 30px; 
              }
              .content h2 { 
                  color: #eb5951; 
                  margin-top: 0; 
                  font-size: 24px; 
              }
              .info-box { 
                  background: #f8f9fa; 
                  border-left: 4px solid #eb5951; 
                  padding: 20px; 
                  margin: 20px 0; 
                  border-radius: 0 8px 8px 0; 
              }
              .info-box h3 { 
                  margin: 0 0 10px 0; 
                  color: #eb5951; 
                  font-size: 18px; 
              }
              .footer { 
                  background: #2d3748; 
                  color: white; 
                  text-align: center; 
                  padding: 30px 20px; 
              }
              .footer p { 
                  margin: 5px 0; 
              }
              .highlight { 
                  background: #fff3cd; 
                  border: 1px solid #ffeaa7; 
                  border-radius: 6px; 
                  padding: 15px; 
                  margin: 20px 0; 
              }
              .reference-id { 
                  background: linear-gradient(90deg, #eb5951 0%, #ff6b6b 100%); 
                  color: white; 
                  padding: 10px 20px; 
                  border-radius: 25px; 
                  display: inline-block; 
                  font-weight: bold; 
                  margin: 10px 0; 
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>🙏 Thank You for Your Application!</h1>
                  <p>We appreciate your interest in joining Rashmi Group</p>
              </div>
              
              <div class="content">
                  <h2>Dear ${data.firstName} ${data.lastName},</h2>
                  
                  <p>Thank you for submitting your application for the <strong>${data.position}</strong> position at Rashmi Group. We have successfully received your application and our HR team will review it carefully.</p>
                  
                  <div class="reference-id">
                      Application Reference: ${appId}
                  </div>
                  
                  <div class="info-box">
                      <h3>📋 Application Summary</h3>
                      <p><strong>Position:</strong> ${data.position}</p>
                      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                      <p><strong>Email:</strong> ${data.email}</p>
                      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
                      <p><strong>Department:</strong> ${data.department || 'Not specified'}</p>
                      <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <div class="highlight">
                      <h3>🕒 What's Next?</h3>
                      <ul>
                          <li>Our HR team will review your application within 5-7 business days</li>
                          <li>If your profile matches our requirements, we'll contact you for further discussion</li>
                          <li>You may be invited for an interview or assessment</li>
                          <li>We'll keep you updated throughout the process</li>
                      </ul>
                  </div>
                  
                  <p>In the meantime, feel free to explore more about Rashmi Group on our website and learn about our company culture, values, and growth opportunities.</p>
                  
                  <p>If you have any questions regarding your application, please don't hesitate to contact us.</p>
                  
                  <p style="margin-top: 30px;">
                      Best regards,<br>
                      <strong>HR Team</strong><br>
                      Rashmi Group
                  </p>
              </div>
              
              <div class="footer">
                  <p><strong>Rashmi Group</strong></p>
                  <p>First Floor, Ideal Center, 9, Acharya Jagdish Chandra Bose Rd</p>
                  <p>Mullick Bazar, Park Street area, Kolkata, West Bengal 700017</p>
                  <p>📧 globalhr@rashmigroup.com | 📞 +91-33-4601-3000</p>
                  <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                      This is an automated message. Please do not reply to this email.
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: '"Rashmi Group Careers" <globalhr@rashmigroup.com>',
      to: data.email,
      subject: `Thank you for your application - ${data.position} at Rashmi Group - Ref: ${appId}`,
      html: thankYouHtml,
      headers: {
        'X-Reference-ID': appId
      }
    });

    console.log(`Thank you email sent to ${data.email} for application ${appId}`);
  } catch (error) {
    console.error('Error sending job application thank you email:', error);
    // Don't throw error - just log it so the main application process doesn't fail
  }
};

/**
 * Send job application data to custom email address
 */
export const sendCustomJobApplicationEmail = async (data: CustomJobApplicationData, resumeFile?: Express.Multer.File): Promise<boolean> => {
  try {
    const transporter = createHREmailTransporter(); // Use the new HR email transporter

    // Generate unique reference ID for the application
    const appId = data.applicationId || `RMJOB-${Date.now().toString().slice(-6)}`;

    // Create email HTML content with improved formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; }
          h2 { color: #e53935; }
          h3 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .info-row { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .message-box { background-color: #f9f9f9; padding: 15px; border-left: 3px solid #e53935; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Job Application from Rashmi Metaliks Website - Ref: ${appId}</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3>Applicant Details</h3>
          <div class="info-row"><span class="label">Name:</span> ${data.firstName} ${data.lastName}</div>
          <div class="info-row"><span class="label">Email:</span> ${data.email}</div>
          <div class="info-row"><span class="label">Phone:</span> ${data.phone}</div>
          
          <h3>Position Information</h3>
          <div class="info-row"><span class="label">Position Applied For:</span> ${data.position}</div>
          <div class="info-row"><span class="label">Department:</span> ${data.department || 'Not specified'}</div>
          <div class="info-row"><span class="label">Source:</span> ${data.source || 'Not specified'}</div>
          
          <h3>Experience & Education</h3>
          <div class="info-row"><span class="label">Experience:</span></div>
          <div class="message-box">
            ${data.experience ? data.experience.replace(/\n/g, '<br>') : 'Not provided'}
          </div>
          
          <div class="info-row"><span class="label">Education:</span></div>
          <div class="message-box">
            ${data.education ? data.education.replace(/\n/g, '<br>') : 'Not provided'}
          </div>
          
          <h3>Cover Letter</h3>
          <div class="message-box">
            ${data.coverLetter ? data.coverLetter.replace(/\n/g, '<br>') : 'Not provided'}
          </div>
          
          <div class="info-row"><span class="label">Resume:</span> ${data.resumeUrl ? `<a href="${data.resumeUrl}" target="_blank">View Resume</a>` : 'Attached to this email'}</div>

          <div class="footer">
            <p>This application was submitted via the Rashmi Metaliks careers page.</p>
            <p>Reference ID: ${appId}</p>
            <p>Website: https://rashmigroup.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Prepare email options
    const mailOptions = {
      from: '"Rashmi Metaliks Careers" <globalhr@rashmigroup.com>',
      to: 'globalhr@rashmigroup.com',
      subject: `Job Application: ${data.position} - ${data.firstName} ${data.lastName} - Ref: ${appId}`,
      html: htmlContent,
      attachments: [] as any[]
    };

    // Add resume as attachment if available
    if (resumeFile) {
      mailOptions.attachments.push({
        filename: `${data.firstName}_${data.lastName}_Resume.${resumeFile.originalname.split('.').pop()}`,
        content: resumeFile.buffer,
        contentType: resumeFile.mimetype
      });
    }

    // Send email to the new HR address
    await transporter.sendMail(mailOptions);
    console.log(`Job application email sent to globalhr@rashmigroup.com - Ref: ${appId}`);

    // Send thank you email to the applicant
    await sendJobApplicationThankYouEmail(data, appId, transporter);

    return true;
  } catch (error) {
    console.error('Error sending custom job application email:', error);
    return false;
  }
};

/**
 * Test the custom email service configuration
 */
export const testCustomEmailService = async (): Promise<boolean> => {
  try {
    console.log('Testing email services...');
    
    // Test contact email service
    const contactTransporter = createContactEmailTransporter();
    await contactTransporter.verify();
    console.log('Contact email service (globalenquiry@rashmigroup.com) configuration is valid');
    
    // Test HR email service
    const hrTransporter = createHREmailTransporter();
    await hrTransporter.verify();
    console.log('HR email service (globalhr@rashmigroup.com) configuration is valid');
    
    // Send test emails
    await contactTransporter.sendMail({
      from: '"Rashmi Metaliks System" <globalenquiry@rashmigroup.com>',
      to: 'globalenquiry@rashmigroup.com',
      subject: 'Contact Email Service Test - Rashmi Metaliks',
      html: `
        <h2>Contact Email Service Test</h2>
        <p>This is a test email to verify that the contact email service is working correctly.</p>
        <p><strong>Test Date:</strong> ${new Date().toLocaleString()}</p>
        <p>If you receive this email, the contact email service for Rashmi Metaliks is configured properly.</p>
        <hr>
        <p><small>This is an automated test email from Rashmi Metaliks website.</small></p>
      `
    });
    
    await hrTransporter.sendMail({
      from: '"Rashmi Metaliks System" <globalhr@rashmigroup.com>',
      to: 'globalhr@rashmigroup.com',
      subject: 'HR Email Service Test - Rashmi Metaliks',
      html: `
        <h2>HR Email Service Test</h2>
        <p>This is a test email to verify that the HR email service is working correctly.</p>
        <p><strong>Test Date:</strong> ${new Date().toLocaleString()}</p>
        <p>If you receive this email, the HR email service for Rashmi Metaliks is configured properly.</p>
        <hr>
        <p><small>This is an automated test email from Rashmi Metaliks website.</small></p>
      `
    });
    
    console.log('Test emails sent successfully to both globalenquiry@rashmigroup.com and globalhr@rashmigroup.com');
    return true;
  } catch (error) {
    console.error('Email service test failed:', error);
    return false;
  }
};

/**
 * Send vendor registration data to procurement team
 */
export const sendCustomVendorRegistrationEmail = async (data: VendorFormData, files?: Express.Multer.File[]): Promise<boolean> => {
  try {
    const transporter = createProcurementEmailTransporter(); // Use the procurement email transporter

    // Generate unique reference ID
    const refId = `TOKEN-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Format turnover information with currency
    const turnoverText = data.turnover && data.turnoverCurrency
      ? data.turnoverCurrency === 'INR'
        ? `₹${data.turnover} Crores`
        : `$${data.turnover} Million`
      : 'Not provided';

    // Create email HTML content with improved formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; }
          h2 { color: #e53935; }
          h3 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .info-row { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .section { background-color: #f9f9f9; padding: 15px; border-left: 3px solid #e53935; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Vendor Registration - Token ID: ${refId}</h2>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3>Contact Person Details</h3>
          <div class="info-row"><span class="label">Name:</span> ${data.name}</div>
          <div class="info-row"><span class="label">Designation:</span> ${data.designation}</div>
          <div class="info-row"><span class="label">Email:</span> ${data.email}</div>
          <div class="info-row"><span class="label">Contact Number:</span> ${data.contactNo}</div>

          <h3>Company Information</h3>
          <div class="info-row"><span class="label">Company Name:</span> ${data.companyName}</div>
          <div class="info-row"><span class="label">Firm Type:</span> ${data.firmType}</div>
          <div class="info-row"><span class="label">Vendor Type:</span> ${data.vendorType}</div>
          <div class="info-row"><span class="label">Country:</span> ${getCountryName(data.country)}</div>
          ${data.country === 'others' ? `<div class="info-row"><span class="label">Custom Country:</span> ${data.customCountry || ''}</div>
          <div class="info-row"><span class="label">Custom Country Code:</span> ${data.customCountryCode || ''}</div>` : ''}
          <div class="info-row"><span class="label">Website:</span> ${data.website || 'Not provided'}</div>
          <div class="info-row"><span class="label">GST Number:</span> ${data.gstNumber || 'Not provided'}</div>
          <div class="info-row"><span class="label">Last Year Turnover:</span> ${turnoverText}</div>

          <h3>Product/Service Information</h3>
          <div class="section">
            <div class="info-row"><span class="label">Category:</span> ${data.category}</div>
            <div class="info-row"><span class="label">Product Description:</span><br>${data.productDescription}</div>
            <div class="info-row"><span class="label">Major Clients:</span> ${data.majorClients || 'Not provided'}</div>
          </div>

          <div class="info-row"><span class="label">Attachments:</span> ${files && files.length > 0 ? `${files.length} file(s) attached` : 'None'}</div>

          <div class="footer">
            <p>This vendor registration was submitted via the Rashmi Metaliks website vendor portal.</p>
            <p>Token ID: ${refId}</p>
            <p>Website: https://rashmigroup.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Prepare email options
    const mailOptions = {
      from: '"Rashmi Metaliks Vendor Portal" <procurement@rashmigroup.com>',
      to: 'procurement@rashmigroup.com',
      subject: `New Vendor Registration: ${data.companyName} - Token ID: ${refId}`,
      html: htmlContent,
      attachments: [] as any[]
    };

    // Add file attachments if available
    if (files && files.length > 0) {
      files.forEach((file, index) => {
        mailOptions.attachments.push({
          filename: `${data.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Document_${index + 1}.${file.originalname.split('.').pop()}`,
          content: file.buffer,
          contentType: file.mimetype
        });
      });
    }

    // Send email to procurement team
    await transporter.sendMail(mailOptions);
    console.log(`Vendor registration email sent to procurement@rashmigroup.com - Token ID: ${refId}`);

    // Send confirmation email to the vendor
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-bottom: 3px solid #e53935; text-align: center; }
          h2 { color: #e53935; }
          .content { padding: 20px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; }
          .reference { background-color: #f9f9f9; padding: 10px; text-align: center; margin: 15px 0; border: 1px dashed #ddd; }
          .highlight { color: #e53935; font-weight: bold; }
          .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank you for your registration with Rashmi Metaliks</h2>
          </div>
          
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>We have successfully received your vendor registration application.</p>
            
            <div class="reference">
              <p><strong>Your Token ID:</strong> <span class="highlight">${refId}</span></p>
              <p>Please use this reference in any future correspondence about this registration.</p>
            </div>
            
            <p><strong>Registration Summary:</strong></p>
            <ul>
              <li><strong>Company Name:</strong> ${data.companyName}</li>
              <li><strong>Firm Type:</strong> ${data.firmType}</li>
              <li><strong>Category:</strong> ${data.category}</li>
              <li><strong>Last Year Turnover:</strong> ${turnoverText}</li>
            </ul>
            
            <p>Our procurement team will review your application and contact you within 5-7 business days.</p>
            
            <div class="warning">
              <p><strong>⚠️ Important Notice:</strong></p>
              <p>Rashmi Metaliks does not charge any registration fees. If you receive any payment requests claiming to be from us, please ignore them as they are fraudulent.</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Regards,<br><strong>Procurement Team</strong><br>Rashmi Metaliks Ltd.</p>
            <p>📧 Email: procurement@rashmigroup.com | 📞 Phone: +91-33-4601-3000</p>
            <p>© ${new Date().getFullYear()} Rashmi Metaliks. All rights reserved.</p>
            <p><small>This is an automated response. Please do not reply to this email.</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation to vendor
    try {
      await transporter.sendMail({
        from: '"Rashmi Metaliks Procurement" <procurement@rashmigroup.com>',
        to: data.email,
        subject: `Your Vendor Registration - Token ID: ${refId}`,
        html: confirmationHtml,
        headers: {
          'X-Reference-ID': refId
        }
      });
      console.log(`Vendor confirmation email sent to ${data.email} - Token ID: ${refId}`);
    } catch (confirmError) {
      console.error('Error sending vendor confirmation email:', confirmError);
      // Don't fail the entire process if confirmation email fails
    }

    return true;
  } catch (error) {
    console.error('Error sending custom vendor registration email:', error);
    return false;
  }
};

// Export the transporter functions for use in other modules
export { createContactEmailTransporter, createHREmailTransporter }; 