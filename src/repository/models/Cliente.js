
const Base = require('./Base');
class Cliente extends Base{
	constructor(args = {}){
	super("CLIENTE")
	this._addColumn('nome', 'NOME');
	this._addColumn('telefone', 'TELEFONE');
	this._addColumn('sacolao','SACOLAO');
	this._addColumn('endereco','ENDERECO');
	this._addColumn('numero','NUMERO');
	this._addColumn('referencia','REFERENCIA');
	this._addColumn('bairro','BAIRRO');
	this._addColumn('receber','RECEBER');
	this._addColumn('trocoPara','TROCO_PARA');
	this._addColumn('cartao','CARTAO');
	this._addColumn('obs','OBS');
	this._addColumn('data','DATA');
	this._addColumn('hora','HORA');
	
	this._setValues(args);
	}
}

module.exports = Cliente;