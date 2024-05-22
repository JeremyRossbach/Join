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
            'isLogin': false,
            'contacts': contactData,
            'tasks': tasks
        }];
        localStorage.setItem('users', JSON.stringify(userGuest));
    }
}

/**
 * Redirect user only to areas where it is allowed
 * @param {boolean} isLogin If use are login then it have access to protected areas
 */
function redirectUserProtection(isLogin) {
    if (!isLogin) {
        if (window.location.pathname.match('sign_up')) {

        } else if (window.location.pathname.match('jura_no_login')) {

        } else if (window.location.pathname != '/') {
            window.location.href = '../';
        } 
    } else {
        if (
            window.location.pathname == '/' ||
            window.location.pathname.match('sign_up') ||
            window.location.pathname.match('jura_no_login')
        ) {
            window.location.href = '/summary'
        }
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
    
    redirectUserProtection(isUserLogin);
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

/**
 * It will return the current user where you are login
 * @returns {Object} Return user data as dictionary, if not login then it will return a empty dictionary
 */
function getUser() {
    const usersObjectString = localStorage.getItem('users');
    if (usersObjectString) {
        const users = JSON.parse(usersObjectString);
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.isLogin) {
                return user;
            }
        }
    }
    return {}
}