
const logger = require('../utils/logger');

class Service {
	constructor(repository) {
		this.repository = new repository();
		this.logger = logger;
	}
	async get(id) {
		return await this.repository.get(id);
	}
	async create(model) {
		return await this.repository.create(model);
	}
	async update(model) {
		return await this.repository.update(model);
	}

	async delete(id) {
		// let entity = new this.table({id:id});
		// return await entity.delete();
		return await this.repository.delete(id);
	}
	async list() {
		let result = await this.repository.list();
		result = result.map(item => new this.table(item));

		return result;
	}

	async search(options) {
		let result = await this.repository.search(options);
		result = result.map(item => new this.table(item));

		return result;
	}
	async paginate(options) {
		//TODO
	}
}


module.exports = Service;