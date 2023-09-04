const axios = require('axios');
const AdmZip = require('adm-zip');
const fs = require('fs');

async function downloadAndExtractFile(url) {
  try {
    // Step 1: Download the zip file
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    });

    // Step 2: Extract the file
    const zip = new AdmZip(response.data);
    const extractPath = './extracted';
    fs.mkdirSync(extractPath, { recursive: true });
    zip.extractAllTo(extractPath, true);

    console.log('File downloaded and extracted successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// URL of the zip file to download
const zipFileUrl = 'https://example.com/sample.zip';

downloadAndExtractFile(zipFileUrl);
