"use strict";
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http')
var fs = require('fs')
var passport = require('passport')
var flash = require('connect-flash');

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  mongoose.connect(config.db, options)
}
connect()

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect()
})

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

var app = express();

// express settings
require('./config/express')(app, config, passport)

/* Bootstrap routes */
require('./config/routes')(app, passport)

// bootstrap passport config
require('./config/passport')(passport, config)

/* socket.io open */
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
var io = require('socket.io').listen(server);

// TODO: あとで外部ファイルに

// welcomeメッセージ
io.sockets.on('connection', function (socket) {

  //TODO: ohta データベースへのfetchあり
  socket.on('welcome', function(data) {
    console.log("welcome")
    socket.emit('action', { data: "hogehoge"})
    socket.broadcast.emit('action', {data: "data"});
  });

  socket.on('click', function (data) {
    socket.emit('action', {data: data["data"]});
    socket.broadcast.emit('action', {data: data["data"]});
  });
  // Quize出題


});



// login required

