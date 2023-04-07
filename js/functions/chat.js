const contacts = document.querySelectorAll('.contacts-sidebar li');
const chatContainer = document.querySelector('.chat-container');
const contactsSidebar = document.querySelector('.contacts-sidebar');
const backButton = document.querySelector('.back-button');

// hide chat container and show contacts-sidebar by default
chatContainer.classList.add('hidden');
contactsSidebar.classList.remove('hidden');

// add click event listeners to each contact
contacts.forEach(contact => {
  contact.addEventListener('click', () => {
    // hide contacts-sidebar and show chat container
    chatContainer.classList.remove('hidden');
    // contactsSidebar.classList.add('hidden'); for now
    backButton.classList.remove('hidden');
  });
});

// add click event listener to back button
backButton.addEventListener('click', () => {
  // hide chat container and show contacts-sidebar
  chatContainer.classList.add('hidden');
  contactsSidebar.classList.remove('hidden');
  backButton.classList.add('hidden');
});
