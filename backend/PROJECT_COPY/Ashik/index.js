const express = require("express");
const app = express();
const socketio = require("socket.io");
const mongoose = require("mongoose");
var randomId = require("random-id");
const { User, update_word_function } = require("../user");

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
  "Hello Guys my name is mohammad ashik ansari and  i am from the jharkhand state of india",
  "this is our contruct week project guys in this we will be making the clone of typeracer website",
  "Hii this is my laptop and it has 8 gb of ram",
  "kaisa hai bhai log sab let's make our project that we have got during our construct week",
  "the ipl season 17 is going to be started from 30th of march 2023",
  "Chennai super kings is my favourite ipl team this year what about you all guys",
  "I have the highest typing record of 60 wpm",
];

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
  socket.on("joinroom", ({ username, roomvalue }) => {
    const user = User(socket.id, username, roomvalue);
    console.log(roomvalue + "from join room");
    console.log(socket.id + "from line no 68");
    socket.join(roomvalue);
    socket.emit("message", "welcome to race");
  });
  console.log(`One user connected, total user : ${count}`);

  //emitting the paragraph
  let myParagraph = para[myFunction()];
  socket.emit("thePara", myParagraph);

  //recieving the typed text from client
  socket.on("typedText", ({ typedText, keyCode, flag }) => {
    console.log(`person having id ${socket.id} is typing :`, typedText);

    if (
      typedText[typedText.length - 1] == myParagraph[typedText.length - 1] &&
      includeFunction(myParagraph, typedText)
    ) {
      if (typedText.length == myParagraph.length) {
        console.log(typedText);
        return socket.emit("typing-update", {
          typedText: "You have finished the race",
          flag,
        });
      }
      if (typedText[typedText.length - 1] == " ") {
        let user = update_word_function(socket.id, typedText);
        console.log(user);
        io.to(user[0].roomvalue).emit("user_data", {
          userData: user[0],
        });
      }
      console.log({ typedText, keyCode });
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
