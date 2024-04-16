let inputPassword = document.querySelector('input[type="password"]');
let validationText = document.querySelector('div[class="validation-password"]');
let buttonPasswordVisibility = document.querySelector('div[class="password-visibility"]')
let isPasswordHidden = true;

function checkValidPassword() {
    if (!inputPassword.checkValidity()) {
        validationText.style.display = '';
        inputPassword.style.outline = '1px solid #FF001F';
        inputPassword.style.border = '1px solid #FF001F';
    }
}

function showButtonPasswordVisible() {
    buttonPasswordVisibility.style.display = '';
}

function hideButtonPasswordVisible() {
    buttonPasswordVisibility.style.display = 'none';
}

function focusInputPassword() {
    inputPassword.focus();
}

function hidePassword() {
    isPasswordHidden = !isPasswordHidden;
}