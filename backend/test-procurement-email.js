const nodemailer = require('nodemailer');

async function testProcurementEmail() {
  console.log('🔧 Testing Procurement email credentials...');
  console.log('📧 Email: procurement@rashmigroup.com');
  console.log('🔑 Password: Rashmi@2026');
  console.log('');

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'procurement@rashmigroup.com',
        pass: 'Rashmi@2026'
      },
      requireTLS: true
    });
    
    console.log('⏳ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    console.log('⏳ Sending test email...');
    const info = await transporter.sendMail({
      from: '"Rashmi Procurement Test" <procurement@rashmigroup.com>',
      to: 'procurement@rashmigroup.com',
      subject: 'Test Email - Procurement Credentials',
      text: 'This is a test email to verify procurement email credentials.',
      html: '<p>This is a test email to verify procurement email credentials.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('🎉 Procurement email configuration is working correctly!');
    
  } catch (error) {
    console.log('❌ Procurement email test failed:');
    console.log('Error Code:', error.code || 'UNKNOWN');
    console.log('Error Command:', error.command || 'UNKNOWN');
    console.log('Error Message:', error.message || 'No message available');
    console.log('');
    console.log('🔧 Troubleshooting suggestions:');
    console.log('1. Check if SMTP authentication is enabled for this account');
    console.log('2. Verify if the account requires an App Password instead of regular password');
    console.log('3. Check if the account is not locked or requires additional verification');
    console.log('4. Ensure the account has proper Exchange Online/Office365 licensing');
    console.log('5. Try logging into outlook.office365.com with these credentials to verify');
  }
}

testProcurementEmail(); 