try {
	const jsonData = localStorage.getItem('userdata');
	const usersData = JSON.parse(jsonData);

	function shufflePosts(usersData) {
		usersData.sort(() => Math.random() - 0.5); // sort randomly
		for (let i = usersData.length - 1; i > 0; i--) { // Shuffle the usersData array
			const j = Math.floor(Math.random() * (i + 1));
			[usersData[i], usersData[j]] = [usersData[j], usersData[i]];
		}
		return usersData;
	}

	// select the accounts container
	const accountsContainer = document.querySelector('.accounts');
	// create the 'Suggested accounts' paragraph
	const suggestedAccountsParagraph = document.createElement('p');
	suggestedAccountsParagraph.textContent = 'Suggested accounts';
	// create the user elements
	const users = shufflePosts(usersData).slice(0, 4);
	const userElements = users.map(user => {
		// create the user element
		const userElement = document.createElement('div');
		userElement.classList.add('user');

		// create the avatar image
		const avatarImg = document.createElement('img');
		avatarImg.src = user.avatar;
		avatarImg.alt = 'avatar';

		// create the username element
		const username = document.createElement('h6');
		username.classList.add('username');
		username.textContent = user.userName;

		// append the avatar image and username to the user element
		userElement.appendChild(avatarImg);
		userElement.appendChild(username);

		// add an event listener to the user element to redirect the user to YouTube when the element is clicked
		userElement.addEventListener('click', () => {
			const username = user.userName;
			window.location.href = `../public/UserProfile.html?username=${username}`;
		});

		return userElement;
	});
	// append the suggested accounts paragraph and user elements to the accounts container
	accountsContainer.appendChild(suggestedAccountsParagraph);
	userElements.forEach(userElement => {
		accountsContainer.appendChild(userElement);
	});
} catch (error) {
	console.error(error);
}
