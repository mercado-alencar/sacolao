
const Repository = require('@schirrel/pg-connection/Repository');
const Cliente = require('../models/Cliente');

class ClienteRepository extends Repository{
	constructor(){
		super(Cliente);
	}
}

module.exports = ClienteRepository;