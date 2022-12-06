const { Router } = require('express');
const { exchangeCodeForToken } = require('../services/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      console.log('this is code:', code);
      const token = await exchangeCodeForToken(code);
      console.log('this is token', token);
    } catch (error) {
      next(error);
    }
  });
