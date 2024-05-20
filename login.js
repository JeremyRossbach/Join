let inputPassword = document.querySelector('input[type="password"]');
let validationText = document.querySelector('div[class="validation-password"]');
let buttonsPasswordVisibility = document.querySelectorAll('div[class="password-visibility"]')


/**
 * Check if the user have left the password input empty or not
 * @returns {boolean} Return true if password input have min. 1 value and return false if input are empty
 */
function checkValidPassword() {
    if (inputPassword.value.length < 1) {
        validationText.style.display = '';
        inputPassword.classList.add('input-danger');
        return false;
    }

    return true;
}


/**
 * Show password in the password input
 */
function showButtonPasswordVisible() {
    for (let i = 0; i < buttonsPasswordVisibility.length; i++) {
        let buttonPasswordVisibility = buttonsPasswordVisibility[i];
        buttonPasswordVisibility.style.display = '';
    }
}

/**
 * Hide password in the password input
 */
function hideButtonPasswordVisible() {
    for (let i = 0; i < buttonsPasswordVisibility.length; i++) {
        let buttonPasswordVisibility = buttonsPasswordVisibility[i];
        buttonPasswordVisibility.style.display = 'none';
    }
}

/**
 * Change the icon of the password input
 * @param {string} iconPath Icon path example: /img/image.svg
 */
function changePasswordInputIcon(iconPath) {
    inputPassword.style.background = `url(${iconPath}) no-repeat`;
    inputPassword.style.backgroundPosition = 'right 21px top 50%';
}

/**
 * Check every keypress on password input what type of input currently is to show the right button
 */
function checkInputPassword() {
    if (inputPassword.value) {
        if (inputPassword.type == 'password') {
            changePasswordInputIcon('/img/visibility_off.png');
        } else if (inputPassword.type == 'text') {
            changePasswordInputIcon('/img/visibility.png');
        }
        showButtonPasswordVisible();
    } else {
        changePasswordInputIcon('/img/lock.png');
        hideButtonPasswordVisible();
    }
}

/**
 * Switch function to switch between hide and show password icon
 */
function hidePassword() {
    if (inputPassword.type == 'password') {
        inputPassword.type = 'text';
        changePasswordInputIcon('/img/visibility.png');
    } else if (inputPassword.type == 'text') {
        inputPassword.type = 'password';
        changePasswordInputIcon('/img/visibility_off.png');
    }
    inputPassword.focus();
}