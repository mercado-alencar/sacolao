module.exports = (() => {

	const conection = require('./conection');

	const client = conection.connectDB();

	const logger = require('../../../utils/logger');

	const save = (system, value) => {
		const text = `INSERT INTO ${conection.schema}.INFO(system, name, request, response , status, error) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
		const values = [system.id, system.name, value.request, value.response, value.status, value.error];
		client.query(text, values, (err) => {
			if (err) {
				logger.error(err.stack);
			}
		});
	};

	const get = async (system, limit = 10) => {
		const res = await client.query(`select * from ${conection.schema}.INFO where system like $1 order by request desc limit $2`, [system, limit]);
		let response = await res.rows;
		return response || [];
	};
	const last = async (system) => {
		const res = await client.query(`select * from ${conection.schema}.INFO where system like $1 order by request desc limit 1`, [system]);
		// return await res.rows[0];
		let response = await res.rows[0];
		return response || {};
	};
	const all = async () => {
		const res = await client.query(`select * from ${conection.schema}.INFO`, []);
		let response = await res.rows;
		return response || [];
	};


	const reset = () => {
		client.query(`delete from ${conection.schema}.INFO`);
	};
	return {
		save: save,
		get: get,
		all: all,
		last: last,
		reset: reset
	};
})();