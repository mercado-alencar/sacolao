
const Base = require('pg-connection/Database/Model');
class User extends Base{
	constructor(args = {}){
	super("USER")
	this.addColumn('email', 'EMAIL');
	this.addColumn('username', 'USERNAME');
	this.addColumn('password', 'PASSWORD');
	this.setValues(args);
	}
}

module.exports = User;