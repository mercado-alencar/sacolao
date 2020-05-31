
const router = require("express").Router();
const logger = require('../utils/logger');

router.use('/cliente', require("./ClienteRouter"))

logger.info('Router setted');
module.exports = router;