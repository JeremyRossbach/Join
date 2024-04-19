function checkPasswordMatch() {
    let form = document.forms['sign-up'];

    if (form['password'].value != form['confirm-password'].value) {
        document.querySelector('div[class="validation-password"]').style.display = '';
        form['confirm-password'].classList.add('input-danger');
        return false;
    }

    return true;
}