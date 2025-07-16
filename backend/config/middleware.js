// This file is not used in Strapi v4/v5, but we can use it to define our CORS origins.
module.exports = {
  // ...
  // Other middleware configurations
  // ...
  cors: {
    enabled: true,
    origin: ['http://rashmimetaliks.com', 'https://rashmimetaliks.com', 'http://localhost:8080', 'http://localhost:3000'],
  },
  // ...
}; 