import { Router, Request, Response } from 'express';
import { testCustomEmailService, sendCustomContactFormEmail, createHREmailTransporter } from '../services/customEmailService.js';

const router = Router();

/**
 * Test endpoint for custom email service
 * GET /api/test-email/custom
 */
router.get('/custom', async (req: Request, res: Response) => {
  try {
    console.log('Testing custom email service...');
    
    const testResult = await testCustomEmailService();
    
    if (testResult) {
      return res.status(200).json({
        success: true,
        message: 'Custom email service test completed successfully',
        timestamp: new Date().toISOString(),
        recipient: 'anoop.singh@rashmigroup.com'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Custom email service test failed',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error in custom email test endpoint:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while testing the custom email service',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Health check endpoint for email services
 * GET /api/test-email/health
 */
router.get('/health', async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Email service health check endpoint is working',
    services: {
      customEmailService: 'Available for testing',
      originalEmailService: 'Working normally'
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * Diagnostic endpoint to check environment variables and services
 * GET /api/test-email/diagnostic
 */
router.get('/diagnostic', async (req: Request, res: Response) => {
  try {
    const diagnostics = {
      environment: {
        nodeEnv: process.env.NODE_ENV || 'not set',
        port: process.env.PORT || 'not set',
        emailUser: process.env.EMAIL_USER ? 'configured' : 'missing',
        emailPass: process.env.EMAIL_PASS ? 'configured' : 'missing'
      },
      services: {
        supabase: 'checking...',
        email: 'checking...'
      },
      timestamp: new Date().toISOString()
    };

    // Supabase has been removed - email-only mode
    diagnostics.services.supabase = 'disabled (email-only mode)';

    // Test email service
    try {
      const emailTest = await testCustomEmailService();
      diagnostics.services.email = emailTest ? 'working' : 'failed';
    } catch (emailError) {
      diagnostics.services.email = `exception: ${emailError instanceof Error ? emailError.message : 'unknown'}`;
    }

    return res.status(200).json({
      success: true,
      message: 'Diagnostic check completed',
      diagnostics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in diagnostic endpoint:', error);
    return res.status(500).json({
      success: false,
      message: 'Diagnostic check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Test contact form with sample data
 * POST /api/test-email/contact-form
 */
router.post('/contact-form', async (req: Request, res: Response) => {
  try {
    
    // Sample contact form data for testing
    const testContactData = {
      name: req.body.name || 'Test User',
      email: req.body.email || 'test@example.com',
      subject: req.body.subject || 'Test Contact Form Submission',
      message: req.body.message || 'This is a test message to verify the contact form email functionality.',
      selectedProducts: req.body.selectedProducts || ['Ductile Iron Pipe', 'DI Fittings']
    };

    console.log('Testing contact form with data:', testContactData);
    
    const customEmailResult = await sendCustomContactFormEmail(testContactData);
    
    if (customEmailResult) {
      return res.status(200).json({
        success: true,
        message: 'Contact form test completed successfully',
        data: {
          testContactData,
          customEmailSent: customEmailResult
        },
        timestamp: new Date().toISOString()
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Contact form test failed',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error in contact form test endpoint:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while testing the contact form',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Test application submission without files
 * POST /api/test-email/application
 */
router.post('/application', async (req: Request, res: Response) => {
  try {
    console.log('Testing application submission...');
    
    // Sample application data for testing
    const testApplicationData = {
      firstName: req.body.firstName || 'Test',
      lastName: req.body.lastName || 'Applicant',
      email: req.body.email || 'test@example.com',
      phone: req.body.phone || '+91-9876543210',
      position: req.body.position || 'Software Engineer',
      department: req.body.department || 'IT',
      experience: req.body.experience || 'Test experience description',
      education: req.body.education || 'Test education background',
      coverLetter: req.body.coverLetter || 'Test cover letter content',
      source: req.body.source || 'Website'
    };

    console.log('Test application data:', testApplicationData);
    
    // Import the submitApplication function
    const { submitApplication } = await import('../controllers/applicationController.js');
    
    // Create a mock request and response
    const mockReq = {
      body: testApplicationData,
      file: undefined
    } as any;
    
    const mockRes = {
      status: (code: number) => ({
        json: (data: any) => {
          console.log('Mock response:', { status: code, data });
          return res.status(code).json({
            test: true,
            originalStatus: code,
            originalData: data,
            timestamp: new Date().toISOString()
          });
        }
      })
    } as any;
    
    await submitApplication(mockReq, mockRes);
    
  } catch (error) {
    console.error('Error in application test endpoint:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while testing the application submission',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * View stored applications in memory
 * GET /api/test-email/stored-applications
 */
router.get('/stored-applications', async (req: Request, res: Response) => {
  try {
    // Import the applicationSubmissionsStore
    const { applicationSubmissionsStore } = await import('../controllers/applicationController.js');
    
    return res.status(200).json({
      success: true,
      message: 'Retrieved stored applications from memory',
      totalApplications: applicationSubmissionsStore.length,
      applications: applicationSubmissionsStore.map((app: any, index: number) => ({
        index: index + 1,
        applicationId: app.applicationId,
        name: `${app.firstName} ${app.lastName}`,
        email: app.email,
        position: app.position,
        department: app.department || 'Not specified',
        submittedAt: 'Stored in memory - timestamp not tracked'
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error retrieving stored applications:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve stored applications',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Test HR email credentials specifically
 * GET /api/test-email/hr-test
 */
router.get('/hr-test', async (req: Request, res: Response) => {
  try {
    console.log('Testing HR email credentials...');
    
    // Create transporter
    const transporter = createHREmailTransporter();
    
    // Test connection
    console.log('Attempting to verify SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    
    // Test sending a simple email
    console.log('Attempting to send test email...');
    await transporter.sendMail({
      from: '"Rashmi HR Test" <globalhr@rashmigroup.com>',
      to: 'globalhr@rashmigroup.com',
      subject: 'HR Email Service Connection Test',
      html: `
        <h2>HR Email Service Test</h2>
        <p>This is a test email to verify HR email service connectivity.</p>
        <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
        <p>If you receive this email, the HR email service is working correctly.</p>
      `
    });
    
    return res.status(200).json({
      success: true,
      message: 'HR email service test completed successfully',
      credentials: {
        email: 'globalhr@rashmigroup.com',
        passwordSet: true
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('HR email test failed:', error);
    return res.status(500).json({
      success: false,
      message: 'HR email service test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: (error as any)?.code || 'UNKNOWN',
      errorCommand: (error as any)?.command || 'UNKNOWN',
      credentials: {
        email: 'globalhr@rashmigroup.com',
        passwordSet: true
      },
      timestamp: new Date().toISOString()
    });
  }
});

export { router as testEmailRoutes }; 
