const Service = require('./Service');
const Sorteio = require('../repository/models/Sorteio');

class SorteioService extends Service {
	constructor () {
		super(Sorteio)
	}
}


module.exports = SorteioService;
