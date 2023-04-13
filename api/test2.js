const fs = require('fs');
const { google } = require('googleapis');

// Set the API key and folder ID variables
const API_KEY = 'AIzaSyDll_M1xI_AkGotkCbOjUpvPsYrgcY8m8k';
const FOLDER_ID = '12QzRkopOa5r4BB_aUMCkzcv3eCAsN7jR';

// Set the path to your credentials JSON file
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./gleaming-cove-332818-19d8bc2c4426.json";

/**
 * Lists all files in a folder in Google Drive.
 * @param {string} folderId The ID of the folder to list files from.
 * @return {Promise<Array>} A promise that resolves with an array of file URLs.
 */
async function listFilesInFolder(folderId) {
  // Create an authentication client using the API key
  const auth = new google.auth.GoogleAuth({
    key: API_KEY,
    scopes: 'https://www.googleapis.com/auth/drive.readonly',
  });

  // Create a Drive API client using the authentication client
  const drive = google.drive({ version: 'v3', auth });

  try {
    // List all files in the folder
    const res = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: 'nextPageToken, files(id, name)',
    });

    // Map each file object to a file URL string
    const fileUrls = res.data.files.map(file => `https://drive.google.com/uc?export=download&amp;id=${file.id}`);

    // Write the file URLs to a JSON file
    fs.writeFileSync('fileUrls.json', JSON.stringify(fileUrls));

    // Return the file URLs
    return fileUrls;
  } catch (err) {
    console.error(`Error listing files in folder: ${err}`);
    throw err;
  }
}

(async () => {
  try {
    // List all files in the folder and store the file URLs in a JSON file
    const fileUrls = await listFilesInFolder(FOLDER_ID);

    // Print the file URLs
    console.log(fileUrls);
  } catch (err) {
    // Log an error message if the file list operation fails
    console.error(`Error listing files in folder: ${err}`);
  }
})();
