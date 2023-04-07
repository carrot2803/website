const posts = [
    {
        userName: "Arshad",
        game: "League of Legends",
        videoSource: "assets/video1.mp4",
        likes: "2.6K",
        comments: "420",
        shares: "420",
        avatar: "assets/pfp1.png"
    },
    {
        userName: "Brandon",
        game: "Genshin Impact",
        videoSource: "assets/video2.mp4",
        likes: "2.6K",
        comments: "420",
        shares: "450",
        avatar: "assets/pfp2.png"
    },
    {
        userName: "Dmitri",
        game: "CSGO",
        videoSource: "assets/video3.mp4",
        likes: "2.6K",
        comments: "420",
        shares: "420",
        avatar: "assets/pfp3.png"
    },
    {
        userName: "Jared",
        game: "Overwatch",
        videoSource: "assets/video4.mp4",
        likes: "200",
        cooments: "10",
        shares: "69",
        avatar: "assets/pfp4.png"
    },
    {
        userName: "Selena",
        game: "Overwatch",
        videoSource: "assets/video5.mp4",
        likes: "5.6k",
        cooments: "10k",
        shares: "69k",
        avatar: "assets/pfp5.png"
    }
];

const postContainer = document.getElementById("post-container");

posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
    <div class="post-info">
      <div class="user">
        <img src="${post.avatar}" alt="avatar">
        <div>
          <h6>${post.userName}</h6>
          <p>${post.game}</p>
        </div>
      </div>
      <button>Follow</button>
    </div>
    <div class="post-content">
      <video class="video-style" controls loop disablepictureinpicture controlslist="nodownload noplaybackrate">
        <source src="${post.videoSource}" type="video/mp4">
      </video>
      <div class="video-icons">
        <a href="#"><i class="fas fa-heart fa-lg"></i><span>${post.likes}</span></a>
        <a href="#"><i class="fas fa-comment-dots fa-lg"></i><span>${post.comments}</span></a>
        <a href="#"><i class="fas fa-share fa-lg"></i> <span>${post.shares}</span></a>
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
});
