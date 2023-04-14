const uploadButton = document.querySelector(".upload-btn");
const videoInput = document.getElementById("videoInput");
const videoContainer = document.getElementById("post-container");
const avatarImage = document.getElementById("avatar-image");

uploadButton.addEventListener("click", () => {
    videoInput.click();
});

videoInput.addEventListener("change", () => {
    const file = videoInput.files[0];
    const videoURL = URL.createObjectURL(file);
    let videos = JSON.parse(localStorage.getItem("videos")) || []; // get the stored videos array from localStorage or create an empty array
    videos.push(videoURL); // add the new video URL to the array
    localStorage.setItem("videos", JSON.stringify(videos)); // store the updated videos array in localStorage

    drawVideos(avatarImage, videoURL)
});

window.addEventListener("load", () => {
    const videos = JSON.parse(localStorage.getItem("videos")) || []; // get the stored videos array from localStorage or create an empty array
    for (const videoURL of videos) {
        drawVideos(avatarImage, videoURL);
    }
});

function drawVideos(avatarImage, videoURL) {
    const postContainer = document.getElementById("post-container");
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
        <div class="post-info">
            <div class="user">
                <img src="${avatarImage.src}" alt="avatar">
                <div>
                    <h6>You</h6>
                    <p>Your Upload</p>
                </div>
            </div>
        </div>
        <div class="post-content">
            <video class="video-style" controls loop disablepictureinpicture controlslist="nodownload noplaybackrate">
                <source src="${videoURL}" type="video/mp4">
            </video>
            <div class="video-icons">
                <a href="#"><i class="fas fa-heart fa-lg"></i><span>${Math.floor(Math.random() * 9998) + 1}</span></a>
                <a href="#"><i class="fas fa-comment-dots fa-lg"></i><span>${Math.floor(Math.random() * 700) + 1}</span></a>
                <a href="#"><i class="fas fa-share fa-lg"></i> <span>${Math.floor(Math.random() * 200) + 1}</span></a>
            </div>
        </div>
    `;
    postContainer.appendChild(div);

    const heartIcon = div.querySelector('.fa-heart');
    heartIcon.addEventListener('click', function () {
        if (this.classList.contains('blue-heart')) {
            this.classList.remove('blue-heart');
        } else {
            this.classList.add('blue-heart');
        }
    });

    const shareIcon = div.querySelector('.fa-share');
    shareIcon.addEventListener('click', function () {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(function () {
            // Display a message to the user
            alert('Link copied to clipboard!');

            shareIcon.style.color = 'var(--blue)';
        }, function () {
            alert('Unable to copy link to clipboard');
        });
    });

    const comments = div.querySelector('.fa-comment-dots');
    comments.addEventListener('click', function () {
        document.querySelector('#commentSection').removeAttribute('hidden');
    });

    const user = div.querySelector('.user div');
    const username = user.querySelector('.user h6');
    username.addEventListener('click', () => {
        window.location.href = `../public/Upload.html`;
    });

    const video = div.querySelector('.video-style');
    let isPlaying = false;

    function checkVideoInView() {
        const rect = video.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.8; // Decrease the viewHeight by 20% to lower the rate of playing
        if (rect.bottom >= viewHeight && rect.top <= viewHeight * 0.6 && !isPlaying) { // Increase the top value and decrease the bottom value to increase the rate of pausing
            video.play();
            isPlaying = true;
        } else if ((rect.bottom < viewHeight || rect.top > viewHeight * 0.6) && isPlaying) {
            video.pause();
            isPlaying = false;
        }
        window.requestAnimationFrame(checkVideoInView);
    }

    window.requestAnimationFrame(checkVideoInView);
}
