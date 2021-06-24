const axios = require('axios');
const config = require('../config/config');

const APIURL = config.apiURL;

/**
 * Get video by id
 * @param {ObjectId} videoID
 * @returns {Promise<Video>}
 */
const getVideoById = async (videoID) => {
  const video = await axios(`${APIURL}v1/video/${videoID}`).then((response) => response.data);
  return video;
};

module.exports = {
  getVideoById,
};
