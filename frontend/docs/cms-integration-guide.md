
# CMS Integration Guide for Rashmi Metaliks Website

This guide explains how to use a headless CMS (Content Management System) to easily update news, media, brochures, and other content on the Rashmi Metaliks website without writing code.

## Why Use a Headless CMS?

A headless CMS allows non-technical users to:
- Add, edit, or remove content through a user-friendly interface
- Upload images and files without FTP or coding knowledge
- Schedule content publication
- Manage multiple types of content (news, brochures, certificates)
- Maintain content history and versions

## Recommended Solution: Strapi

We recommend using [Strapi](https://strapi.io/), a free, open-source headless CMS that's easy to set up and customize.

## Setup Instructions

### 1. Initial Setup

```bash
# Install Strapi
npx create-strapi-app@latest rashmi-cms --quickstart

# This will create a new Strapi project and open the admin panel
# Create your first admin user when prompted
```

### 2. Content Type Creation

In the Strapi admin panel, create the following content types:

#### News Articles
- Title (Text)
- Date (Date)
- Category (Enumeration: Achievement, Expansion, Award, Sustainability)
- Excerpt (Text)
- Content (Rich Text)
- Image (Media)

#### Brochures
- Title (Text)
- Category (Enumeration: Product, Corporate, Technical)
- Format (Text - e.g., PDF)
- File Size (Text - e.g., 2.5 MB)
- Thumbnail (Media)
- File (Media)

#### Certificates
- Title (Text)
- Issuer (Text)
- Issue Date (Date)
- Expiry Date (Date)
- Description (Rich Text)
- Image (Media)
- File (Media)

### 3. Permissions

Configure permissions to allow:
- Public read access to content (for the website to display)
- Restricted write access to administrators only

### 4. Usage Guide

#### Adding New Content

1. Log in to the Strapi admin panel (http://your-cms-url/admin)
2. Navigate to the content type you want to add (e.g., News Articles)
3. Click "Create new entry"
4. Fill in the details and upload any required media
5. Click "Save" and then "Publish"

#### Editing Existing Content

1. Log in to the Strapi admin panel
2. Navigate to the content type
3. Click on the entry you want to edit
4. Make your changes
5. Click "Save" to update

#### Media Management

1. All uploaded media is stored in the Media Library
2. You can reuse media across different content items
3. Strapi automatically optimizes images for web use

## Integration with the Website

The website is already set up to connect to the CMS using the API. When you publish content in Strapi, it will automatically appear on the website without any code changes.

## Deployment Options

For production use, we recommend:

1. **Self-hosted**: Deploy Strapi on your own server
   - Pros: Full control, no subscription fees
   - Cons: Requires server maintenance

2. **Strapi Cloud**: Use Strapi's managed service
   - Pros: Easy setup, managed updates
   - Cons: Monthly subscription cost

3. **Platform as a Service**: Deploy on Heroku, DigitalOcean, etc.
   - Pros: Easier than self-hosting, reliable
   - Cons: Monthly costs, some technical setup

## Support and Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Video Tutorials](https://www.youtube.com/c/Strapi)
- Contact your website developer for custom integrations

This CMS solution allows you to keep your website content fresh and up-to-date without requiring developer assistance for routine content updates.
