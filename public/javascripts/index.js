
/* ViewModel を定義します
/* applicationのVIWEを管理します
*/
var QuizeViewModel = {
  title: ko.observable(""),
  body: ko.observable("")
}

ko.applyBindings(QuizeViewModel);
// websockets
var socket = io.connect('http://localhost:3000');

socket.on('action', function(data) {
  console.log("action")
  console.log(data)
  QuizeViewModel.title(data["data"]);
  QuizeViewModel.body(data["data"])
});

var click_handler = function(){
  console.log("emit");
  socket.emit('click', {data: $('#txt-word').val()});
}
$('#btn-click').click(click_handler);

var onload_handler = function(){
  console.log("onload")
  socket.emit('welcome', function (data) {
    QuizeViewModel.title(data["data"])
    QuizeViewModel.body(data["data"])
  });
}

window.onload = onload_handler;
