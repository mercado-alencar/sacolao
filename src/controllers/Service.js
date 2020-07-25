
const logger = require('../utils/logger');

class Service {
	constructor(table) {
		this.table = table;
		this.logger = logger;
	}
	async get(id) {

		let entity = new this.table();
		return await entity.get(id);
	}
	async persist(persistObject) {
		//TODO
	}
	async save(model) {
		let entity = new this.table(model);
		return await entity.save();
	}
	async update(model) {
		let entity = new this.table(model);
		return await entity.update();
	}

	async delete(id) {
		// let entity = new this.table({id:id});
		// return await entity.delete();
		return await this.table.deleteById(id);
	}
	async list() {
		let entity = new this.table();
		return await entity.list();

	}

	async search(options) {
		let entity = new this.table();
		return await entity.search(options);

	}
	async paginate(options) {
		//TODO
	}
}


module.exports = Service;