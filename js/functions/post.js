const posts = [
	{
		userName: "Arshad", game: ["League of Legends"],
		videoSources: [
			{ src: "assets/video1.mp4" }
		],
		likes: ["2.6K"],
		comments: ["420"],
		shares: ["420"],
		avatar: "assets/pfp1.png"
	},
	{
		userName: "Brandon",
		game: ["Genshin Impact"],
		videoSources: [
			{
				index: "1",
				src: "assets/video2.mp4"
			}
		],
		likes: ["2.6K"],
		comments: ["420"],
		shares: ["450"],
		avatar: "assets/pfp2.png"
	},
	{
		userName: "Dmitri",
		game: ["CSGO"],
		videoSources: [
			{
				index: "1",
				src: "assets/video3.mp4"
			}
		],
		likes: ["2.6K"],
		comments: ["420"],
		shares: ["420"],
		avatar: "assets/pfp3.png"
	},
	{
		userName: "Jared",
		game: ["Overwatch", "test1", "test2"],
		videoSources: [
			{ index: "1", src: "assets/video4.mp4" },
			{ index: "2", src: "assets/video1.mp4" },
			{ index: "3", src: "assets/video3.mp4" }
		],
		likes: ["200", "100", "100"],
		comments: ["10", "20", "25"],
		shares: ["69", "25", "60"],
		avatar: "assets/pfp4.png"
	},
	{
		userName: "Selena",
		game: ["Overwatch"],
		videoSources: [
			{ index: "1", src: "assets/video5.mp4" },
			{ index: "2", src: "assets/video6.mp4" },
		],
		likes: ["5.6k"],
		comments: ["10k"],
		shares: ["69k"],
		avatar: "assets/pfp5.png"
	}
];

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

for (let i = 0; i < 5; i++){
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
		});
	});
}
