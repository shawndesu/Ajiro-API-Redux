// index.js

const express = require("express");
const secure = require('ssl-express-www');
const cors = require("cors");
const path = require("path");
const helmet = require('helmet');
const compression = require('compression');
const log = require("./system/log");
const config = require("./config");

global.config = config;
global.api = new Map();

const app = express();

// Pretty-print JSON
app.set('json spaces', 2);
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(body) {
    if (body && typeof body === 'object') {
      return originalJson.call(this, body, null, 2);
    }
    return originalJson.call(this, body);
  };
  next();
});

// Security & performance
app.use(secure);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Body parsing & static assets
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'system', 'public'), { maxAge: '1d', etag: true }));
app.use(express.static(path.join(__dirname, 'system', 'assets'), { maxAge: '1d', etag: true }));

// Mount router
const router = require("./system/router");
app.use(router);

// API listing endpoint
app.get("/api/info", (req, res) => {
  try {
    const apiList = Array.from(global.api.entries()).map(([filename, api]) => ({
      name: api.meta.name,
      description: api.meta.description,
      endpoint: `/api/${filename}${
        api.meta.params && api.meta.params.length
          ? '?' + api.meta.params.map(p => `${p}={${p}}`).join('&')
          : ''
      }`,
      category: api.meta.category
    }));
    res.json({ apis: apiList, config: global.config });
  } catch (err) {
    log.error('Error generating API list:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate API list'
    });
  }
});

// Serve portal & docs
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "system", "public", "portal.html"))
);
app.get("/docs", (req, res) =>
  res.sendFile(path.join(__dirname, "system", "public", "docs.html"))
);

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "system", "public", "404.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  log.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
const PORT = process.env.PORT || global.config.port || 3000;
const server = app.listen(PORT, () => log.main(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', () => {
  log.main('SIGTERM received, shutting down...');
  server.close(() => process.exit(0));
});

process.on('uncaughtException', err => {
  log.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
