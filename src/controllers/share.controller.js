const path = require('path');
const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const { videoService } = require('../services');

const getHTMLMetatags = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const reqURL = decodeURIComponent(req.url);
  const strArr = reqURL.split('=');
  strArr.shift();
  const redirectUrl = strArr.join('=');

  const video = await videoService.getVideoById(videoId);
  const { video_title: videoTitle, thumbnail_url: thumbnailUrl, video_description: videoDescription } = video;

  const htmlPath = `./src/templates/videoMetatag.html`;
  const tempFileName = `temp-${videoId}.html`;
  const saveFilePath = path.join(__dirname, '../../downloads', tempFileName);

  fs.createReadStream(htmlPath);
  fs.readFile(htmlPath, async (error, content) => {
    let htmlContent = content.toString();
    htmlContent = htmlContent.replace('{{pageTitle}}', videoTitle);
    htmlContent = htmlContent.replace('{{title}}', videoTitle);
    htmlContent = htmlContent.replace('{{og:title}}', videoTitle);
    htmlContent = htmlContent.replace('{{twitter:title}}', videoTitle);

    htmlContent = htmlContent.replace('{{description}}', videoDescription);
    htmlContent = htmlContent.replace('{{og:description}}', videoDescription);
    htmlContent = htmlContent.replace('{{twitter:description}}', videoDescription);

    htmlContent = htmlContent.replace('{{og:url}}', redirectUrl);
    htmlContent = htmlContent.replace('{{twitter:url}}', redirectUrl);

    htmlContent = htmlContent.replace('{{og:image}}', thumbnailUrl);
    htmlContent = htmlContent.replace('{{twitter:image}}', thumbnailUrl);

    fs.writeFileSync(saveFilePath, htmlContent);
    res
      .set(
        'Content-Security-Policy',
        "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline'"
      )
      .sendFile(saveFilePath);
  });
});

module.exports = {
  getHTMLMetatags,
};
