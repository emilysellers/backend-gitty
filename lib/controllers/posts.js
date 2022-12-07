const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const { Post } = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      console.log('CONTROLLER req.body: ', req.body);

      const posts = await Post.insert(req.body);
      console.log('CONTROLLER post: ', posts);
      res.json(posts);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  });
