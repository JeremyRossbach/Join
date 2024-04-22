function checkPasswordMatch(form) {
    if (form['password'].value != form['confirm-password'].value) {
        document.querySelector('div[class="validation-password"]').style.display = '';
        form['confirm-password'].classList.add('input-danger');
        return false;
    }
    
    document.getElementById('dialog-message').style.display = '';

    setTimeout(function() {
        form.submit();
        users.push(
            {
                'email': 'bla@join.com',
                'username': 'bla',
                'password': '1234'
            }
        )
    }, 2000);

    return false;
}