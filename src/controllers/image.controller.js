const fs = require('fs');
const axios = require('axios');
const resizeOptimizeImages = require('resize-optimize-images');

const compressImage = async (imageName) => {
  const options = {
    images: [`./src/images/${imageName}`],
    width: 320,
    quality: 50,
  };

  // Run the module.
  await resizeOptimizeImages(options);
};

const catchAsync = require('../utils/catchAsync');

const downloadImage = (imageURL) => {
  const urlArr = imageURL.split('.');
  const writer = fs.createWriteStream(`./src/images/largeImg.${urlArr[urlArr.length - 1]}`);

  return axios({
    method: 'get',
    url: encodeURI(imageURL),
    responseType: 'stream',
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(`largeImg.${urlArr[urlArr.length - 1]}`);
        }
      });
    });
  });
};

const serveImage = catchAsync(async (req, res) => {
  const { imageURL } = req.params;
  const imageName = await downloadImage(imageURL);
  await compressImage(imageName);
  res.writeHead(200, { 'content-type': 'image/jpg' });
  fs.createReadStream(`./src/images/${imageName}`).pipe(res);
});

module.exports = {
  serveImage,
};
