const games = ["League of Legends", "Elden Ring", "Apex Legends", "Genshin Impact", "Counter-Strike: Global Offensive", "Sekiro: Shadows Die Twice", "Resident Evil 4", "VALORANT", "Dota2", "Minecraft"];

const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

let keepSearchResultsDisplayed = false;
function displayResults(results) {
    const html = results.map(result => `<div><p>${result}</p></div>`).join("");
    searchResults.innerHTML = html;
    
    const resultElements = searchResults.querySelectorAll('div');
    resultElements.forEach(resultElement => {
        resultElement.addEventListener('mouseenter', () => {
            keepSearchResultsDisplayed = true;
        });
        resultElement.addEventListener('mouseleave', () => {
            keepSearchResultsDisplayed = false;
        });
        resultElement.addEventListener('click', () => {
            keepSearchResultsDisplayed = true;
        });
    });
}

var jsonData = localStorage.getItem('userdata');
var users= JSON.parse(jsonData);
// Handle search input changes
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    // Clear previous results
    searchResults.innerHTML = '';
    // Filter the games array by matching game names
    const matchingGames = games.filter(game => {
        const gameName = game.toLowerCase();
        return gameName.includes(searchTerm);
    });
    // Filter the users array by matching usernames or game names
    const matchingUsers = users.filter(user => {
        const username = user.userName.toLowerCase();
        return username.includes(searchTerm);
    });

    // Combine the top 5 matching games and users
    let numResultsDisplayed = 0;
    for (let i = 0; i < matchingGames.length + matchingUsers.length; i++) {
        if (numResultsDisplayed >= 3) {
            break;
        }
        if (i < matchingGames.length) {
            const gameElement = document.createElement('div');
            gameElement.innerHTML = `<a href = "../public/Game-Video.html?gameName=${matchingGames[i]}">${matchingGames[i]}</a>`;
            searchResults.appendChild(gameElement);
            numResultsDisplayed++;
        }
        if (i < matchingUsers.length) {
            const userElement = document.createElement('div');
            userElement.innerHTML = `<a href = "../public/UserProfile.html?username=${matchingUsers[i].userName}">${matchingUsers[i].userName}</a>`;
            searchResults.appendChild(userElement);
            numResultsDisplayed++;
        }
    }

    // Adjust the height of the search results based on the number of results
    if (numResultsDisplayed === 1) {
        searchResults.style.height = '2.5rem';
    } else if (numResultsDisplayed === 2) {
        searchResults.style.height = '5rem';
    } else if (numResultsDisplayed === 3) {
        searchResults.style.height = '7.5rem';
    } else {
        searchResults.style.height = '10rem';
    }
});



// Update event listeners for searchInput to keep search results displayed
searchInput.addEventListener('focus', function () {
    searchResults.style.display = 'block';
    keepSearchResultsDisplayed = true;
});

searchInput.addEventListener('blur', function () {
    keepSearchResultsDisplayed = false;
    setTimeout(function () {
        if (!keepSearchResultsDisplayed) {
            searchResults.style.display = 'none';
        }
    }, 500);
});
