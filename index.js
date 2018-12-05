const express=require('express');
const httpp= require('http');
const app=express();
var port = 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
var users=[];
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");
//app.use(express.static(path.join(__dirname, "js")));
app.get('/api/courses',(req,res)=>{
	res.send([1,2,3]);
});
app.get('/',function(req,res){
	res.render("index");
})

/*
const https = require('http');

const options = {
  hostname: 'en.wikipedia.org',
 // port:7000,
  path: '/wiki/Washington',
  method:'GET'
};

// Make a request
const req = https.request(options, function(res){
	var responbody="";
	console.log("response start ");
	console.log(`secer status: ${res.statuscode}`);
	res.setEncoding("UTF-8");
	res.once("data", function(chunk){
		console.log(chunk);
	});
	res.on("data", function(chunk){
		responbody+=chunk;
	});
	res.on("end", function(){
	
		console.log("end "+responbody);
	});

});
req.end();

req.on('information', (res) => {
	console.log(`Got information prior to main response: ${res.statusCode}`);
});
  
*/


server.listen(process.env.PORT || 3000, () => {
	console.log('Server running at port %d', port)});
io.on('connection', function (socket) {
	
	console.log(socket.id+" da ket noi den ");
	 socket.on('a-s', function(msg){
    console.log('message: ' + msg);
	//msg=msg.substring(0,msg.lastIndexOf(" "));
	//console.log('message: ' + msg);
	io.sockets.emit('a_chat_message', msg);
	
  });
  socket.on('getalluer',function(){
	  console.log('goi danh sach '+users.length);
	  socket.emit('alluers', users);
	  
  });
    socket.on('create-room',function(data){
		socket.join(data);
		socket.room=data;
		var mang=[];
		for (r in socket.adapter.rooms)
		{
			mang.push(r);
		}
		io.sockets.emit("s-to-r",mang);
		socket.emit("s-t-idroom",data);
  });
  // dang ky ngyio dung
  	socket.on('reg', function(msg){
		console.log('them nguoi dang ky: ' + msg+" id: "+socket.id);
		users.push(msg+" "+socket.id);
		socket.primary=msg+" "+socket.id;
	
	});
	 socket.on('to-room', function(data){
		// nhieu room thi chay vaong for roi emit
		io.sockets.in(socket.room).emit("room-cliet",data);
	
	});
  
  
  //
	socket.on('disconnect', function () {
   console.log('user disconnected');
   users.splice(users.indexOf(socket.primary), 1);
   console.log('danh sanch hien tai '+users.length);
  });
});
