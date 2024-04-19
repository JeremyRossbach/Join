let inputPassword = document.querySelector('input[type="password"]');
let validationText = document.querySelector('div[class="validation-password"]');
let buttonPasswordVisibility = document.querySelector('div[class="password-visibility"]')

function checkValidPassword() {
    if (inputPassword.value.length < 1) {
        validationText.style.display = '';
        inputPassword.classList.add('input-danger');
        return false;
    }

    return true;
}

function showButtonPasswordVisible() {
    buttonPasswordVisibility.style.display = '';
}

function hideButtonPasswordVisible() {
    buttonPasswordVisibility.style.display = 'none';
}

function changeIcon(iconPath) {
    inputPassword.style.background = `url(${iconPath}) no-repeat`;
    inputPassword.style.backgroundPosition = 'right 21px top 50%';
}

function checkInputPassword() {
    if (inputPassword.value) {
        if (inputPassword.type == 'password') {
            changeIcon('/img/visibility_off.png');
        } else if (inputPassword.type == 'text') {
            changeIcon('/img/visibility.png');
        }
        showButtonPasswordVisible();
    } else {
        changeIcon('/img/lock.png');
        hideButtonPasswordVisible();
    }
}

function hidePassword() {
    if (inputPassword.type == 'password') {
        inputPassword.type = 'text';
        changeIcon('/img/visibility.png');
    } else if (inputPassword.type == 'text') {
        inputPassword.type = 'password';
        changeIcon('/img/visibility_off.png');
    }
    inputPassword.focus();
}