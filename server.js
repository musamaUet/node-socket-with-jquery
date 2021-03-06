// var express = require('express');
// var http=require('http');
// var app=express();
// var server=http.createServer(app);
// const io=require('socket.io').listen(server);

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html');
// })

// users=[];
// io.on('connection', socket => {
//     console.log('user connected Muhammad');
    
//     socket.on('setUsername',function(data){
//         if(users.indexOf(data)> -1){
//             users.push(data)
//             socket.emit('setUser',{username:data})
//         } else {
//             socket.emit('userExists',data + 'username is taken! Try other username' )
//         }
//     });

//     socket.on('msg', function(data) {
//         //Send message to everyone
//         io.sockets.emit('newmsg', data);
//      })

//     // setTimeout(function(){
//     //     socket.send('Message send with in 4s');
//     //     socket.emit('testerEvent',{description:'this is a testerEvnet and will expire after 4 seconds'});
//     // },4000)

//     // io.sockets.emit('Broadcast',{description:clients + 'clients connected'})
//     // socket.on('clientEvent',(data)=>{
//     //     console.log(data);
//     // })

//     socket.on('disconnect',()=>{
// //        clients--;
//         console.log('from disconnected method');
// //        io.sockets.emit('Broadcast',{description:clients + 'Clients disconnected'})
//     })
// })

// server.listen(3000,()=>{
//     console.log('server started');
// })


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendFile(__dirname+'/index.html');
});

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log('calling within setUsername', data);
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      // Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});