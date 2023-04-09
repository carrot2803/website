const fs = require('fs');
const { google } = require('googleapis');

// Set the API key and file ID variables
const API_KEY = 'AIzaSyDll_M1xI_AkGotkCbOjUpvPsYrgcY8m8k';
const FILE_ID = '10UZ9GHJRZRWnydXcsD5rY-sC69L36ANi';

// Set the path to your credentials JSON file
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./gleaming-cove-332818-19d8bc2c4426.json";

/**
 * Downloads a file from Google Drive and saves it to disk.
 * @param {string} fileId The ID of the file to download.
 * @param {string} filePath The path to save the downloaded file to.
 * @return {Promise<void>} A promise that resolves when the file has been downloaded and saved.
 */
async function downloadFile(fileId, filePath) {
    // Create an authentication client using the API key
    const auth = new google.auth.GoogleAuth({
        key: API_KEY,
        scopes: 'https://www.googleapis.com/auth/drive',
    });

    // Create a Drive API client using the authentication client
    const drive = google.drive({ version: 'v3', auth });

    try {
        // Download the file from Drive
        const res = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
        // Create a write stream to save the file to disk
        const dest = fs.createWriteStream(filePath);
        res.data.pipe(dest);

        // Return a promise that resolves when the file has been saved
        return new Promise((resolve, reject) => {
            dest.on('finish', resolve);
            dest.on('error', reject);
        });
    } catch (err) {
        console.error(`Error downloading file: ${err}`);
        throw err;
    }
}

// Set the path to save the downloaded file
const filePath = './file.png';

(async () => {
    try {
        // Download the file and log a success message
        await downloadFile(FILE_ID, filePath);
        console.log(`File downloaded successfully to ${filePath}`);
    } catch (err) {
        // Log an error message if the file download fails
        console.error(`Error downloading file: ${err}`);
    }
})();
