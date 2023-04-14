const menu = document.querySelector(".menu");
const dropDown = document.querySelector(".drop-down");

dropDown.addEventListener("mouseenter", () => menu.classList.remove("hidden"));
menu.addEventListener("mouseleave", () => menu.classList.add("hidden"));

document.querySelectorAll("video").forEach(video => {
	let playPromise = video.play();
	if (playPromise) {
		playPromise.then(() => {
			let observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					video.muted = false;
					if (entry.intersectionRatio !== 1 && !video.paused) video.pause();
					else if (entry.intersectionRatio > 0.5 && video.paused) {
						video.play();
					}
				})
			}, { threshold: 0.5 })
			observer.observe(video);
		})
	}
})

document.querySelector(".logo").addEventListener('click', () => {
	window.location.href = '../public/Homepage.html';
});

$(document).ready(function () {
	// Define themes and retrieve selected theme from localStorage
	var themes = ["light", "dark", "solar", "dark-solar"];
	var selectedTheme = localStorage.getItem("selectedTheme");
	if (selectedTheme && themes.includes(selectedTheme)) {
		$("body").addClass(selectedTheme);
	} else {
		$("body").addClass(themes[0]);
	}

	// Switch theme on menu click
	$(".menu li:nth-child(2)").on("click", function () {
		var currentThemeIndex = themes.indexOf($("body").attr("class"));
		var nextThemeIndex = (currentThemeIndex + 1) % themes.length;
		var nextTheme = themes[nextThemeIndex];
		$("body").removeClass().addClass(nextTheme);

		// Store selected theme in localStorage
		localStorage.setItem("selectedTheme", nextTheme);
	});
});


$(document).ready(function () {
	$(".menu li:nth-child(3)").on("click", function () {
		for (let key in localStorage) {
			if (key !== "videos") {
				localStorage.removeItem(key); // Remove everything except for "videos"
			}
		}
		console.log("Logout initiated");
	});
});

function checkAvatar() {
	const avatar = localStorage.getItem("avatarSelected");
	if (!avatar) {
		window.location.replace("Login.html");
	}
	else{
		window.location.replace("Upload.html");
	}
}


