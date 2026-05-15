const { env } = require("../configs/env.config");

function publicConfig(req, res) {
  res.json({
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY || env.VITE_GOOGLE_API_KEY || null,
  });
}

module.exports = {
  publicConfig,
};
