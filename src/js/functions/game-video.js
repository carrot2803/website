const params = new URLSearchParams(window.location.search);
const gName = params.get('gameName');
console.log('Game name is', gName);

fetch("/src/js/functions/users.json")
    .then(response => response.json())
    .then(posts => {
        // Shuffle the posts array randomly
        posts.sort(() => Math.random() - 0.5);

        const postContainer = document.getElementById("post-container");

        for (let i = 0; i < 5; i++)
            posts.forEach(post => {
                if (post.game.includes(gName)) {
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
                            <p>${gName}</p>
                            </div>
                        </div>
                        <button>${post.friend ? "Add+" : "Friend"}</button>
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
                }
            });
    });
