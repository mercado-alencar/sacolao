const Service = require('./Service');
const VendaRepository = require('../repository/VendaRepository');

class VendaService extends Service {
	constructor () {
		super(VendaRepository)
	}
}


module.exports = VendaService;