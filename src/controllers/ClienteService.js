const Service = require('./Service');
const Cliente = require('../repository/models/Cliente');

class ClienteService extends Service {
	constructor () {
		super(Cliente)
	}
}


module.exports = ClienteService;