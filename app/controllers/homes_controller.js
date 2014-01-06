/*
* Home画面
*   Quizeが常に出題されているはず
*/

/*
* Main画面
*   = Websocketの処理を行います
*/
var mongoose = require('mongoose')
  , Quize = mongoose.model('Quize')

exports.index = function(req, res){
  res.render('homes/index.ejs', { title: 'Express' })
}
