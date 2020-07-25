const dotenv = require('dotenv');
dotenv.config();

module.exports = (() => {

	const get = tableName => `SELECT * FROM ${process.env.DB_SCHEMA}.${tableName}  where id = $1`;
	
	const list = tableName => `SELECT * FROM ${process.env.DB_SCHEMA}.${tableName} `;

	const deleteById= tableName => `DELETE ${process.env.DB_SCHEMA}.${tableName}  where id = $1`
	
	const insert = (tableName, params) => {
		let values = ' VALUES (';
		let myQuery =`INSERT INTO ${process.env.DB_SCHEMA}.${tableName} (`;
		let keys = Object.keys(params);
		for (let i = 0; i < keys.length; i++) {
			myQuery += '' + keys[i] + (i < keys.length - 1 ? ',' : ')');
			values += ' $' + (i + 1) + (i < keys.length - 1 ? ',' : ')');
		}
		let arrayValues = Object.keys(params).map(function (key) {
			return params[key];
		});
		myQuery = myQuery.concat(values);
		myQuery = myQuery.concat('RETURNING *');

		return {
			query: myQuery,
			values: arrayValues
		};
	}

	const update = (tableName, params) => {
		let myQuery = `UPDATE ${process.env.DB_SCHEMA}.${tableName} SET `;
		let keys = Object.keys(params).filter(k => k != 'ID');
		let vals = [];
		for (let i = 0; i < keys.length; i++) {
			if (keys[i] != 'ID') {
				myQuery += '' + (keys[i] + " = " + ' $' + (i + 1)) + (i < keys.length - 1 ? ',' : '');
				vals.push(params[keys[i]])
			}
		}

		myQuery += " WHERE ID = $" + (vals.length + 1);
		myQuery = myQuery.concat(' RETURNING ID ');
		vals.push(params.ID)

		return {
			query: myQuery,
			values: vals
		};
	}

	const search = (table, options) => {
		let myQuery = `SELECT *  FROM ${process.env.DB_SCHEMA}.${table._tableName}  where 1 = 1`;
		let keys = Object.keys(options);
		let vals = [];


		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			myQuery += ' and ' + (table.getColumn(key)) + " = " + ' $' + (i + 1) + (i < keys.length - 1 ? ',' : '');
			vals.push(options[key]);
		}

		return {
			query: myQuery,
			values: vals
		};


	}


	return {
		insert, update, search, get, deleteById, list
	};
})();