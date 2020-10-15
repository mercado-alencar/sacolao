
const router = require("express").Router();
const logger = require('../utils/logger');

router.use('/cliente', require("./ClienteRouter"))
router.use('/venda', require("./VendaRouter"))
router.use('/sorteio', require("./SorteioRouter"))

logger.info('Router setted');
module.exports = router;
