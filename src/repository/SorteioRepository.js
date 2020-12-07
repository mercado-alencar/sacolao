
const Repository = require('@schirrel/pg-connection/Repository');
const Sorteio = require('../models/Sorteio');

class SorteioRepository extends Repository{
	constructor(){
		super(Sorteio);
	}
}

module.exports = SorteioRepository;