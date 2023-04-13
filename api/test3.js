const fs = require('fs');
const { google } = require('googleapis');

// Set the API key and folder ID variables
const API_KEY = 'AIzaSyDll_M1xI_AkGotkCbOjUpvPsYrgcY8m8k';
const FOLDER_ID = '12QzRkopOa5r4BB_aUMCkzcv3eCAsN7jR';

// Set the path to your credentials JSON file
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./gleaming-cove-332818-19d8bc2c4426.json";

// Define the path to the folder where you want to store the downloaded files
const test = './test';

/**
 * Lists all files in a folder in Google Drive.
 * @param {string} folderId The ID of the folder to list files from.
 * @return {Promise<Array>} A promise that resolves with an array of file objects.
 */
async function listFilesInFolder(folderId) {
  const auth = new google.auth.GoogleAuth({
    key: API_KEY,
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  const drive = google.drive({ version: 'v3', auth });

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
    });

    return res.data.files;
  } catch (err) {
    console.error(`Error listing files in folder: ${err}`);
    throw err;
  }
}

/**
 * Downloads a folder from Google Drive and saves it to disk.
 * @param {string} folderId The ID of the folder to download.
 * @return {Promise<void>} A promise that resolves when the folder has been downloaded and saved.
 */
async function downloadFolder(folderId) {
  const auth = new google.auth.GoogleAuth({
    key: API_KEY,
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  const drive = google.drive({ version: 'v3', auth });

  try {
    const files = await listFilesInFolder(folderId);

    // Check if the 'test' folder exists and create it if it doesn't
    if (!fs.existsSync(test)) {
      fs.mkdirSync(test);
    }

    for (const file of files) {
      const filePath = `${test}/${file.name}`;
      const res = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' });
      const dest = fs.createWriteStream(filePath);
      res.data.pipe(dest);
      await new Promise((resolve, reject) => {
        dest.on('finish', resolve);
        dest.on('error', reject);
      });
    }
  } catch (err) {
    console.error(`Error downloading folder: ${err}`);
    throw err;
  }
}

(async () => {
  try {
    await downloadFolder(FOLDER_ID);
    console.log(`Folder downloaded successfully to ${test}`);
  } catch (err) {
    console.error(`Error downloading folder: ${err}`);
  }
})();
