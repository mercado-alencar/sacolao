const Model =  require('@schirrel/pg-connection/Model');
class Sorteio extends Model{
	constructor(args = {}){
	super("SORTEIO")
	this._addColumn('nome', 'NOME');
	this._addColumn('telefone', 'TELEFONE');
	this._addColumn('data','DATA');
	
	this._setValues(args);
	}
}

module.exports = Sorteio;
