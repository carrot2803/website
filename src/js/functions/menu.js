const menu = document.querySelector(".menu");
const dropDown = document.querySelector(".drop-down");

dropDown.addEventListener("mouseenter", () => {
	menu.innerHTML = '<ul><li><a href="#"><i class="fas fa-font fa-lg"></i> English</a></li><li><a href="#"><i class="far fa-question-circle fa-lg"></i> Feedback and help</a></li><li><a href="#"><i class="far fa-keyboard fa-lg"></i> Keyboard shortcuts</a></li></ul>';
	menu.classList.remove("hidden");
});

menu.addEventListener("mouseleave", () => menu.classList.add("hidden"));


document.querySelector(".logo").addEventListener('click', () => {
	window.location.href = '/public/Homepage.html';
});