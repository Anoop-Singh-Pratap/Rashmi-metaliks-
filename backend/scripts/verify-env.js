#!/usr/bin/env node

/**
 * Environment Variable Verification Script
 * 
 * This script verifies that all required environment variables are properly set
 * and provides helpful feedback for missing or incorrectly configured variables.
 * 
 * Usage: node scripts/verify-env.js
 */

require('dotenv').config();

const chalk = require('chalk');

// Define required and optional environment variables
const REQUIRED_VARS = [
  'CMS_API_TOKEN',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_KEY'
];

const OPTIONAL_VARS = [
  'PORT',
  'NODE_ENV',
  'CMS_API_URL',
  'CMS_NEWS_API_ID',
  'CMS_NEWS_PANEL_API_ID',
  'CORS_ORIGIN',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
  'RECAPTCHA_SECRET_KEY'
];

const SENSITIVE_VARS = [
  'CMS_API_TOKEN',
  'SUPABASE_SERVICE_KEY',
  'EMAIL_PASS',
  'RECAPTCHA_SECRET_KEY'
];

console.log(chalk.blue.bold('\n🔍 Environment Variable Verification\n'));

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log(chalk.yellow('Required Variables:'));
REQUIRED_VARS.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(chalk.red(`  ❌ ${varName}: Not set`));
    hasErrors = true;
  } else if (value.includes('your_') || value.includes('example')) {
    console.log(chalk.red(`  ❌ ${varName}: Contains placeholder value`));
    hasErrors = true;
  } else {
    const displayValue = SENSITIVE_VARS.includes(varName) 
      ? '✅ Set (hidden for security)'
      : `✅ Set: ${value}`;
    console.log(chalk.green(`  ${displayValue}`));
  }
});

// Check optional variables
console.log(chalk.yellow('\nOptional Variables:'));
OPTIONAL_VARS.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(chalk.gray(`  ⚪ ${varName}: Not set (using default)`));
  } else if (value.includes('your_') || value.includes('example')) {
    console.log(chalk.yellow(`  ⚠️  ${varName}: Contains placeholder value`));
    hasWarnings = true;
  } else {
    const displayValue = SENSITIVE_VARS.includes(varName) 
      ? '✅ Set (hidden for security)'
      : `✅ Set: ${value}`;
    console.log(chalk.green(`  ${displayValue}`));
  }
});

// Security checks
console.log(chalk.yellow('\nSecurity Checks:'));

// Check for hardcoded tokens (this should not happen after our fix)
const cmsToken = process.env.CMS_API_TOKEN;
if (cmsToken && cmsToken.startsWith('945a7c504ca0964b7ff6e2de950c357e')) {
  console.log(chalk.red('  ❌ CRITICAL: Hardcoded/exposed token detected!'));
  console.log(chalk.red('      This token was previously exposed and must be rotated immediately.'));
  hasErrors = true;
} else if (cmsToken) {
  console.log(chalk.green('  ✅ CMS token appears to be properly configured'));
}

// Check token length (basic validation)
if (cmsToken && cmsToken.length < 32) {
  console.log(chalk.yellow('  ⚠️  CMS token seems too short - ensure it\'s a proper API token'));
  hasWarnings = true;
}

// Summary
console.log(chalk.blue.bold('\n📋 Summary:'));
if (hasErrors) {
  console.log(chalk.red('❌ Configuration has ERRORS - application may not start properly'));
  console.log(chalk.yellow('💡 Please fix the errors above before starting the application'));
  process.exit(1);
} else if (hasWarnings) {
  console.log(chalk.yellow('⚠️  Configuration has warnings - some features may not work'));
  console.log(chalk.blue('ℹ️  Application should start, but consider addressing warnings'));
} else {
  console.log(chalk.green('✅ All environment variables are properly configured!'));
}

console.log(chalk.blue('\n🚀 Ready to start the application\n'));
