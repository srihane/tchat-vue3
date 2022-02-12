// Enable or Disable HTTPS
let enable_HTTPS = false; // DISABLE HTTPS when on local more easy

//Global data
let config = require('./config.json')

// MYSQL
/*
const mysql = require('mysql');
console.log(config.database)

  const db = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.dbname,
    user: config.login,
    password: config.mdp
  });
*/

var today = new Date();
var Datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
var _Datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
var _DatetimetoISO = new Date().toISOString();

//Dependencies
let fs = require('fs')
let path = require('path')
let express = require('express');

//Variables Globales
let socketio = require('socket.io');
const app = express();
let http
let https
let server


if( enable_HTTPS == true ){ // IF HTTPS
    // USE CERTBOT TO GENERATION YOUR CERTIFICAT HTTPS
    // BE SURE YOUR DOMAINE NAME REDIRECT TO THE SERVER IPV4 / IPV6 <=============
    // ONLY ON HTTP
    https = require('https');
    const https_options = {
        key: fs.readFileSync('/etc/letsencrypt/live/rihane-samy.fr/privkey.pem'), // <----------------- CHANGE IT
        cert: fs.readFileSync('/etc/letsencrypt/live/rihane-samy.fr/cert.pem'), // <----------------- CHANGE IT
        //requestCert: false,
        rejectUnauthorized: false
    }
    server = https.Server(https_options, app);
}
else if( enable_HTTPS == false ) { // IF HTTP
    http = require('http');
    server = http.Server(app);
}


const io = socketio(server, {
  cors:{
    origin: "*",
    methods: ["GET", "POST"]
  }
})
var port = config.port

/*
app.get("/", function(req, res){
  //res.sendFile(__dirname + '/index.html');
  //res.sendFile(__dirname + '/index.html');
  res.send("Hello")
})
*/

//Liste des utilisateurs
let usersConnected = []

io.on('connection', function(socket){
  //console.log(socket)
  //console.log(socket)
  console.log('a user is connected : '+socket.id);


    //Connexion new wallet or ancient wallet & send informations
    
    socket.on('newconnected', username => {
      usersConnected[socket.id] = username
      console.log(usersConnected)
      socket.broadcast.emit("newconnected", getUsers())
      socket.emit("newconnected", getUsers())
    });

  //Connexion new wallet or ancient wallet & send informations
  socket.on('message', data => {
    //socket.emit('message', result);
    console.log(data)
    socket.broadcast.emit("message:received", data)
  });


  // Only when user disconnect
  socket.on('disconnect', () => {
    console.log("user "+socket.id+" has left")
    if(usersConnected[socket.id])
    {
      delete usersConnected[socket.id]
      socket.broadcast.emit("newconnected", getUsers())
      console.log(usersConnected)
    }
    
  })

}); //io.on connection -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/--/-/-/-/-



server.listen(port, function(){
  console.log("Server is running on port : "+port);
})



function getUsers() {
  let users = []

  for(let socketid in usersConnected)
  {
    //users.push(usersConnected[socketid])
    users.push({
      socketid: socketid,
      user: usersConnected[socketid]
    })
  }

  return users
}