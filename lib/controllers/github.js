const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      console.log('CONTROLLER, code:', code);
      const token = await exchangeCodeForToken(code);
      console.log('CONTROLLER, token', token);
      const { email, login, avatar_url } = await getGithubProfile(token);
      let user = await GithubUser.findByLogin(login);
      if (!user) {
        user = await GithubUser.insert({
          login,
          email,
          avatar: avatar_url,
        });
      }
      console.log('CONTROLLER, user: ', user);
    } catch (error) {
      next(error);
    }
  });
