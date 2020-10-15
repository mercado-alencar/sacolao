const Base = require('./Base');
class Sorteio extends Base{
	constructor(args = {}){
	super("SORTEIO")
	this._addColumn('nome', 'NOME');
	this._addColumn('telefone', 'TELEFONE');
	this._addColumn('data','DATA');
	
	this._setValues(args);
	}
}

module.exports = Sorteio;
