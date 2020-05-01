module.exports = (() => {

	const database = require('../controllers/database/database');

	const logger = require('../utils/logger');
	const router = (app) => {

		app.get('/email/:id', async function (req, res) {
			let result = await database.email.get(req.params.id);
			res.send(result || {});
		});

		app.post('/email', async function (req, res) {
			let result = database.email.save(req);
			res.send(result);
		});
		app.put('/email/:id', async function (req, res) {
			let result = database.email.update(req);
			res.send({ requested: 'ok', result: result });
		});

	}
	return {
		router: router
	}
})();