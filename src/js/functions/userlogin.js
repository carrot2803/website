document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#login-btn');
    const avatarSelected = localStorage.getItem('avatarSelected');
    const avatarImage = document.querySelector('#avatar-image'); // Define the avatarImage variable
    if (avatarSelected && avatarImage.hasAttribute !== null) {
        // User is logged in and has an avatar
        avatarImage.classList.remove('hidden');
        avatarImage.setAttribute('src', localStorage.getItem('avatar'));
        avatarImage.classList.add('avatar-container');
        loginButton.classList.add('hidden');

        avatarImage.onclick = function () {
            window.location.href = '../public/Avatar.html';
        }
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


        avatarImage.onclick = function () {
            window.location.href = '../public/Avatar.html';
        }


        loginContainer.removeChild(loginContainer.firstChild); // remove old element
        loginContainer.removeChild(loginContainer.firstChild); // remove the <p> element
        loginContainer.replaceChild(avatarImage, loginButton); // replace the login button with the avatar image
    }
});


