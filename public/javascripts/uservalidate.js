const emailValidate = () => {
    let email = document.getElementById('email').value;
    let emailMsg = document.getElementById('emailMsg');
    let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!re.test(email)) {
        emailMsg.innerText = "Invalid Email";
        emailMsg.style.color = "red";
        return false;
    } else {
        emailMsg.innerText = "";
        return true;
    }
}

const usernameValidate = () => {
    let username = document.getElementById('username').value;
    let usernameMsg = document.getElementById('usernameMsg');
    if (username.length === 0) {
        usernameMsg.innerText = "Username cannot be empty";
        usernameMsg.style.color = "red";
        return false;
    } else {
        usernameMsg.innerText = "";
        return true;
    }
}

const passwordValidate = () => {
    let password = document.getElementById('password').value;
    let passwordMsg = document.getElementById('passwordMsg');
    let cond1 = password.length >= 6 && password.length <= 12;
    let cond2 = (/[a-z]/.test(password) || /[A-Z]/.test(password)) && /[0-9]/.test(password);
    let cond3 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!cond1 || !cond2 || !cond3) {
        passwordMsg.innerText = "Password should have length between 6 and 12 (inclusive), and contain at least 1 character, 1 number and 1 special character";
        passwordMsg.style.color = "red";
        return false;
    } else {
        passwordMsg.innerText = "";
        return true;
    }
}

const repwdValidate = () => {
    let password = document.getElementById('password').value;
    let repwd = document.getElementById('repwd').value;
    let repwdMsg = document.getElementById('repwdMsg');
    if (repwd !== password) {
        repwdMsg.innerText = "Two passwords do not match";
        repwdMsg.style.color = "red";
        return false;
    } else {
        repwdMsg.innerText = "";
        return true;
    }
}

const loginValidate = () => {
    if (emailValidate() && usernameValidate() && passwordValidate()) {
        return true;
    } else {
        let loginMsg = document.getElementById('loginMsg');
        loginMsg.innerText = "Invalid input(inputs)";
        loginMsg.style.color = "red";
        return false;
    }
}


const registerValidate = () => {  
    if (emailValidate() && usernameValidate() && passwordValidate() && repwdValidate()) {
        return true;
    } else {
        let registerMsg = document.getElementById('registerMsg');
        registerMsg.innerText = "Invalid input(inputs)";
        registerMsg.style.color = "red";
        return false;
    }
}