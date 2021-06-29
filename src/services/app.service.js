const axios = require('axios');
const config = require('../config/config');

const APIURL = config.apiURL;

/**
 * Get app by id
 * @param {ObjectId} appID
 * @returns {Promise<Video>}
 */
const getAppById = async (appID) => {
  const video = await axios(`${APIURL}v1/app/${appID}`).then((response) => response.data);
  return video;
};

module.exports = {
  getAppById,
};
