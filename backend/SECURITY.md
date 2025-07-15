# 🔒 Security Guidelines for Rashmi Metaliks Backend

## 🚨 CRITICAL: Hardcoded Token Removal

### What Was Fixed
- **Removed hardcoded CMS API token** from `src/index.ts`
- **Implemented proper environment variable validation**
- **Added secure logging** that doesn't expose sensitive data

### Immediate Actions Required

#### 1. Rotate the Exposed Token
The following token was exposed in source code and must be rotated immediately:
```
945a7c504ca0964b7ff6e2de950c357e5480c31f2f3e6531dec0f2f1b1a8159e284ef56ca1f3db9fb9090d8f484e26490ac6c3c2d8fef46a2ddace4f8d151de38843b726c0043762e33cdbc1e0e9414c70bf8369202c3fb153efceb822d10b014da25be65388b25d78feaae99b508c2147570d6e200b6e763bac146fde7362fb
```

**Steps to rotate:**
1. Log into your Strapi admin panel
2. Go to Settings > API Tokens
3. Delete the exposed token
4. Generate a new API token
5. Update your environment variables

#### 2. Update Environment Variables

**Development (.env file):**
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your actual values
CMS_API_TOKEN=your_new_secure_token_here
```

**Production (Vercel/hosting platform):**
- Update the `CMS_API_TOKEN` environment variable
- Ensure all other sensitive variables are properly set

#### 3. Verify Git History
```bash
# Check if the token appears in git history
git log --all --grep="945a7c504ca0964b7ff6e2de950c357e"

# If found, consider using git-filter-branch or BFG Repo-Cleaner
# to remove it from history (advanced operation)
```

## 🛡️ Security Best Practices

### Environment Variables
- ✅ Never hardcode secrets in source code
- ✅ Use different tokens for development and production
- ✅ Rotate tokens regularly (every 90 days)
- ✅ Use strong, randomly generated tokens
- ✅ Keep .env files out of version control

### Token Management
- ✅ Use principle of least privilege
- ✅ Set token expiration dates when possible
- ✅ Monitor token usage and access logs
- ✅ Revoke unused or suspicious tokens immediately

### Code Security
- ✅ Regular security audits
- ✅ Dependency vulnerability scanning
- ✅ Input validation and sanitization
- ✅ Proper error handling without information leakage

## 🔍 Security Checklist

### Before Deployment
- [ ] All environment variables properly set
- [ ] No hardcoded secrets in code
- [ ] Tokens rotated if previously exposed
- [ ] .env files not in version control
- [ ] Security headers configured (Helmet.js)
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Error handling doesn't leak sensitive info

### Regular Maintenance
- [ ] Monthly token rotation
- [ ] Quarterly security audit
- [ ] Dependency updates and vulnerability checks
- [ ] Access log monitoring
- [ ] Backup and recovery testing

## 🚨 Incident Response

### If a Token is Compromised
1. **Immediately revoke** the compromised token
2. **Generate a new token** with different permissions if possible
3. **Update all systems** using the old token
4. **Monitor logs** for suspicious activity
5. **Document the incident** and lessons learned

### Emergency Contacts
- Development Team Lead: [Add contact]
- Security Officer: [Add contact]
- Infrastructure Team: [Add contact]

## 📋 Environment Variable Reference

### Required Variables
- `CMS_API_TOKEN` - Strapi API token (CRITICAL)
- `SUPABASE_SERVICE_KEY` - Supabase service role key (CRITICAL)
- `EMAIL_PASS` - Email service password (SENSITIVE)

### Optional Variables
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA secret
- `CORS_ORIGIN` - Allowed CORS origins
- `PORT` - Server port (default: 3001)

## 🐧 **AlmaLinux Deployment Security**

### Server Security Checklist
- [ ] Server updated with latest security patches
- [ ] Firewall configured (only necessary ports open)
- [ ] SSH key-based authentication enabled
- [ ] Root login disabled
- [ ] Application running as non-root user
- [ ] SSL/TLS certificates properly configured
- [ ] Nginx security headers enabled
- [ ] Log monitoring and rotation configured
- [ ] Intrusion detection system installed
- [ ] Regular security audits scheduled

### File Permissions
```bash
# Set secure permissions
chmod 600 /home/rashmi/rashmi-metaliks/backend/.env
chmod 755 /home/rashmi/rashmi-metaliks/deployment/deploy.sh
chown -R rashmi:rashmi /home/rashmi/rashmi-metaliks
```

### Process Management
- [ ] PM2 configured with proper restart policies
- [ ] Process monitoring and alerting set up
- [ ] Resource limits configured
- [ ] Log rotation enabled
- [ ] Health checks automated

## 🔗 Additional Resources

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Supabase Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Strapi Security Guide](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html#security)
- [AlmaLinux Security Guide](https://wiki.almalinux.org/documentation/security.html)
- [PM2 Production Guide](https://pm2.keymetrics.io/docs/usage/deployment/)

---

**Last Updated:** [Current Date]
**Next Review:** [Date + 3 months]
