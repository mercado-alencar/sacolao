module.exports = (() => {

	const database = require('../controllers/database/database');
	const service = require('../controllers/service/service');
	const maintance = require('../controllers/service/maintance');

	const router = (app) => {

		app.get('/maintance', async function (req, res) {
			res.send(maintance.set(req.query.system));
		});

		app.get('/config', async function (req, res) {
			let rows = await database.system.all();
			res.send(rows);
		});

		app.post('/system', async function (req, res) {
			let result = service.system.save(req);
			res.send(result);
		});
		app.delete('/system/:id', async function (req, res) {
			let result = service.system.remove(req.params.id);
			res.send({ requested: 'ok', result: result });
		});
		app.put('/system', async function (req, res) {
			let result = service.system.update(req);
			res.send({ requested: 'ok', result: result });
		});
		app.get('/now', async function (req, res) {
			service.request(req.query.system);
			res.send({ requested: 'ok' });
		});
	}
	return {
		router: router
	}
})();