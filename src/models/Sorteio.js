const Model =  require('@schirrel/pg-connection/Model');
class Sorteio extends Model{
	constructor(args = {}){
	super("SORTEIO")
	this.addColumn('nome', 'NOME');
	this.addColumn('telefone', 'TELEFONE');
	this.addColumn('data','DATA');
	
	this.setValues(args);
	}
}

module.exports = Sorteio;
