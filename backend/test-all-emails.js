const nodemailer = require('nodemailer');

const emailAccounts = [
  {
    name: 'Contact/Enquiry',
    email: 'globalenquiry@rashmigroup.com',
    pass: 'Headoffice@2025',
    purpose: 'Contact form submissions'
  },
  {
    name: 'HR/Careers',
    email: 'globalhr@rashmigroup.com',
    pass: 'RashmiHRhead2004',
    purpose: 'Job applications'
  },
  {
    name: 'Procurement',
    email: 'procurement@rashmigroup.com',
    pass: 'Rashmi@2026',
    purpose: 'Vendor registrations'
  }
];

async function testEmailAccount(account) {
  console.log(`\n🔧 Testing ${account.name} email...`);
  console.log(`📧 Email: ${account.email}`);
  console.log(`🎯 Purpose: ${account.purpose}`);
  
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: account.email,
        pass: account.pass
      },
      requireTLS: true
    });
    
    // Test connection
    await transporter.verify();
    console.log(`✅ ${account.name}: Connection verified`);
    
    // Try sending test email
    const info = await transporter.sendMail({
      from: `"Test ${account.name}" <${account.email}>`,
      to: account.email,
      subject: `Test - ${account.name} Email Service`,
      text: `Testing ${account.name} email service`,
      html: `<p>Testing <strong>${account.name}</strong> email service</p>`
    });
    
    console.log(`✅ ${account.name}: Test email sent (ID: ${info.messageId})`);
    return { account: account.name, status: 'success' };
    
  } catch (error) {
    console.log(`❌ ${account.name}: Failed`);
    console.log(`   Error: ${error.message}`);
    return { account: account.name, status: 'failed', error: error.message };
  }
}

async function testAllEmails() {
  console.log('🚀 Testing all email accounts for Rashmi Metaliks website...\n');
  console.log('Host: smtp.office365.com');
  console.log('Port: 587');
  console.log('Security: STARTTLS\n');
  
  const results = [];
  
  for (const account of emailAccounts) {
    const result = await testEmailAccount(account);
    results.push(result);
  }
  
  console.log('\n📊 SUMMARY:');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');
  
  console.log(`✅ Working: ${successful.length} accounts`);
  successful.forEach(r => console.log(`   - ${r.account}`));
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length} accounts`);
    failed.forEach(r => console.log(`   - ${r.account}: ${r.error}`));
  }
  
  if (failed.length > 0) {
    console.log('\n💡 TROUBLESHOOTING TIPS:');
    console.log('1. Verify credentials by logging into outlook.office365.com');
    console.log('2. Check if accounts need App Passwords instead of regular passwords');
    console.log('3. Ensure SMTP authentication is enabled in Exchange Online');
    console.log('4. Check if accounts are locked or need verification');
    console.log('5. Verify Exchange Online/Office365 licensing');
  }
}

testAllEmails(); 