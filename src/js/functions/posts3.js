fetch('https://sheetdb.io/api/v1/i2m4jfapa6c88?cors=true')
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

        const shuffledPosts = shufflePosts(posts);

        for (let i = 0; i < 5; i++) {
            shuffledPosts.forEach(post => {
                const videoSources = JSON.parse(post.videoSources);
                videoSources.forEach(videoSource => {
                    if (videoSource.index == i) {
                        const games = post.game.split(": ");
                        const gameNames = games.map(game => game);
                        console.log(gameNames);

                    }
                });
            });
        }

    })
    .catch(error => console.error(error));
