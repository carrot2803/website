document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#login-btn');
    const avatarSelected = localStorage.getItem('avatarSelected');
    if (avatarSelected) {
        // User is logged in and has an avatar
        const avatarImage = document.querySelector('#avatar-image');
        avatarImage.classList.remove('hidden');
        avatarImage.setAttribute('src', localStorage.getItem('avatar'));
        avatarImage.classList.add('avatar-container');
        loginButton.classList.add('hidden');
    } else {
        // User is not logged in
        const loginButton = document.querySelector('#login-btn');
        const newLoginButton = document.createElement('button');
        newLoginButton.innerText = 'Log in';
        newLoginButton.id = 'login-btn';
        newLoginButton.classList.add('login-btn');

        newLoginButton.addEventListener('click', () => {
            // Redirect to login page
            window.location.href = '/login/public/login.html';
        });

        // replace the login button with the new button
        loginButton.parentNode.replaceChild(newLoginButton, loginButton);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.querySelector('.login');
    const loginButton = loginContainer.querySelector('button');
    const avatarSelected = localStorage.getItem('avatarSelected');

    if (avatarSelected) {
        // User is logged in and has an avatar
        const avatarImage = document.createElement('img');
        avatarImage.id = 'avatar-image';
        avatarImage.setAttribute('src', localStorage.getItem('avatar'));
        avatarImage.classList.add('avatar-side');

        loginContainer.removeChild(loginContainer.firstChild); // remove old element
        loginContainer.removeChild(loginContainer.firstChild); // remove the <p> element
        loginContainer.replaceChild(avatarImage, loginButton); // replace the login button with the avatar image
    } else {
        // User is not logged in
        const newLoginButton = document.createElement('button');
        newLoginButton.innerText = 'Log in';
        newLoginButton.id = 'login-btn';
        newLoginButton.classList.add('login-btn');

        newLoginButton.addEventListener('click', () => {
            // Redirect to login page
            window.location.href = '/login/public/login.html';
        });

        // replace the login button with the new button
        loginContainer.replaceChild(newLoginButton, loginButton);
    }
});
