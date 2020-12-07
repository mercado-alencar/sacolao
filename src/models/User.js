
const Base = require('pg-connection/Database/Model');
class User extends Base{
	constructor(args = {}){
	super("USER")
	this._addColumn('email', 'EMAIL');
	this._addColumn('username', 'USERNAME');
	this._addColumn('password', 'PASSWORD');
	this._setValues(args);
	}
}

module.exports = User;