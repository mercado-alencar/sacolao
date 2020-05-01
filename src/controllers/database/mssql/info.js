module.exports = (() => {

	const conection = require('./conection');
	const utils = require('./utils');
	const sql = require("mssql");

	let client = null;

	(async () => {
		client = client || await conection.connectDB();
	})()



	const save = async (system, value) => {
		client = client || await conection.connectDB();
		let toSave = value;
		toSave.system = system.id;
		toSave.name = system.name;
		delete toSave.date;
		for (let prop in toSave) {
			toSave[prop] = toSave[prop].toString();
		}
		let params = utils.insertQueryBuilder(`${conection.schema}.INFO`, toSave);
		let request = await client.request();
		params.values.forEach(input => {
			if (input && input.hasOwnProperty('name')) {

				request.input(input.name, input.type || sql.Text, input.value);
			}
		});
		request.query(params.string).then((err, res) => {
			if (err) {
				throw err.stack;
			} else {
				return res;
			}
		}).catch((err, res) => {
			if (err) {
				throw err.stack;
			}

		});

	};

	const get = async (system, limit = 10) => {
		client = client || await conection.connectDB();

		const res = await client.request().query(`select top ${limit} * from ${conection.schema}.INFO where system like '${system}' order by request desc `);;
		let response = await res.recordset;
		return response || [];
	};
	const last = async (system) => {
		client = client || await conection.connectDB();

		const res = await client.request().query(`select top 1 * from ${conection.schema}.INFO where system like '${system}' order by request desc`);
		let recordset = await res.recordset;
		let response = recordset.length ? recordset[0] : null;
		return response || {};
	};
	const all = async () => {
		client = client || await conection.connectDB();

		const res = await client.request().query(`select * from ${conection.schema}.INFO`);
		let response = await res.recordset;
		return response || [];
	};


	const reset = () => {
		client.request().query(`delete from ${conection.schema}.INFO`);
	};
	return {
		save: save,
		get: get,
		all: all,
		last: last,
		reset: reset
	};
})();