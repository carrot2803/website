const { google } = require('googleapis');
const fs = require('fs');

// Set the API key and folder ID variables
const API_KEY = 'AIzaSyDll_M1xI_AkGotkCbOjUpvPsYrgcY8m8k';
const FOLDER_ID = '12QzRkopOa5r4BB_aUMCkzcv3eCAsN7jR';

// Load the credentials JSON file
const credentials = require('./gleaming-cove-332818-19d8bc2c4426.json');

// Create an authentication client using the API key
const auth = new google.auth.GoogleAuth({
  key: API_KEY,
  scopes: 'https://www.googleapis.com/auth/drive',
});

// Create a Drive API client using the authentication client
const drive = google.drive({ version: 'v3', auth });

// Set the query to search for video files in the folder
const query = `'${FOLDER_ID}' in parents and mimeType='video/mp4'`;

// Call the Drive API to retrieve the list of video files in the folder
drive.files.list({
  q: query,
  fields: 'nextPageToken, files(webContentLink)',
}, (err, res) => {
  if (err) {
    console.error(`Error retrieving video files: ${err}`);
    return;
  }

  // Log the webContentLink of each video file in the folder
  const videos = res.data.files;
  videos.forEach((video) => {
    console.log(video.webContentLink);
  });
});
