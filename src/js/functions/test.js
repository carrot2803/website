const githubUsername = 'your-github-username';
const repoName = 'your-repo-name';
const filePath = 'path/to/your/file.json';
const accessToken = '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';

fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data); // your JSON data as an object
  })
  .catch(error => {
    console.error(error);
  });
