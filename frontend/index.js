let usernamehere = document.getElementById("usernamehere");
usernamehere.innerText = localStorage.getItem("username");

let some23 = document.getElementById("some23");
let logout = document.getElementById("logout");
let s = localStorage.getItem("token");

window.addEventListener("load", async () => {
  if (s == null) {
    logout.innerText = "Login";
  } else {
    logout.innerText = "Logout";
  }
});

logout.addEventListener("click", async () => {
  if (logout.innerText == "Login") {
    window.location.href = "./PUBLIC/login.html";
  } else {
    let payload = {
      token: s,
    };

    let d = await fetch("https://typotales-hchv.onrender.com/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let res = await d.json();

    if (res.msg == "Logout successfully") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      usernamehere.innerText = "Guest";

      const module = document.getElementById("cart-module");
      module.innerText = "Logout Successfully";
      module.style.display = "block";
      module.style.borderRadius = "20px";
      module.style.backgroundColor = "green";

      setTimeout(() => {
        module.style.display = "none";
      }, 4000);

      if ("speechSynthesis" in window) {
        const message = new SpeechSynthesisUtterance("Logout Successfully");
        const femaleVoices = speechSynthesis
          .getVoices()
          .filter((voice) => voice.name.includes("female"));
        if (femaleVoices.length > 0) {
          message.voice = femaleVoices[0];
        }
        speechSynthesis.speak(message);
      }

      logout.innerText = "Login";
    }
  }
});

let create = document.querySelector("#create");
create.addEventListener("click", createfun);

function createfun() {
  document.querySelector(".create").style.display = "block";
  document.querySelector(".join").style.display = "none";
  document.querySelector(".choice").style.display = "none";
}
let join = document.querySelector("#join");
join.addEventListener("click", joinfun);

function joinfun() {
  document.querySelector(".create").style.display = "none";
  document.querySelector(".join").style.display = "block";
  document.querySelector(".choice").style.display = "none";
}

let btnstart = document.getElementById("btnstart");
let upperdiv = document.getElementById("upperdiv");
let sane1sane1 = document.getElementById("sane1sane1");
let datahereall = document.getElementById("datahereall");
let gamestarthere = document.getElementById("gamestarthere");
let kingname2323 = document.getElementById("kingname2323");
let rightside2 = document.getElementById("rightside2");

let donedone = false;

btnstart.addEventListener("click", function () {
  if (donedone) {
    alert("You have already started the game");
  } else {
    const module = document.getElementById("cart-module");
    module.innerText = "Create Room First";
    module.style.display = "block";
    module.style.borderRadius = "20px";
    module.style.backgroundColor = "red";

    if ("speechSynthesis" in window) {
      const message = new SpeechSynthesisUtterance("Create Room First");
      const femaleVoices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.name.includes("female"));
      if (femaleVoices.length > 0) {
        message.voice = femaleVoices[0];
      }
      speechSynthesis.speak(message);
    }

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});

let resendbtn = document.getElementById("resendbtn");
let raceagainbtn = document.getElementById("raceagainbtn");

resendbtn.addEventListener("click", function () {
  window.location.reload();
});

function MakesetTimeintervalreverse1sec() {
  let timeleft = 30;
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("timerstart").innerHTML = "GO";
    } else {
      document.getElementById("timerstart").innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
}

let kvkv2332 = document.getElementById("kvkv2332");
let car2 = document.getElementById("car2");
let car3 = document.getElementById("car3");
let car4 = document.getElementById("car4");
let car5 = document.getElementById("car5");
let carinsideit = document.getElementById("carinsideit");

kvkv2332.addEventListener("click", function () {
  upperdiv.style.display = "none";
  sane1sane1.style.display = "none";
  kingname2323.style.display = "none";
  datahereall.style.display = "none";
  carinsideit.style.height = "70px";
  gamestarthere.style.display = "block";
  rightside2.style.height = "1300px";
  gamestarthere.style.height = "470px";
});

// ----------------------------------------------------------------------------------------------------------------------------------------Ansari code here
const socket = io("https://typotales-hchv.onrender.com", {
  transports: ["websocket"],
});

let roomnumber = document.querySelector("#roomnumber");
let joinbutton = document.querySelector("#entertheroom");
let room = document.querySelector(".roomenter");
joinbutton.addEventListener("click", Join);

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("nickname");
let roomvalue = urlParams.get("roomvalue");
let value = urlParams.get("value");

if (value == 0) {
  room.style.display = "block";
  socket.emit("username", { username });
  socket.on("roomno", (id) => {
    roomnumber.innerText = id;
    create.style.display = "none";
    join.style.display = "none";
    raceagainbtn.style.display = "block";
  });
} else if (value == 1) {
  socket.emit("joinroom", { username, roomvalue });
}

raceagainbtn.addEventListener("click", function () {
  let damtext = document.getElementById("damtext");
  damtext.disabled = false;
  MakestartTimeIntervel1sec();
  socket.emit("display", { event: true });
  raceagainbtn.style.display = "none";
});

socket.on("forall", (data) => {
  let { event } = data;
  if (event == true) {
    let damtext = document.getElementById("damtext");
    damtext.disabled = false;
  }
});

function MakestartTimeIntervel1sec() {
  let timeleft = 90;
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      socket.emit("timeleft", { timeleft });
      clearInterval(downloadTimer);
      document.getElementById("timerstart").innerHTML = "Race Ended";
      let damtext = document.getElementById("damtext");
      damtext.disabled = true;
    } else {
      document.getElementById("timerstart").innerHTML = timeleft;
      socket.emit("timeleft", { timeleft });
    }
    timeleft -= 1;
  }, 1000);
}
socket.on("Time", (data) => {
  let { timeleft } = data;
  if (timeleft === 1) {
    document.getElementById("damtext").disabled = true;
    let roomid = sessionStorage.getItem("ROOM");
    socket.emit("delete", roomid);
  }
  document.getElementById("timerstart").innerHTML = timeleft;
});
function Join() {
  let roomvalue = document.querySelector("#roomvalue").value;

  sessionStorage.setItem("ROOM", roomvalue);
  socket.emit("joinroom", { username, roomvalue });
}
let smokkergdin = document.getElementById("smokkergdin");
socket.on("message", (message) => {
  smokkergdin.innerHTML = ` <div class="divheadclass"><h1 id="classhead">${message}</h1></div>`;
  upperdiv.style.display = "none";
  sane1sane1.style.display = "none";
  kingname2323.style.display = "none";
  datahereall.style.display = "none";
  gamestarthere.style.display = "block";
  rightside2.style.height = "1300px";
  donedone = true;
});

//============================================================================================>
//recieving paragraph from server and appending into the dom

//updating the word per minute and moving the car from here
const wordsPerMinute = 60;
const carSpeed = 200; // adjust this as needed

let myFlag;

socket.on(
  "typing-update",
  ({ socketID, isTyping, typedText, flag, wordCount }) => {
    myFlag = flag;
    console.log(typedText, flag);
    if (flag !== true && flag !== false) {
      let thattext = document.getElementById("thattext");
      thattext.innerHTML = `<div class="divheadclass"><h1 id="classhead">${typedText}</h1></div>`;
      let damtext = document.getElementById("damtext");
      damtext.disabled = true;
    }
    const car_img = document.getElementById(`${socketID}`);
    if (isTyping) {
      const speed = (+wordCount / wordsPerMinute) * carSpeed;
      // console.log(speed);
      // car_img.style.animationDuration = `${speed}ms`;
    } else {
      // car_img.style.animationDuration = "0s";
    }
  }
);

let carContainerWidth;
let myGlobalPara;
let myGlobalParaLenght;
socket.on("usersarray", (data) => {
  carinsideit.innerHTML = "";
  document.getElementById("thattext").innerText = data[1];

  myGlobalPara = data[1];
  myGlobalParaLenght = data[1].split(" ").length;

  // MakesetTimeintervalreverse1sec();
  data[0].forEach((element) => {
    carinsideit.innerHTML += `<div class="car" width = "758px">
    <div > <span class="speedherena" id="speed${element.id}" style="padding: 1px; background-color: black; color: white;"></span></div>
            <div id= onlyvp${element.id} class="usernamehere">${element.username}</div>
            <img id=${element.id} src="https://tse4.mm.bing.net/th?id=OIP.oO33SYyCF2T5A8i1He_DKAHaCQ&pid=Api&P=0"
                        width="130px"> <hr> </div>`;
  });

  // Get the width of the div element with class "car"
  setTimeout(() => {
    carContainerWidth = document
      .querySelector(".car")
      .getBoundingClientRect().width;
  }, 2000);
});
document.getElementById("damtext").addEventListener("keyup", (event) => {
  const typedText = event.target.value;
  if (typedText.length <= myGlobalPara.length) {
    socket.emit("typedText", { typedText });
  }
  //if the typed letter is correct make the background of the input field green else red;
  const isCorrect = checkIfLetterIsCorrect(typedText);
  if (isCorrect) {
    event.target.classList.add("correct");
    event.target.classList.remove("incorrect");
  } else {
    event.target.classList.add("incorrect");
    event.target.classList.remove("correct");
  }
});

//checkLetter Function
function checkIfLetterIsCorrect(typedText) {
  if (
    typedText[typedText.length - 1] === myGlobalPara[typedText.length - 1] &&
    myFlag
  ) {
    return true;
  }
  return false;
}
//getting the user data here
let startTime = null;
let count = 0;
socket.on("user_data", (data) => {
  let d = document.getElementById(data.id);
  d.style.marginLeft = `${
    data.wordCount * ((carContainerWidth - 130) / (myGlobalParaLenght - 2))
  }px`;

  if (startTime === null) {
    startTime = Date.now();
  }
  const elapsedTime = (Date.now() - startTime) / 1000; //dividing with 1000 to convert into secon+ds
  const wpm = Math.round((data.wordCount / elapsedTime) * 60);

  let snsnsn = document.getElementById(`speed${data.id}`);
  snsnsn.innerHTML = `${wpm} wpm`;

  if (data.wordCount === myGlobalParaLenght - 1) {
    let userhere20 = document.getElementById(`onlyvp${data.id}`);
    userhere20.innerHTML = `${data.username}'s position ${++count}`;
  }
});
