var jsonData = localStorage.getItem('userdata');
var users = JSON.parse(jsonData);
const postContainer = document.getElementById("post-container");
for (let i = 0; i < 5; i++) {
    users.forEach(user => {
        user.videoSources.forEach(videoSource => {
            if (videoSource.index == i) {
                const div = document.createElement("div");
                div.className = "post";
                div.innerHTML = `
						<div class="post-info">
						<div class="user">
							    <img src="${user.avatar}" alt="avatar">
							<div>
                                <h6>${user.userName}</h6>
                                <p>${user.game[user.videoSources.indexOf(videoSource)]}</p>
							</div>
						</div>
						<button>${user.friend ? "Add+" : "Friend"}</button>
						</div>
						<div class="post-content">
							<video class="video-style" controls loop disablepictureinpicture controlslist="nodownload noplaybackrate">
								<source src="${videoSource.src}" type="video/mp4">
							</video>
							<div class="video-icons">
								<a href="#"><i class="fas fa-heart fa-lg"></i><span>${user.likes[user.videoSources.indexOf(videoSource)]}</span></a>
								<a href="#"><i class="fas fa-comment-dots fa-lg"></i><span>${user.comments[user.videoSources.indexOf(videoSource)]}</span></a>
								<a href="#"><i class="fas fa-share fa-lg"></i> <span>${user.shares[user.videoSources.indexOf(videoSource)]}</span></a>
							</div>
						</div>
					`;
                postContainer.appendChild(div);


                const friend = div.querySelector("button");
                friend.addEventListener('click', function () {
                    if (this.classList.contains('friend')) {
                        this.classList.remove('friend');
                        this.textContent = "Add+";
                        user.friend = false;
                    }
                    else {
                        this.classList.add('friend');
                        user.friend = true; // update the post.friend property
                        this.textContent = "Friend"; // update the text on the button
                    }
                });

                const heartIcon = div.querySelector('.fa-heart');
                heartIcon.addEventListener('click', function () {
                    const likesCount = div.querySelector('span'); // select the span element
                    const currentLikes = user.likes[user.videoSources.indexOf(videoSource)];
                    if (this.classList.contains('blue-heart')) {
                        user.likes[user.videoSources.indexOf(videoSource)] = parseInt(currentLikes) - 1;
                        likesCount.textContent = user.likes[user.videoSources.indexOf(videoSource)];
                        this.classList.remove('blue-heart');
                    } else {
                        user.likes[user.videoSources.indexOf(videoSource)] = parseInt(currentLikes) + 1;
                        likesCount.textContent = user.likes[user.videoSources.indexOf(videoSource)];
                        this.classList.add('blue-heart');
                    }
                });

                const shareIcon = div.querySelector('.fa-share');
                shareIcon.addEventListener('click', function () {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(function () {
                        // Display a message to the user
                        alert('Link copied to clipboard!');

                        // Change the share icon color to red
                        shareIcon.style.color = 'var(--blue)';
                    }, function () {
                        alert('Unable to copy link to clipboard');
                    });
                });

                const comments = div.querySelector('.fa-comment-dots');
                comments.addEventListener('click', function () {
                    document.querySelector('#commentSection').removeAttribute('hidden');
                });

                const userD = div.querySelector('.user div');
                const username = userD.querySelector('.user h6');
                username.addEventListener('click', () => {
                    window.location.href = `../public/UserProfile.html?username=${user.userName}`;
                });

                const gameName = userD.querySelector('.user p');
                gameName.addEventListener('click', () => {
                    window.location.href = `../public/Game-Video.html?gameName=${user.game[user.videoSources.indexOf(videoSource)]}`;
                });

                postContainer.appendChild(div);
                const video = div.querySelector('.video-style');
                let isPlaying = false;

                const options = {
                    root: null,
                    rootMargin: '0px',
                    threshold: [0.4, 0.6] // Play video when it is at least 40% in view and pause when it is less than 60% in view
                };

                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !isPlaying) {
                            video.play();
                            isPlaying = true;
                        } else if (!entry.isIntersecting && isPlaying) {
                            video.pause();
                            isPlaying = false;
                        }
                    });
                }, options);
                observer.observe(video);
            }
        });


    });
}

