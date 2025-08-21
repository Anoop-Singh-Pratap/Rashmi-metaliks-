import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { VendorFormData } from '../types/vendor';
import { ContactFormData } from '../types/contact';

console.log('DEBUG: emailService.ts module loaded');

// Country code to name mapping (broadened)
const countryMapping: { [key: string]: string } = {
  in: 'India', ae: 'United Arab Emirates', au: 'Australia', bd: 'Bangladesh', bg: 'Bangladesh', bt: 'Bhutan', br: 'Brazil',
  ca: 'Canada', cn: 'China', co: 'Colombia', cz: 'Czech Republic', de: 'Germany', dk: 'Denmark', eg: 'Egypt',
  es: 'Spain', fi: 'Finland', fr: 'France', gb: 'United Kingdom', gr: 'Greece', hu: 'Hungary', id: 'Indonesia',
  ie: 'Ireland', il: 'Israel', it: 'Italy', jp: 'Japan', kr: 'South Korea', lk: 'Sri Lanka', mx: 'Mexico', my: 'Malaysia',
  ng: 'Nigeria', nl: 'Netherlands', no: 'Norway', np: 'Nepal', nz: 'New Zealand', ph: 'Philippines', pl: 'Poland',
  pt: 'Portugal', qa: 'Qatar', ro: 'Romania', ru: 'Russia', sa: 'Saudi Arabia', se: 'Sweden', sg: 'Singapore', th: 'Thailand',
  tr: 'Turkey', us: 'United States', ve: 'Venezuela', vn: 'Vietnam', za: 'South Africa', ch: 'Switzerland', be: 'Belgium',
  ar: 'Argentina', cl: 'Chile', pk: 'Pakistan', ua: 'Ukraine', at: 'Austria', pe: 'Peru', sk: 'Slovakia', si: 'Slovenia',
  hr: 'Croatia', ee: 'Estonia', lt: 'Lithuania', lv: 'Latvia', rs: 'Serbia', by: 'Belarus', ge: 'Georgia', is: 'Iceland',
  lu: 'Luxembourg', mt: 'Malta', cy: 'Cyprus', md: 'Moldova', al: 'Albania', mk: 'North Macedonia', me: 'Montenegro',
  ba: 'Bosnia and Herzegovina', li: 'Liechtenstein', sm: 'San Marino', mc: 'Monaco', va: 'Vatican City', others: 'Others'
};

// Helper function to get country name from code
const getCountryName = (countryCode: string): string => {
  return countryMapping[countryCode] || countryCode;
};

// Create email transporter using specific credentials
const createTransporter = (user: string, pass: string) => {
  console.log('DEBUG: createTransporter called with:', {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    user,
    pass: pass ? '***' : 'NOT SET'
  });
  if (!user || !pass) {
    console.error('Email configuration missing: User and Pass are required');
    throw new Error('Email service not properly configured');
  }

  const smtpConfig = {
    host: process.env.EMAIL_HOST || 'smtp.office365.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: { user, pass },
    requireTLS: true,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  };
  console.log('DEBUG SMTP CONFIG:', JSON.stringify({ ...smtpConfig, auth: { ...smtpConfig.auth, pass: '***' } }, null, 2));
  return nodemailer.createTransport(smtpConfig);
};

export const sendContactFormEmail = async (data: ContactFormData): Promise<boolean> => {
  console.log('DEBUG: sendContactFormEmail called with data:', { name: data.name, email: data.email, subject: data.subject });
  try {
    console.log('DEBUG: About to create transporter with credentials:', { 
      user: process.env.ENQUIRY_EMAIL_USER, 
      pass: process.env.ENQUIRY_EMAIL_PASS ? '***' : 'NOT SET' 
    });
    const transporter = createTransporter(
      process.env.ENQUIRY_EMAIL_USER!,
      process.env.ENQUIRY_EMAIL_PASS!
    );

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
            <h2>New Contact Form Submission - Ref: ${refId}</h2>
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
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a confirmation email with improved formatting
    const confirmationHtml = `
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank you for contacting Rashmi Metaliks</h2>
          </div>
          
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>We have successfully received your inquiry about "${data.subject}".</p>
            <p>Our team will review your message and get back to you as soon as possible.</p>
            
            <div class="reference">
              <p><strong>Your Reference ID:</strong> ${refId}</p>
              <p>Please use this reference in any future correspondence about this inquiry.</p>
            </div>
            
            ${data.selectedProducts && data.selectedProducts.length > 0 ? 
              `<p><strong>Products you expressed interest in:</strong><br>${data.selectedProducts.join(', ')}</p>` : ''}
          </div>
          
          <div class="footer">
            <p>Regards,<br>Customer Support Team<br>Rashmi Metaliks Ltd.</p>
            <p>© ${new Date().getFullYear()} Rashmi Metaliks. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send primary email to globalenquiry@rashmigroup.com only
    try {
      await transporter.sendMail({
        from: `"Rashmi Metaliks Website" <${process.env.ENQUIRY_EMAIL_USER}>`,
        to: process.env.ENQUIRY_EMAIL_USER,
        subject: `Contact Inquiry: ${data.subject} - Ref: ${refId}`,
        html: htmlContent,
        headers: {
          'X-Priority': '1', // High priority
          'X-Reference-ID': refId
        }
      });
      console.log(`Contact form email sent to ${process.env.ENQUIRY_EMAIL_USER}`);
    } catch (error) {
      console.error('Error sending primary contact email:', error);
      // Continue to send confirmation email even if primary email fails
    }

    // Send confirmation email to the contact with retry logic
    let confirmationSent = false;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (!confirmationSent && attempts < maxAttempts) {
      try {
        await transporter.sendMail({
          from: `"Rashmi Metaliks Customer Support" <${process.env.ENQUIRY_EMAIL_USER}>`,
          to: data.email,
          subject: `Thank you for contacting Rashmi Metaliks - Ref: ${refId}`,
          html: confirmationHtml,
          headers: {
            'X-Reference-ID': refId
          }
        });
        confirmationSent = true;
        console.log(`Confirmation email sent to ${data.email}`);
      } catch (error) {
        attempts++;
        console.error(`Error sending confirmation email (attempt ${attempts}):`, error);
        
        if (attempts < maxAttempts) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Error in contact form email process:', error);
    return false;
  }
};

export const sendVendorRegistrationEmail = async (data: VendorFormData, files?: Express.Multer.File[]): Promise<boolean> => {
  try {
    // Allow skipping emails in non-critical environments
    if (process.env.SKIP_EMAILS === 'true') {
      console.log('SKIP_EMAILS=true -> skipping vendor emails');
      return true;
    }

    const transporter = createTransporter(
      process.env.PROCUREMENT_EMAIL_USER!,
      process.env.PROCUREMENT_EMAIL_PASS!
    );

    // Use provided referenceId if present, else generate
    const refId = data.referenceId || `TOKEN-${uuidv4().substring(0, 8).toUpperCase()}`;
    if (!data.referenceId) data.referenceId = refId;

    // Format turnover information with currency
    const turnoverText = data.turnover && data.turnoverCurrency
      ? data.turnoverCurrency === 'INR'
        ? `₹${data.turnover} Crores`
        : `$${data.turnover} Million`
      : 'Not provided';

    // Create email HTML content
    const htmlContent = `
      <h2>New Vendor Registration - Token ID: ${refId}</h2>
      <p><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>

      <h3>Contact Person Details</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Designation:</strong> ${data.designation}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Contact Number:</strong> ${data.contactNo}</p>

      <h3>Company Information</h3>
      <p><strong>Company Name:</strong> ${data.companyName}</p>
      <p><strong>Firm Type:</strong> ${data.firmType}</p>
      <p><strong>Vendor Type:</strong> ${data.vendorType}</p>
      <p><strong>Country:</strong> ${getCountryName(data.country)}</p>
      ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ''}
      ${data.country === 'others' ? `<p><strong>Custom Country:</strong> ${data.customCountry || ''}</p><p><strong>Custom Country Code:</strong> ${data.customCountryCode || ''}</p>` : ''}
      <p><strong>Website:</strong> ${data.website || 'Not provided'}</p>
      <p><strong>GST Number:</strong> ${data.gstNumber || 'Not provided'}</p>
      <p><strong>Last Year Turnover:</strong> ${turnoverText}</p>

      <h3>Product/Service Information</h3>
      <p><strong>Category:</strong> ${data.category}</p>
      <p><strong>Product Description:</strong> ${data.productDescription}</p>
      <p><strong>Major Clients:</strong> ${data.majorClients || 'Not provided'}</p>
      <p><strong>Attachments:</strong> ${files && files.length > 0 ? `${files.length} file(s) attached` : 'None'}</p>
    `;

    // Prepare email options
    const mailOptions = {
      from: `"Rashmi Metaliks Vendor Portal" <${process.env.PROCUREMENT_EMAIL_USER}>`,
      to: process.env.PROCUREMENT_EMAIL_USER,
      subject: `New Vendor Registration: ${data.companyName} - Token ID: ${refId}`,
      html: htmlContent,
      attachments: [] as any[]
    };

    // Add file attachments if available
    if (files && files.length > 0) {
      files.forEach((file) => {
        const originalName = file.originalname;
        const lastDot = originalName.lastIndexOf('.');
        const baseName = lastDot !== -1 ? originalName.substring(0, lastDot) : originalName;
        const ext = lastDot !== -1 ? originalName.substring(lastDot + 1) : '';
        const safeCompany = (data.companyName || 'company').replace(/[^a-zA-Z0-9_-]/g, '_');
        const safeBase = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');
        const safeRef = (refId || 'TOKEN').replace(/[^a-zA-Z0-9_-]/g, '_');
        const newFilename = `${safeCompany}_${safeBase}_${safeRef}${ext ? '.' + ext : ''}`;
        mailOptions.attachments.push({ filename: newFilename, content: file.buffer, contentType: file.mimetype });
      });
    }

    // Send email
    await transporter.sendMail(mailOptions);

    // Format turnover information for confirmation email
    const confirmationTurnoverText = data.turnover && data.turnoverCurrency
      ? data.turnoverCurrency === 'INR'
        ? `₹${data.turnover} Crores`
        : `$${data.turnover} Million`
      : 'Not provided';

    // Send confirmation email to the vendor
    await transporter.sendMail({
      from: `"Rashmi Metaliks Procurement" <${process.env.PROCUREMENT_EMAIL_USER}>`,
      to: data.email,
      subject: `Your Vendor Registration - Token ID: ${refId}`,
      html: `
        <h2>Thank you for your registration with Rashmi Metaliks</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your vendor registration application. Your Token ID is: <strong>${refId}</strong></p>
        <p>Our procurement team will review your details and contact you shortly.</p>
        <div style="background:#fff3cd;border:2px solid #ffc107;border-radius:8px;padding:12px;margin:12px 0;">
          <strong>Important:</strong> Registration is free. We never request payment for registration. Ignore and report any such requests.
        </div>
        <div style="background:#e8f4fd;border:2px solid #2196f3;border-radius:8px;padding:12px;margin:12px 0;">
          <strong>BidNemo Bidding Portal:</strong> After evaluation and as per business needs, we may invite you to bid via <a href="http://bidnemo.com/login" target="_blank" rel="noopener noreferrer">BidNemo</a> or email RFQs.
        </div>
        <p><strong>Registration Summary:</strong></p>
        <ul>
          <li><strong>Company Name:</strong> ${data.companyName}</li>
          <li><strong>Firm Type:</strong> ${data.firmType}</li>
          <li><strong>Last Year Turnover:</strong> ${confirmationTurnoverText}</li>
        </ul>
        <p>Please note that we do not charge any registration amount. If you receive any payment requests, then that is a fraud and should be ignored.</p>
        <p>Regards,<br>Procurement Team<br>Rashmi Metaliks Ltd.</p>
      `
    });

    return true;
  } catch (error) {
    console.error('Error sending vendor registration email:', error);
    return false;
  }
};

// New function for job application emails
export interface JobApplicationData {
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

export const sendJobApplicationEmail = async (data: JobApplicationData, resumeFile?: Express.Multer.File): Promise<boolean> => {
  try {
    const transporter = createTransporter(
      process.env.HR_EMAIL_USER!,
      process.env.HR_EMAIL_PASS!
    );

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
            <h2>New Job Application - Ref: ${appId}</h2>
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
          
          <div class="info-row"><span class="label">Resume:</span> ${data.resumeUrl ? `<a href="${data.resumeUrl}" target="_blank">View Resume</a>` : 'Not provided'}</div>

          <div class="footer">
            <p>This application was submitted via the Rashmi Metaliks careers page.</p>
            <p>Reference ID: ${appId}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a confirmation email with improved formatting
    const confirmationHtml = `
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank you for your application to Rashmi Metaliks</h2>
          </div>
          
          <div class="content">
            <p>Dear ${data.firstName} ${data.lastName},</p>
            <p>We have successfully received your application for the <strong>${data.position}</strong> position.</p>
            <p>Our HR team will review your qualifications and will contact you if your profile matches our requirements.</p>
            
            <div class="reference">
              <p><strong>Your Application Reference ID:</strong> ${appId}</p>
              <p>Please use this reference in any future correspondence about this application.</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Regards,<br>Human Resources Team<br>Rashmi Metaliks Ltd.</p>
            <p>© ${new Date().getFullYear()} Rashmi Metaliks. All rights reserved.</p>
            <p><small>Please note that this is an automated response. Please do not reply to this email.</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send primary email to globalhr@rashmigroup.com only
    const mailOptions = {
      from: `"Rashmi Metaliks Careers" <${process.env.HR_EMAIL_USER}>`,
      to: process.env.HR_EMAIL_USER,
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

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Job application email sent to ${process.env.HR_EMAIL_USER} - Ref: ${appId}`);
    } catch (error) {
      console.error(`Error sending HR application email - Ref: ${appId}:`, error);
      // Continue to send confirmation email even if HR email fails
    }

    // Send confirmation email to the applicant with retry logic
    let confirmationSent = false;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (!confirmationSent && attempts < maxAttempts) {
      try {
        await transporter.sendMail({
          from: `"Rashmi Metaliks HR" <${process.env.HR_EMAIL_USER}>`,
          to: data.email,
          subject: `Your Application for ${data.position} - Ref: ${appId}`,
          html: confirmationHtml,
          headers: {
            'X-Reference-ID': appId
          }
        });
        confirmationSent = true;
        console.log(`Application confirmation email sent to ${data.email}`);
      } catch (error) {
        attempts++;
        console.error(`Error sending application confirmation email (attempt ${attempts}):`, error);
        
        if (attempts < maxAttempts) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Error in job application email process:', error);
    return false;
  }
};