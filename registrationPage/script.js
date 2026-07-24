const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let phone = document.getElementById("phone").value.trim();

    let gender = document.querySelector('input[name="gender"]:checked');

    if(name==="" || email==="" || password==="" || confirmPassword==="" || phone===""){
        message.style.color="red";
        message.innerHTML="Please fill all fields.";
        return;
    }

    if(password.length < 6){
        message.style.color="red";
        message.innerHTML="Password must be at least 6 characters.";
        return;
    }

    if(password !== confirmPassword){
        message.style.color="red";
        message.innerHTML="Passwords do not match.";
        return;
    }

    if(phone.length !== 10){
        message.style.color="red";
        message.innerHTML="Phone number must be 10 digits.";
        return;
    }

    if(!gender){
        message.style.color="red";
        message.innerHTML="Please select your gender.";
        return;
    }

    message.style.color="green";
    message.innerHTML="Registration Successful! 🎉";

    form.reset();

});