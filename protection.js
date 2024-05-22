createGuest();
checkIsLogin();

/**
 * Save guest login details if not exists in the local storage
 */
function createGuest() {
    const usersObjectString = localStorage.getItem('users');
    if (!usersObjectString) {
        const userGuest = [{
            'name': 'Guest',
            'email': 'guest@join.com',
            'password': '',
            'isLogin': false
        }];
        localStorage.setItem('users', JSON.stringify(userGuest));
    }
}

/**
 * Check if user is login to protect sensitiv areas like tasks, contacts...
 */
function checkIsLogin() {
    let isUserLogin = false;
    const usersObjectString = localStorage.getItem('users');
    if (usersObjectString) {
        const users = JSON.parse(usersObjectString);
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.isLogin) {
                isUserLogin = true;
                break;
            }
        }
    }

    if (!isUserLogin) {
        window.location.href = '../';
    }
}

/**
 * Logout the user
 */
function logout() {
    const usersObjectString = localStorage.getItem('users');
    if (usersObjectString) {
        const users = JSON.parse(usersObjectString);
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            user.isLogin = false;
        }
        localStorage.setItem('users', JSON.stringify(users));
    }
    window.location.href = '../'
}