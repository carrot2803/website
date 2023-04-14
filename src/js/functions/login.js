const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const login_form = document.querySelector(".sign-in-form");
const signup_form = document.querySelector(".sign-up-form");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

login_form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = "../public/Avatar.html";
});

signup_form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = "../public/Avatar.html";
});
