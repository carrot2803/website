const uploadButton = document.querySelector(".upload-btn");
const videoInput = document.getElementById("videoInput");
const videoContainer = document.getElementById("post-container");

uploadButton.addEventListener("click", () => {
    videoInput.click();
});

videoInput.addEventListener("change", () => {
    const file = videoInput.files[0];
    const videoURL = URL.createObjectURL(file);
   
    
    const postContainer = document.getElementById("post-container");
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
        <div class="post-info">
            <div class="user">
                <img src="" alt="avatar">
                <div>
                    <h6>You</h6>
                    <p>Your Upload</p>
                </div>
            </div>
            <button></button>
        </div>
        <div class="post-content">
            <video class="video-style" controls loop disablepictureinpicture controlslist="nodownload noplaybackrate">
                <source src="${videoURL}" type="video/mp4">
            </video>
            <div class="video-icons">
                <a href="#"><i class="fas fa-heart fa-lg"></i><span>1</span></a>
                <a href="#"><i class="fas fa-comment-dots fa-lg"></i><span>2</span></a>
                <a href="#"><i class="fas fa-share fa-lg"></i> <span>3</span></a>
            </div>
        </div>
    `;
    postContainer.appendChild(div);
});

