
let router = require("express").Router();
const ClienteService = require('../controllers/ClienteService');

this.service = new ClienteService();

router.post('/', async (req, res) => {
	let dto = req.body;

	let entity = await  this.service.save(dto);	
	if(entity.erro) {
		res.status(500).send(entity);
	} else	
	res.send(entity);
});

router.get('/', async (req, res) => {
	let list = await this.service.list();	
	res.send(list);
});


router.get('/search', async (req, res) => {
	let list = await this.service.search(req.query);	
	res.send(list);
});
	

module.exports = router;