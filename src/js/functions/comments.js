function generateComments() {

	var jsonData = localStorage.getItem('userdata');
	var users = JSON.parse(jsonData);
	const commentSection = document.getElementById("commentSection");
	const randomPosts = [];
	while (randomPosts.length < 3) {
		const randomIndex = Math.floor(Math.random() * posts.length);
		if (!randomPosts.includes(randomIndex)) {
			randomPosts.push(randomIndex);
		}
	}
	const comments = ["This video is amazing!", "I've been waiting for this video for so long!", "Wow, I learned so much from this video!", "Can't wait for the next one!", "You're such a great teacher!", "This is one of the best channels on YouTube!", "Thanks for sharing your knowledge with us!", "Your editing skills are on point!", "I love the music you use in your videos!", "This is exactly what I needed to hear today.", "I'm so inspired by this video!", "You have a great voice for narration!", "I've been binge-watching your videos all weekend!", "This video deserves a million views!", "I can't believe how much work you put into this.", "You make it look so easy!", "You're the reason I love YouTube!", "I wish I could give this video more than one thumbs up!", "This video changed my life.", "I'm definitely subscribing!", "Your content is always top-notch!", "You're a true talent!", "I love how you explain everything so clearly!", "This is the best video on this topic I've ever seen!", "I don't usually comment, but I had to on this one!", "You deserve all the success in the world!", "Your videos are always so engaging!", "I'm recommending your channel to all my friends!", "You're a YouTube superstar!", "I feel like I can conquer the world after watching this video!", "I wish I had found this channel sooner!", "I'm so glad I found your channel!"];
	commentSection.innerHTML = `
      <div class="card-body p-2">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4 class="mb-0" style="margin-right: 10px; font-size: 1.25rem;">Recent comments</h4>
          <button id="hideComments" type="button" class="btn btn-primary btn-sm rounded-circle" style="font-size: 0.5rem; height: 25px; width: 25px;">X</button>
        </div>
        <p class="fw-light mb-2" style="font-size: 1.1rem;">Latest Comments section by users</p>
        ${randomPosts.map(index => {
		const post = posts[index];
		const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
		const formattedDate = `${randomDate.getMonth() + 1}/${randomDate.getDate()}/${randomDate.getFullYear()}`;
		const randomComment = comments[Math.floor(Math.random() * comments.length)];
		return `
            <div class="d-flex flex-start mb-3" style="padding: 10px;">
  <img class="rounded-circle shadow-1-strong me-3"
    src="${post.avatar}" alt="avatar" width="60"
    height="60" />
  <div>
    <h6 class="fw-bold mb-1" style="font-size: 1.2rem;">${post.userName} <span class="badge bg-primary">${post.friend ? "Add?" : "Friend"}</span></h6>
    <div class="d-flex align-items-center">
      <p class="mb-0" style="font-size: 0.8rem;">${formattedDate}</p>
      <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
    </div>
    <p class="mb-0 mt-2" style="font-size: 1rem;">${randomComment}</p>
  </div>
</div>

          `;
	}).join('')}
      </div>
    `;
	const hideButton = document.getElementById("hideComments");
	hideButton.addEventListener("click", () => {
		commentSection.setAttribute("hidden", "");
		generateComments();
	});
}
generateComments();