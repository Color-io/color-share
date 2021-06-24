const express = require('express');

const router = express.Router();
const shareController = require('../../controllers/share.controller');

router.route('/:videoId').get(shareController.getHTMLMetatags);

module.exports = router;
