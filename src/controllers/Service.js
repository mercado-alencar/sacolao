
const logger = require('../utils/logger');

class Service {
	constructor(repository) {
		this.repository = repository;
		this.logger = logger;
	}
	async get(id) {
		return await repository.get(id);
	}
	async save(model) {
		return await repository.save(model);
	}
	async update(model) {
		return await repository.update(model);
	}

	async delete(id) {
		// let entity = new this.table({id:id});
		// return await entity.delete();
		return await repository.delete(id);
	}
	async list() {
		let result = await repository.list();
		result = result.map(item => new this.table(item));

		return result;
	}

	async search(options) {
		let result = await repository.search(options);
		result = result.map(item => new this.table(item));

		return result;
	}
	async paginate(options) {
		//TODO
	}
}


module.exports = Service;