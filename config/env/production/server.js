// Path: ./config/env/production/server.js`

module.exports = ({ env }) => ({
    url: env('MY_HEROKU_URL'),
    proxy: true,
    app: {
      keys: env.array('APP_KEYS', ['Snyu36ALh+Xp+n1NNy3zcw==', '5ZQV8QgnEsQR9m0sOoLHug==', 'vxayl/ZLb1Q5iDVBkQZgEA==', '0Aij5OQuTzXdN9oP/a0V3Q==']),
    },
  });
    
    