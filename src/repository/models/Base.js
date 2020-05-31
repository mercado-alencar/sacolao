const Database = require('../Database');
const queryBuilder = require('../QueryBuilder');
const logger = require('../../utils/logger');


class Base {
	constructor(tableName) {
		this.id = null;
		this._tableName = tableName;
		this._columns = { id: 'ID' };
	}


	_setValues(vals) {
		if (!vals) return;
		for (let key in vals) {
			try {
			//this[this._columns[key]] = vals[key];
			this[key] = vals[key];
			} catch(err) {
				logger.error(err)
			}
		}
	}

	_addColumn(property, column) {
		this._columns[property] = column;
	}

	_getColumn(property) {
		return this._columns[property];
	}

	getColumn(property) {
		return this._columns[property];
	}
	_createPersistObject() {
		let obj = {};

		for (var col in this._columns) {
			obj[this._columns[col]] = this[col];
		}
		if (obj[this._columns.id] === null) {
			delete obj[this._columns.id];
		}
		return obj;
	}

	async _persist(persistObject) {
		try {
			const res = await Database.query(persistObject.query, persistObject.values);
			return res && res.rows && res.rows[0];
		} catch (err) {
			logger.error(err);
			err.erro = 'ERRO';
			return err;
		}
	}

	async get(id) {
		const res = await Database.query(queryBuilder.get(this._tableName), [id]);
		let response = await res.rows[0];
		return response || {};
	}
	async save() {
		let obj = this._createPersistObject()
		let toPersist = queryBuilder.insert(this._tableName, obj);
		return await this._persist(toPersist);
	}
	async update() {
		let obj = this._createPersistObject()
		let toPersist = queryBuilder.update(this._tableName, obj);
		return await this._persist(toPersist);
	}

	static async deleteById(id) {
		let query = queryBuilder.deleteById(this._tableName);
		const res = await Database.query(query, [id]);
		let response = await res.rows[0];
		return response || {};
	}
	async delete() {
		return await this.deleteById(this.id);
	}

	async list() {
		const res = await Database.query(queryBuilder.list(this._tableName), []);
		let response = await res.rows;
		return response;

	}
	 async search(options) {
		const params = queryBuilder.search(this, options);
		logger.debug(params.query)
		const res = await Database.query(params.query, params.values);
		let response = await res.rows;
		return response;
	}
	static async paginate(options) {
		//TODO
	}
}
module.exports = Base;