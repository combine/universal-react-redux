import express from 'express';

const env = process.env.NODE_ENV || 'development';
const router = express.Router();
const handleRender = require(
  env === 'production' ? './handleRender.built' : './handleRender'
).default;

router.use(handleRender);

module.exports = router;
