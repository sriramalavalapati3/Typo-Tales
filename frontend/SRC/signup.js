let enter = document.getElementById("enter");
let email = document.getElementById("email")
let username = document.getElementById("username")
let password = document.getElementById("password")

enter.addEventListener("click", async () => {

    if (email.value == "" || username.value == "" || password.value == "") {
        const module = document.getElementById('cart-module');
        module.innerText = "Please Fill All The Fields !"
        module.style.display = 'block';
        module.style.borderRadius = '20px';
        module.style.backgroundColor = '#FF9100'

        if ('speechSynthesis' in window) {
            const message = new SpeechSynthesisUtterance('Please Fill All The Fields !');
            const femaleVoices = speechSynthesis.getVoices().filter(voice => voice.name.includes('female'));
            if (femaleVoices.length > 0) {
                message.voice = femaleVoices[0];
            }
            speechSynthesis.speak(message);
        }


        setTimeout(() => {
            window.location.reload()
        }, 3000);

        return
    }

    let payload = {
        email: email.value,
        username: username.value,
        password: password.value
    }

    console.log(payload)

    let s = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    let res = await s.json()
    console.log(res)

    if (res.msg) {


        const module = document.getElementById('cart-module');
        module.innerText = "Register Sucessfully !"
        module.style.display = 'block';
        module.style.borderRadius = '20px';
        module.style.backgroundColor = 'green'

        if ('speechSynthesis' in window) {
            const message = new SpeechSynthesisUtterance('Register Sucessfully !');
            const femaleVoices = speechSynthesis.getVoices().filter(voice => voice.name.includes('female'));
            if (femaleVoices.length > 0) {
                message.voice = femaleVoices[0];
            }
            speechSynthesis.speak(message);
        }


        setTimeout(() => {
            window.location.href = "../PUBLIC/login.html"
        }, 2000);
    } else {
        const module = document.getElementById('cart-module');
        module.innerText = res.err + " !"
        module.style.display = 'block';
        module.style.borderRadius = '20px';
        module.style.backgroundColor = 'red'

        if ('speechSynthesis' in window) {
            const message = new SpeechSynthesisUtterance(res.err + " !!");
            const femaleVoices = speechSynthesis.getVoices().filter(voice => voice.name.includes('female'));
            if (femaleVoices.length > 0) {
                message.voice = femaleVoices[0];
            }
            speechSynthesis.speak(message);
        }

        setTimeout(() => {
            window.location.reload()
        }, 3000);
        return
    }
})
