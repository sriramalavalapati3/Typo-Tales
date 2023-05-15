let enter = document.getElementById("enter");
let username = document.getElementById("username");
let password = document.getElementById("password");

enter.addEventListener("click", async () => {
  if (username.value == "" || password.value == "") {
    const module = document.getElementById("cart-module");
    module.innerText = "Please Fill All The Fields !";
    module.style.display = "block";
    module.style.borderRadius = "20px";
    module.style.backgroundColor = "#FF9100";

    if ("speechSynthesis" in window) {
      const message = new SpeechSynthesisUtterance(
        "Please Fill All The Fields !"
      );
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

    return;
  }

  let payload = {
    username: username.value,
    password: password.value,
  };

  console.log(payload);

  let s = await fetch("https://typotales-hchv.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  let res = await s.json();
  console.log(res);

  if (res.msg) {
    const module = document.getElementById("cart-module");
    module.innerText = "login sucessfully !";
    module.style.display = "block";
    module.style.borderRadius = "20px";
    module.style.backgroundColor = "green";

    if ("speechSynthesis" in window) {
      const message = new SpeechSynthesisUtterance("login sucessfully !");
      const femaleVoices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.name.includes("female"));
      if (femaleVoices.length > 0) {
        message.voice = femaleVoices[0];
      }
      speechSynthesis.speak(message);
    }

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);

    localStorage.setItem("token", res.normal_token);
    localStorage.setItem("username", res.user[0].username);
  } else {
    const module = document.getElementById("cart-module");
    module.innerText = res.err + " !!";
    module.style.display = "block";
    module.style.borderRadius = "20px";
    module.style.backgroundColor = "red";

    if ("speechSynthesis" in window) {
      const message = new SpeechSynthesisUtterance(res.err + " !!");
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

    return;
  }
});
