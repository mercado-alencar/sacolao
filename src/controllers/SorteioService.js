const Service = require('./Service');
const SorteioRepository = require('../repository/SorteioRepository');

class SorteioService extends Service {
	constructor () {
		super(SorteioRepository)
	}
}


module.exports = SorteioService;