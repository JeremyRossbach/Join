let inputsPassword = document.querySelectorAll('input[type="password"]');
let validationText = document.querySelector('div[class="validation-password"]');
let buttonsPasswordVisibility = document.querySelectorAll('div[class="password-visibility"]')

function checkValidPassword() {
    for (let i = 0; i < inputsPassword.length; i++) {
        let inputPassword = inputsPassword[i];

        if (inputPassword.value.length < 1) {
            validationText.style.display = '';
            inputPassword.classList.add('input-danger');
            return false;
        }
    }

    return true;
}

function showButtonPasswordVisible() {
    for (let i = 0; i < buttonsPasswordVisibility.length; i++) {
        let buttonPasswordVisibility = buttonsPasswordVisibility[i];
        buttonPasswordVisibility.style.display = '';
    }
}

function hideButtonPasswordVisible() {
    for (let i = 0; i < buttonsPasswordVisibility.length; i++) {
        let buttonPasswordVisibility = buttonsPasswordVisibility[i];
        buttonPasswordVisibility.style.display = 'none';
    }
}

function changeIcon(index, iconPath) {
    inputsPassword[index].style.background = `url(${iconPath}) no-repeat`;
    inputsPassword[index].style.backgroundPosition = 'right 21px top 50%';
}

function checkInputPassword(index) {

    if (inputsPassword[index].value) {
        if (inputsPassword[index].type == 'password') {
            changeIcon(index, '/img/visibility_off.png');
        } else if (inputPassword.type == 'text') {
            changeIcon(index, '/img/visibility.png');
        }
        showButtonPasswordVisible();
    } else {
        changeIcon(index, '/img/lock.png');
        hideButtonPasswordVisible();
    }
}

function hidePassword(index) {
    if (inputsPassword[index].type == 'password') {
        inputsPassword[index].type = 'text';
        changeIcon(index, '/img/visibility.png');
    } else if (inputsPassword[index].type == 'text') {
        inputsPassword[index].type = 'password';
        changeIcon(index, '/img/visibility_off.png');
    }
    inputsPassword[index].focus();
}