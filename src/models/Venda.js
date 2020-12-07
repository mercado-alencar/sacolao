
const Model =  require('@schirrel/pg-connection/Model');
class Cliente extends Model{
	constructor(args = {}){
	super("VENDA")
	this._addColumn('nome', 'NOME');
	this._addColumn('telefone', 'TELEFONE');
	this._addColumn('sacolao','SACOLAO');
	this._addColumn('compras','COMPRAS');
	this._addColumn('endereco','ENDERECO');
	this._addColumn('numero','NUMERO');
	this._addColumn('referencia','REFERENCIA');
	this._addColumn('bairro','BAIRRO');
	this._addColumn('receber','RECEBER');
	this._addColumn('levarTroco','LEVAR_TROCO');
	this._addColumn('trocoPara','TROCO_PARA');
	this._addColumn('cartao','CARTAO');
	this._addColumn('obs','OBS');
	this._addColumn('data','DATA');
	this._addColumn('hora','HORA');
	this._addColumn('entregue','ENTREGUE', false);
	
	this._setValues(args);
	}
}

module.exports = Cliente;