document.addEventListener('DOMContentLoaded', () => {
	const loginButton = document.querySelector('#login-btn');
	const avatarSelected = localStorage.getItem('avatarSelected');
	const avatarImage = document.querySelector('#avatar-image'); // Define the avatarImage variable
	if (avatarSelected && avatarImage.hasAttribute !== null) {
		const contactsSidebar = document.querySelector('.contacts-sidebar');
		const chatContainer = document.querySelector('.chat-container');
		const backButton = document.querySelector('.back-button');

		var jsonData = localStorage.getItem('userdata');
		var usersData = JSON.parse(jsonData);
		// get the first 10 users from the JSON data
		const first10Users = usersData.slice(0, 10);
		// create and append the h1 element
		const h1 = document.createElement('h1');
		h1.textContent = 'Contacts';
		contactsSidebar.appendChild(h1);
		// create and append the ul element
		const ul = document.createElement('ul');
		contactsSidebar.appendChild(ul);

		// iterate over the first 10 users and add them to the contact list
		first10Users.forEach((user, i) => {
			const contactItem = document.createElement('li');
			contactItem.id = `contact${i + 1}`;
			const contactLink = document.createElement('a');
			contactLink.href = '#';
			const contactImg = document.createElement('img');
			contactImg.src = user.avatar;
			const contactName = document.createElement('span');
			contactName.textContent = user.userName;
			contactLink.appendChild(contactImg);
			contactLink.appendChild(contactName);
			contactItem.appendChild(contactLink);
			ul.appendChild(contactItem);
			// add click event listener to each contact
			contactItem.addEventListener('click', () => {
				// hide contacts-sidebar and show chat container
				chatContainer.classList.remove('hidden');
				// update chat container HTML
				chatContainer.innerHTML = chatContainerHTML;
			});
		});

		// add click event listener to back button
		backButton.addEventListener('click', () => {
			// hide chat container and show contacts-sidebar
			chatContainer.classList.add('hidden');
		});

	}
	else {
		const contactsSidebar = document.querySelector('.contacts-sidebar');
		const loginDiv = document.createElement('h4');
		loginDiv.textContent = 'Login to view Contacts';
		loginDiv.style.textAlign = 'center'; // Center the text
		loginDiv.style.borderRadius = '50%'; // Make the border circular
		loginDiv.style.width = '200px'; // Set a width for the element
		loginDiv.style.margin = '0 auto'; // Center the element horizontally
		contactsSidebar.appendChild(loginDiv);
	}
	
});
