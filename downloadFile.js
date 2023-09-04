const axios = require('axios');
const fs = require('fs');

// Replace this URL with the link you want to download content from
const url = 'https://app.anm.gov.br/dadosabertos/SIGMINE/AREA_SERVIDAO.zip';

// Define the filename where you want to save the downloaded content
const filename = 'downloaded-content.txt';

axios.get(url, { responseType: 'stream' })
  .then((response) => {
    // Pipe the response data to a writable stream (a file in this case)
    const writer = fs.createWriteStream(filename);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  })
  .then(() => {
    console.log(`Content downloaded and saved as ${filename}`);
  })
  .catch((error) => {
    console.error('Error downloading content:', error);
  });