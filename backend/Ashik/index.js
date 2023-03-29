const express = require("express");
const { Server } = require("socket.io");

const http = require("http");
const { type } = require("os");
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
app.get("/", (req, res) => {
  res.send("Haan bhai bol !");
});

//my global array or clients
let arr = [];
let myGlobalObject = {};

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
let mySet = new Set();
io.on("connection", (socket) => {
  count += 1;

  console.log(`One user connected, total user : ${count}`);
  socket.emit("hello", "Hello from server !!");

  let socketID = socket.id;
  myGlobalObject[socketID] = 0;
  if (socketID && !arr.includes(socketID)) {
    socket.emit("car-joined", { socketID });
    console.log(socketID);
    arr.push(socket.id);
  }
  //disconnet
  socket.on("disconnect", () => {
    count -= 1;

    console.log(`One user left, ${count} remaining!!`);
  });

  //emitting the paragraph
  let myParagraph = para[myFunction()];
  socket.emit("thePara", myParagraph);

  //recieving the typed text from clent
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
        if (!mySet.has(typedText)) {
          myGlobalObject[socket.id]++;
        }
        mySet.add(typedText);
      }
      console.log({ typedText, keyCode });
      socket.emit("typing-update", {
        typedText,
        isTyping: true,
        socketID: socket.id,
        flag: true,
        wordCount: myGlobalObject[socket.id],
        totalWords,
      });
    } else {
      socket.emit("typing-update", {
        typedText,
        isTyping: false,
        socketID: socket.id,
        flag: false,
        wordCount: myGlobalObject[socket.id],
        totalWords,
      });
    }
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
console.log(mySet);
mySet = new Set();

httpServer.listen(4000, () => {
  console.log("Server is running on port 4000");
});
