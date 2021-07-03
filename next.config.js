const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: 'TRAVELOGUE',
    API_DEVELOPMENT: 'http://localhost:5002/api',
    API_PRODUCTION: 'https://travelogue-frontend.vercel.app/api',
    PRODUCTION: true,
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://travelogue-frontend.vercel.app/',
    DISQUS_SHORTNAME: 'travelogue',
    GOOGLE_CLIENT_ID:
      '1096273975776-r8siu0knv29jhljq3po7h2dfvsejlskq.apps.googleusercontent.com',
  },
});
