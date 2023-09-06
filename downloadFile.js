const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Replace this URL with the link to the file you want to download
const url = 'https://app.anm.gov.br/dadosabertos/SIGMINE/AREA_SERVIDAO.zip';

axios.get(url, { responseType: 'stream' })
.then((response) => {
  console.log(response)
  console.log(url)
  const contentDisposition = response.headers['content-disposition'];
  
  // Split the URL string by "/" to get an array of segments
  const urlSegments = url.split('/');
  // Access the "SIGMINE" and "AREA_SERVIDAO" parts
  const folderToBeSaved = urlSegments[urlSegments.length - 2];
  const fileNameToBeSaved = urlSegments[urlSegments.length - 1].split('.')[0];
    // Extract the filename from the content disposition header, if available
  let filename = fileNameToBeSaved;

    // Determine the file extension based on the content type, if available
    const contentType = response.headers['content-type'];
    const extFromContentType = contentType ? `.${contentType.split('/')[1]}` : '';

    // Combine the filename and file extension
    filename = filename.endsWith(extFromContentType) ? filename : filename + extFromContentType;

    // Combine the desired directory path with the filename
    const directoryPath = './' + folderToBeSaved; // Replace with your desired directory
    const filePath = path.join(directoryPath, filename.endsWith(extFromContentType) ? filename : filename + extFromContentType);

    // Create a writable stream and pipe the response data to it
    const writer = fs.createWriteStream(filename);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  })
  .then(() => {
    console.log(`File downloaded as`);
  })
  .catch((error) => {
    console.error('Error downloading file:', error);
  });
