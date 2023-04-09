const fileInput = document.getElementById("file-input");
const profilePic = document.getElementById("profile-pic");
const container = document.querySelector('.container');
const cancelButton = document.getElementById("cancel-btn");
const continueButton = document.querySelector('.buttons .btn:not(#cancel-btn)');

// check if the image is empty
if (!profilePic.getAttribute('src') || profilePic.getAttribute('src') === '#') {
	// set container background color to white
	container.style.backgroundColor = '#ffffff';
	// set default image source
	profilePic.setAttribute('src', 'default.jpg');
}

profilePic.addEventListener("click", function () {
	fileInput.click();
});

fileInput.addEventListener("change", function () {
	const file = fileInput.files[0];
	const reader = new FileReader();

	reader.addEventListener("load", function () {
		profilePic.setAttribute("src", reader.result);
		// clear container background color
		container.style.backgroundColor = 'transparent';
	});

	if (file) {
		reader.readAsDataURL(file);
	}
});

cancelButton.addEventListener("click", function (event) {
	event.preventDefault();
	// Set the image source to "upload.png"
	profilePic.setAttribute('src', 'upload.png');
});

continueButton.addEventListener("click", function (event) {
	event.preventDefault();
	// check if the image is the default one or not
	if (profilePic.getAttribute('src') !== 'upload.png') {
		// redirect to youtube.com
		window.location.href = '/Homepage.html';
	} else {
		// prompt the user to upload a profile picture
		alert('Please upload a profile picture');
	}
});
