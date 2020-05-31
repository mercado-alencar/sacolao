
const Base = require('./Base');
class Cliente extends Base{
	constructor(args = {}){
	super("CLIENTE")
	this._addColumn('nome', 'NOME');
	this._addColumn('telefone', 'TELEFONE');
	
	this._setValues(args);
	}
}

module.exports = Cliente;