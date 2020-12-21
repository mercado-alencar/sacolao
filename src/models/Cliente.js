
const Model = require('@schirrel/pg-connection/Model');
class Cliente extends Model{
	constructor(args = {}){
	super("CLIENTE")
	this.addColumn('nome', 'NOME');
	this.addColumn('telefone', 'TELEFONE');
	this.addColumn('sacolao','SACOLAO');
	this.addColumn('endereco','ENDERECO');
	this.addColumn('numero','NUMERO');
	this.addColumn('referencia','REFERENCIA');
	this.addColumn('bairro','BAIRRO');
	this.addColumn('receber','RECEBER');
	this.addColumn('trocoPara','TROCO_PARA');
	this.addColumn('cartao','CARTAO');
	this.addColumn('obs','OBS');
	this.addColumn('data','DATA');
	this.addColumn('hora','HORA');
	
	this.setValues(args);
	}
}

module.exports = Cliente;