require('dotenv').config();
module.exports = {
    default_city: 'Belgorod',
    api_key: process.env.API_KEY,
    base_url: process.env.BASE_URL,
    port: process.env.PORT
  }