const express=require("express");
const app=express();
const socketio=require("socket.io");
const{connection}= require("./db")
var randomId = require('random-id');
const {userRouter}=require("./routes/userRoutes.js")
const passport=require("./middlewares/google_oauth")
var cors = require('cors')
app.use(cors())
app.use(express.json())

 const {User}=require("./user")
 app.use("/user",userRouter)
 app.use(express.json())
// length of the id (default is 30)
var len = 10;
// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
var pattern = 'aA0'
 
// ------------------google oauth-----------

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/user/login' },{session:false}),
  function(req, res) {
       console.log(req.user)
    res.redirect('/');
  });

app.get("/",(req,res)=>{
    res.send("This is My Home page")
})

const expressServer=app.listen(8080,async()=>{
    try {
        await connection
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

