
const Repository = require('@schirrel/pg-connection/Repository');
const Venda = require('../models/Venda');

class VendaRepository extends Repository{
	constructor(){
		super(Venda);
	}
}

module.exports = VendaRepository;