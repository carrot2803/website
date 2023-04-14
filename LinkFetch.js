    const { google } = require('googleapis');

    // Set the API key and folder ID variables
    const API_KEY = 'AIzaSyDll_M1xI_AkGotkCbOjUpvPsYrgcY8m8k';
    const FOLDER_ID = '12QzRkopOa5r4BB_aUMCkzcv3eCAsN7jR';

    // Load the credentials JSON file
    const credentials = require('./gleaming-cove-332818-19d8bc2c4426.json');

    /**
     * Lists all files in a folder in Google Drive.
     * @param {string} folderId The ID of the folder to list files from.
     * @return {Promise<Array>} A promise that resolves with an array of file URLs.
     */
    async function listFilesInFolder(folderId) {
        // Create an authentication client using the credentials
        const auth = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            ['https://www.googleapis.com/auth/drive.readonly']
        );

        try {
            // Authorize the client
            await auth.authorize();

            // Create an instance of the Drive API
            const drive = google.drive({ version: 'v3', auth });

            // List all files in the specified folder
            const response = await drive.files.list({
                q: `'${folderId}' in parents`,
                fields: 'nextPageToken, files(webContentLink)',
            });

            // Extract the file URLs from the response and return them as an array
            const fileUrls = response.data.files.map((file) => file.webContentLink);
            return fileUrls;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // Call the listFilesInFolder function with the specified folder ID
    listFilesInFolder(FOLDER_ID)
        .then((fileUrls) => console.log(fileUrls))
        .catch((error) => console.error(error));
