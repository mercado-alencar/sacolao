const Database = require('../Database');
const queryBuilder = require('../QueryBuilder');
const logger = require('../../utils/logger');


class Base {
	constructor(tableName) {
		this.id = null;
		this._tableName = tableName;
		this._columns = { id: 'ID' };
		this._defaults = {  };
	}


	_setValues(vals) {
		for(let key in vals){
			if(this._columns[key]) {
				this[key] = vals[key];
			}	
		}

		for(let defs in this._defaults){
			if((typeof this[defs] === "undefined")) {
				this[defs] = this._defaults[defs];
			}	
		}
		
	}

	_addColumn(property, column, defaultVal) {
		this._columns[property] = column;
		if((typeof defaultVal !== "undefined")) this._defaults[property] = defaultVal;
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