const Service = require('./Service');
const Venda = require('../repository/models/Venda');

class VendaService extends Service {
	constructor () {
		super(Venda)
	}
}


module.exports = VendaService;