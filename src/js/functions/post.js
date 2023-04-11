fetch("/src/js/functions/users.json")
    .then(response => response.json())
    .then(posts => {
        function shufflePosts(posts) {
            posts.sort(() => Math.random() - 0.5); // sort randomly
            for (let i = posts.length - 1; i > 0; i--) { // Shuffle the posts array
                const j = Math.floor(Math.random() * (i + 1));
                [posts[i], posts[j]] = [posts[j], posts[i]];
            }
            return posts;
        }

        const postContainer = document.getElementById("post-container");
        const shuffledPosts = shufflePosts(posts);

        for (let i = 0; i < 5; i++) {
            shuffledPosts.forEach(post => {
                post.videoSources.forEach(videoSource => {
                    if (videoSource.index == i) {
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
						<button>Follow</button>
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

                        const heartIcon = div.querySelector('.fa-heart');
                        heartIcon.addEventListener('click', function () {
                            const likesCount = div.querySelector('span'); // select the span element
                            const currentLikes = post.likes[post.videoSources.indexOf(videoSource)];
                            if (this.classList.contains('red-heart')) {
                                post.likes[post.videoSources.indexOf(videoSource)] = parseInt(currentLikes) - 1;
                                likesCount.textContent = post.likes[post.videoSources.indexOf(videoSource)];
                                this.classList.remove('red-heart');
                            } else {
                                post.likes[post.videoSources.indexOf(videoSource)] = parseInt(currentLikes) + 1;
                                likesCount.textContent = post.likes[post.videoSources.indexOf(videoSource)];
                                this.classList.add('red-heart');
                            }
                        });

                        const shareIcon = div.querySelector('.fa-share');
                        shareIcon.addEventListener('click', function () {
                            const url = window.location.href;
                            navigator.clipboard.writeText(url).then(function () {
                                // Display a message to the user
                                alert('Link copied to clipboard!');
                            
                                // Change the share icon color to red
                                shareIcon.style.color = 'red';
                              }, function () {
                                alert('Unable to copy link to clipboard');
                              });
                        });

                        const comments = div.querySelector('.fa-comment-dots');
                        comments.addEventListener('click', function () {
                            document.querySelector('#commentSection').removeAttribute('hidden');
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
                    }//Jared was here
                });
            });
        }
    })
    .catch(error => console.error(error));
