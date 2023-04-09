const fileInput = document.getElementById("file-input");
const profilePic = document.getElementById("profile-pic");
const container = document.querySelector('.container');
const cancelButton = document.getElementById("cancel-btn");
const continueButton = document.querySelector('.buttons .btn:not(#cancel-btn)');

let selectedAvatar = null;

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
		// update selectedAvatar with the file object
		selectedAvatar = file;
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
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const image = new Image();

		image.onload = function () {
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0);

			const dataURL = canvas.toDataURL('image/png');
			localStorage.setItem('avatar', dataURL);
			localStorage.setItem('avatarSelected', 'user');

			console.log("Confirm button clicked!");
			window.location.href = '/test.html';
		};

		image.src = URL.createObjectURL(selectedAvatar);
	}
	else {
		// prompt the user to upload a profile picture
		alert('Please upload a profile picture');
	}
});


