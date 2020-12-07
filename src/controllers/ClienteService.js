const Service = require('./Service');
const ClienteRepository = require('../repository/ClienteRepository');

class ClienteService extends Service {
	constructor () {
		super(ClienteRepository)
	}
}


module.exports = ClienteService;