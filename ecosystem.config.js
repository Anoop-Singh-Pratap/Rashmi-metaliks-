module.exports = {
  apps: [
    {
      name: 'rashmi-backend',
      script: './backend/dist/index.js',
      cwd: '/home/rashmi/rashmi-metaliks',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      // Logging
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true,
      
      // Performance
      max_memory_restart: '1G',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Monitoring
      watch: false, // Set to true for development
      ignore_watch: ['node_modules', 'logs', '.git'],
      
      // Advanced PM2 features
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Auto restart on file changes (development only)
      watch_options: {
        followSymlinks: false
      }
    }
  ],

  deploy: {
    production: {
      user: 'rashmi',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'your-git-repository-url',
      path: '/home/rashmi/rashmi-metaliks',
      'pre-deploy-local': '',
      'post-deploy': 'npm run install:all && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
