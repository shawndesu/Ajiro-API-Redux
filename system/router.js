// system/router.js

const express = require('express');
const router = express.Router();
const { readdirSync } = require('fs-extra');
const path = require('path');
const log = require('./log');
const compression = require('compression');

// Use compression for all API routes
router.use(compression());

// Dynamically load all APIs from /api folder
const srcPath = path.join(__dirname, '../api/');
const apiFiles = readdirSync(srcPath).filter(f => f.endsWith('.js'));

apiFiles.forEach(file => {
  const api = require(path.join(srcPath, file));
  if (!api.meta || !api.onStart) return;

  const filename = path.basename(file, '.js');
  const method = (api.meta.method || 'get').toLowerCase();
  const route = `/api/${filename}`;

  // Register route (GET, POST, etc.)
  router[method](route, async (req, res) => {
    try {
      await api.onStart({ req, res, log });
    } catch (err) {
      log.error(`Error in ${filename} API:`, err);
      res.status(500).send("An error occurred");
    }
  });

  // Expose in global.api for /api/info
  global.api.set(filename, api);
  log.main(`Loaded ${filename} [${method.toUpperCase()}]`);
});

module.exports = router;
