let dialogMessage = document.getElementById('dialog-message');
let validationPassword = document.querySelector('div[class="validation-password"]');
let buttonSignup = document.getElementById('button-sign-up');
let allInputs = document.getElementsByClassName('input-field');
let checkboxAccept = document.getElementById('accept');
let signUpForm = document.getElementById('sign-up-form');

/**
 * Check if the password and password-repeat input match
 * @returns {boolean} Return true if the passwords match and return false if not
 */
function checkPasswordMatch() {
    if (signUpForm['password'].value != signUpForm['confirm-password'].value) {
        validationPassword.style.display = '';
        signUpForm['confirm-password'].classList.add('input-danger');
        return false;
    }
    dialogMessage.style.display = '';
    setTimeout(function () {
        signUpForm.submit();
        users.push(
            {
                'email': 'bla@join.com',
                'username': 'bla',
                'password': '1234'
            }
        )
    }, 1000);
    return false;
}

/**
 * Signup the user and redirect them to the login page
 */
function signup() {
    if (buttonSignup.hasAttribute('disabled')) {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        buttonSignup.setAttribute('disabled', '');
    }
}

/**
 * Check if all inputs are filled out if not a alert message will be showed
 */
function checkIsInputFilled() {
    if (checkboxAccept.checked) {
        buttonSignup.removeAttribute('disabled');
    } else {
        buttonSignup.setAttribute('disabled', '');

    }
    for (let i = 0; i < allInputs.length; i++) {
        let input = allInputs[i];
        if (!input.value) {
            buttonSignup.setAttribute('disabled', '');
            break
        }
    }
}