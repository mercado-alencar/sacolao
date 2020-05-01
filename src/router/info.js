module.exports = (() => {
	const database = require('../controllers/database/database');

	const router = (app) => {
		app.get('/last', async function (req, res) {
			let row = await database.info.last(req.query.system);
			res.send(row);
		});
		app.get('/history', async function (req, res) {
			let row = await database.info.get(req.query.system, req.query.size);
			res.send(row);
		});

		app.get('/all', async function (req, res) {
			let rows = await database.info.all();
			res.send(rows);
		});
	}
	return {
		router: router
	}
})();