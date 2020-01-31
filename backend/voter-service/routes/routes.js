const express = require('express');
const listController = require('../controllers/vote.controller');
const authVerifier= require('../helpers/auth-verifier.helper')
module.exports = (function () {
  var router = express.Router();

  router.get('/api/v1/list', listController.getData);
  router.post('/api/v1/list', listController.postData);
  router.post('/api/votescount/:id', listController.voteCount);
  router.post('/api/login', listController.logIn);
  router.post('/api/register', listController.register);
  return router;
})();
