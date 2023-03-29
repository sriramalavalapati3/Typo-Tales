const express=require("express");
const app=express();
const socketio=require("socket.io");
const mongoose=require("mongoose");
var randomId = require('random-id');
const {userRouter}=require("./routes/userRoutes.js")
var cors = require('cors')
app.use(cors())
 const {User}=require("./user")
 app.use("/user",userRouter)
// length of the id (default is 30)
var len = 10;
// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
var pattern = 'aA0'
 

const expressServer=app.listen(8080,()=>{
    try {
        console.log("server running")
    } catch (error) {
        console.log(error.message)
    }
});

const io=socketio(expressServer)

io.on("connection",(socket)=>{
   socket.on("username",({username})=>{
    var id = randomId(len, pattern);
    console.log(id);
    socket.emit("roomno",id)
   })
   socket.on("joinroom",({username,roomvalue})=>{
    const user = User(socket.id, username, roomvalue) ;
    console.log(roomvalue+"from join room")
    socket.join(roomvalue)
    socket.emit("message","welcome to race")
   })
})

