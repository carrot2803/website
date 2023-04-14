const params = new URLSearchParams(window.location.search);
const username = params.get('username');

var jsonData = localStorage.getItem('userdata');
var posts = JSON.parse(jsonData);

const postContainer = document.getElementById("post-container");
posts.forEach(post => {
    if (post.userName == username)
        post.videoSources.forEach(videoSource => {
            const div = document.createElement("div");
            div.className = "post";
            div.innerHTML = `
                        <div class="post-info">
                        <div class="user">
                            <img src="${post.avatar}" alt="avatar">
                            <div>
                            <h6>${post.userName}</h6>
                            <p>${post.game[post.videoSources.indexOf(videoSource)]}</p>
                            </div>
                        </div>
                        <button>Friend</button>
                        </div>
                        <div class="post-content">
                        <video class="video-style" controls loop disablepictureinpicture controlslist="nodownload noplaybackrate">
                            <source src="${videoSource.src}" type="video/mp4">
                        </video>
                        <div class="video-icons">
                            <a href="#"><i class="fas fa-heart fa-lg"></i><span>${post.likes[post.videoSources.indexOf(videoSource)]}</span></a>
                            <a href="#"><i class="fas fa-comment-dots fa-lg"></i><span>${post.comments[post.videoSources.indexOf(videoSource)]}</span></a>
                            <a href="#"><i class="fas fa-share fa-lg"></i> <span>${post.shares[post.videoSources.indexOf(videoSource)]}</span></a>
                        </div>
                        </div>
                    `;
            postContainer.appendChild(div);

            const friend = div.querySelector("button");
            friend.addEventListener('click', function () {
                if (this.classList.contains('friend')) {
                    this.classList.remove('friend');
                    this.textContent = "Add+";
                    post.friend = false;
                }
                else {
                    this.classList.add('friend');
                    post.friend = true; // update the post.friend property
                    this.textContent = "Friend"; // update the text on the button
                }
            });

            const heartIcon = div.querySelector('.fa-heart');
            heartIcon.addEventListener('click', function () {
                const likesCount = div.querySelector('span'); // select the span element
                const currentLikes = post.likes[post.videoSources.indexOf(videoSource)];
                if (this.classList.contains('blue-heart')) {
                    post.likes[post.videoSources.indexOf(videoSource)] = parseInt(currentLikes) - 1;
                    likesCount.textContent = post.likes[post.videoSources.indexOf(videoSource)];
                    this.classList.remove('blue-heart');
                } else {
                    post.likes[post.videoSources.indexOf(videoSource)] = parseInt(currentLikes) + 1;
                    likesCount.textContent = post.likes[post.videoSources.indexOf(videoSource)];
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

            const user = div.querySelector('.user div');
            const username = user.querySelector('.user h6');
            username.addEventListener('click', () => {
                window.location.href = `../public/UserProfile.html?username=${post.userName}`;
            });

            const gameName = user.querySelector('.user p');
            gameName.addEventListener('click', () => {
                window.location.href = `../public/Game-Video.html?gameName=${post.game[post.videoSources.indexOf(videoSource)]}`;
            });

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

        });
})
