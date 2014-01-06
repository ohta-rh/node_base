"use strict";
// TODO: ohta Admin

/*
* Main画面
*   = Websocketの処理を行います
*/
exports.index = function(req, res){
  res.render('index.ejs', { title: 'Express' })
}
