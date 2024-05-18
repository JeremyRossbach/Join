function checkPasswordMatch(form) {
    console.log(true)
    if (form['password'].value != form['confirm-password'].value) {
        document.querySelector('div[class="validation-password"]').style.display = '';
        form['confirm-password'].classList.add('input-danger');
        return false;
    }
    console.log(true)
    document.getElementById('dialog-message').style.display = '';
    setTimeout(function () {
        form.submit();
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

function signup() {
    let buttonSignup = document.getElementById('button-sign-up');
    if (buttonSignup.hasAttribute('disabled')) {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        buttonSignup.setAttribute('disabled', '');
    }
}

function checkIsInputFilled() {
    let inputs = document.getElementsByClassName('input-field');
    let checkboxAccept = document.getElementById('accept');
    let buttonSignup = document.getElementById('button-sign-up');

    if (checkboxAccept.checked) {
        buttonSignup.removeAttribute('disabled');
    } else {
        buttonSignup.setAttribute('disabled', '');

    }

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (!input.value) {
            buttonSignup.setAttribute('disabled', '');
            break
        }
    }
}