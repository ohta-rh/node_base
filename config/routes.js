/*
 * Routing module
 */
 var async = require('async')
 /**
 * Controllers
 */

var home = require('../app/controllers/homes_controller')
  , quizes = require('../app/controllers/quizes_controller')
  , sessions = require('../app/controllers/sessions_controller')
  , auth = require('./middleware/auth')

/**
 * Route middlewares
 */
var home_auth = [auth.requiresLogin, home.hasAuthorization]


module.exports = function (app, passport) {
  // user routes
  app.get('/login', sessions.login)
  app.get('/signup', sessions.signup)
  app.get('/logout', sessions.logout)
  app.post('/sessions', sessions.create)
  app.post('/sessions/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), sessions.session)
  app.get('/sessions/:userId', sessions.show)
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), sessions.signin)
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), sessions.authCallback)
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), sessions.signin)
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), sessions.authCallback)

  app.param('userId', sessions.user)

 // home route
  app.get('/', home.index)

  /* quize routes */
  app.get("/quizes", quizes.index)

}
