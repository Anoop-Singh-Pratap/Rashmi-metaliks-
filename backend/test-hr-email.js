const nodemailer = require('nodemailer');

async function testHREmail() {
  console.log('🔧 Testing HR email credentials...');
  console.log('📧 Email: globalhr@rashmigroup.com');
  console.log('🔑 Password: RashmiHRhead2004');
  console.log('');

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'globalhr@rashmigroup.com',
        pass: 'RashmiHRhead2004'
      },
      requireTLS: true
    });
    
    console.log('⏳ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    console.log('⏳ Sending test email...');
    const info = await transporter.sendMail({
      from: '"Rashmi HR Test" <globalhr@rashmigroup.com>',
      to: 'globalhr@rashmigroup.com',
      subject: 'Test Email - HR Credentials',
      text: 'This is a test email to verify HR email credentials.',
      html: '<p>This is a test email to verify HR email credentials.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('🎉 HR email configuration is working correctly!');
    
  } catch (error) {
    console.log('❌ HR email test failed:');
    console.log('Error Code:', error.code || 'UNKNOWN');
    console.log('Error Command:', error.command || 'UNKNOWN');
    console.log('Error Message:', error.message || 'No message available');
    console.log('');
    console.log('🔧 Troubleshooting suggestions:');
    console.log('1. Check if SMTP authentication is enabled for this account');
    console.log('2. Verify if the account requires an App Password instead of regular password');
    console.log('3. Check if the account is not locked or requires additional verification');
    console.log('4. Ensure the account has proper Exchange Online/Office365 licensing');
  }
}

testHREmail(); 