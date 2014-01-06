
/**
 * Module dependencies.
 */

var express = require('express')
  , flash = require('connect-flash')
  , pkg = require('../package.json')
var partials = require('express-partials')
var path = require('path')
var cookieSessions = require('../cookie-session')

var env = process.env.NODE_ENV || 'development'

module.exports = function (app, config, passport) {

  app.set('showStackError', true)

  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 9
  }))

  app.use(express.favicon())
  app.use(express.static(config.root + '/public'))
  // all environments
  app.set('port', process.env.PORT || 3000)
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'ejs')

  app.configure(function () {
    // expose package.json to views
    app.use(function (req, res, next) {
      res.locals.pkg = pkg
      next()
    })
    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    // cookieParser should be above session
    app.use(express.cookieParser());
    app.use(express.session({secret: '1234567890QWERTY'}));

    // use passport session
    app.use(passport.initialize())
    app.use(passport.session())


    // connect flash for flash messages - should be declared after sessions
    app.use(flash())


    // routes should be at the last
    app.use(app.router)
  })

  // development env config
  app.configure('development', function () {
    app.locals.pretty = true
  })
}
