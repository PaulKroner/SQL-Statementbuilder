const loginbutton = body.querySelector(".loginbutton");
loginbutton.addEventListener("click" , () =>{
    //Eingabe in Variable speichern
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    //überprüfen, ob Eingabe mit "gespeicherten" Daten in Registrierung.js übereinstimmt
    if (username == username1 && password == password1) {
        window.location = "../index.html";
    }
    else {
        validateInputs();
    }
});

ohneLogin.addEventListener("click" , () =>{
    window.location = "../index.html";
})

const inputbereich = document.getElementById('inputbereich');
const username = document.getElementById('username');
const password = document.getElementById('password');

loginbutton.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else if (usernameValue !== username1) {
        setError(username, 'Username or password is wrong');
    }
    else {
        setSuccess(username);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } 
    else if (password !== password1) {
        setError(password, 'Username or password is wrong');
    } else {
        setSuccess(password);
    }
};