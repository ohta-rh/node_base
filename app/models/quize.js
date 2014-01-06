/*
 * クイズモデル
 */
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env]
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var OptionSchema = new Schema({
  title: String,
  answer: Boolean
});
var QuizeSchema = new Schema({
  quize: ObjectId,
  title: String,
  body: String,
  opts: [OptionSchema]
});


mongoose.model('Quize', QuizeSchema);
var Quize;

