const express = require("express");
const app = express();
const socketio = require("socket.io");
const mongoose = require("mongoose");
var randomId = require("random-id");
const { User, update_word_function } = require("./user");
let { users } = require("./user");

// length of the id (default is 30)
var len = 10;
// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
var pattern = "aA0";

const expressServer = app.listen(8080, () => {
  try {
    console.log("server running");
  } catch (error) {
    console.log(error.message);
  }
});

const io = socketio(expressServer);

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>//
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>//
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>//

//my global array or clients
// let arr = [];

// here is my ranodom paragraph
let para = [
  "So, I was essentially a "
];
// So, I was essentially a backbencher or some kind of outcast there. Feeling a bit dejected, I wanted to prove something my worth to them. So, I started to wait for an opportunity.
function myFunction() {
  let random = Math.floor(Math.random() * para.length);
  return random;
}

//on connect
let count = 0;
let totalWords = 0;

io.on("connection", (socket) => {
  count += 1;

  socket.on("username", ({ username }) => {

    var id = randomId(len, pattern);
    console.log(id);
    socket.emit("roomno", id);
  });
let Room;
  socket.on("joinroom", ({ username, roomvalue }) => {
    const user = User(socket.id, username, roomvalue);
    console.log(roomvalue + "from join room");
    console.log(socket.id + "from line no 68");
    socket.join(roomvalue);
    Room=roomvalue;
    let user_Data=users.filter((ele)=>{
           ele.roomvalue===roomvalue
    })
    io.emit("usersarray", user_Data)
    socket.emit("message", "WELCOME TO RACE BUDDY 😉");
  });
  console.log(`One user connected, total user : ${count}`);

  socket.on("timeleft", (data) => {
   let {timeleft}=data;
   socket.broadcast.to(Room).emit("Time",{timeleft})
  });
  io.emit('user count', count);

  socket.on("display", (data) => {
    socket.broadcast.to(Room).emit("forall", data);
  });

  //emitting the paragraph
  let myParagraph = para[0];
  socket.emit("thePara", myParagraph);

  //recieving the typed text from client
  socket.on("typedText", ({ typedText }) => {
    console.log(`person having id ${socket.id} is typing :`, typedText);

    if (
      typedText[typedText.length - 1] == myParagraph[typedText.length - 1] &&
      includeFunction(myParagraph, typedText)
    ) {
      if (typedText.length == myParagraph.length) {
        console.log(typedText);
        // users = []
        return socket.emit("typing-update", {
          typedText: "You have finished the race buddy 👏👏👏",
          flag: "Race Completed",
        });
      }
      if (typedText[typedText.length - 1] == " ") {
        let user = update_word_function(socket.id, typedText);
        console.log(user);
        console.log(user[0])
        io.to(user[0].roomvalue).emit("user_data",
          user[0],

        );
      }
      // console.log({ typedText, keyCode });
      socket.emit("typing-update", {
        typedText,

        isTyping: true,
        socketID: socket.id,
        flag: true,
        totalWords,
      });
    } else {
      socket.emit("typing-update", {
        typedText,
        isTyping: false,
        socketID: socket.id,
        flag: false,
        totalWords,
      });
    }
  });
  //disconnet
  socket.on("disconnect", () => {
    count -= 1;
    console.log(`One user left, ${count} remaining!!`);
    io.emit('user count', count);
  });
});

/*Here I am checking includes */
const includeFunction = (myParagraph, typedText) => {
  if (myParagraph.includes(typedText)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { count }