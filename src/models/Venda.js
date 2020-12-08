
const Model =  require('@schirrel/pg-connection/Model');
class Cliente extends Model{
	constructor(args = {}){
	super("VENDA")
	this.addColumn('nome', 'NOME');
	this.addColumn('telefone', 'TELEFONE');
	this.addColumn('sacolao','SACOLAO');
	this.addColumn('compras','COMPRAS');
	this.addColumn('endereco','ENDERECO');
	this.addColumn('numero','NUMERO');
	this.addColumn('referencia','REFERENCIA');
	this.addColumn('bairro','BAIRRO');
	this.addColumn('receber','RECEBER');
	this.addColumn('levarTroco','LEVAR_TROCO');
	this.addColumn('trocoPara','TROCO_PARA');
	this.addColumn('cartao','CARTAO');
	this.addColumn('obs','OBS');
	this.addColumn('data','DATA');
	this.addColumn('hora','HORA');
	this.addColumn('entregue','ENTREGUE', false);
	
	this.setValues(args);
	}
}

module.exports = Cliente;