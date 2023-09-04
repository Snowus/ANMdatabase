const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Replace this URL with the link to the file you want to download
const url = 'https://app.anm.gov.br/dadosabertos/SIGMINE/AREA_SERVIDAO.zip';

axios.get(url, { responseType: 'stream' })
  .then((response) => {
    const contentDisposition = response.headers['content-disposition'];

    // Extract the filename from the content disposition header, if available
    let filename = 'downloaded-file';
    if (contentDisposition) {
      const match = /filename="(.+)"/.exec(contentDisposition);
      if (match) {
        filename = match[1];
      }
    }

    // Determine the file extension based on the content type, if available
    const contentType = response.headers['content-type'];
    const extFromContentType = contentType ? `.${contentType.split('/')[1]}` : '';

    // Combine the filename and file extension
    filename = filename.endsWith(extFromContentType) ? filename : filename + extFromContentType;

    // Create a writable stream and pipe the response data to it
    const writer = fs.createWriteStream(filename);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  })
  .then(() => {
    console.log(`File downloaded as ${filename}`);
  })
  .catch((error) => {
    console.error('Error downloading file:', error);
  });
