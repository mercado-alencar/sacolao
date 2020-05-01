/**
 TODO Utilizar https: //www.npmjs.com/package/js-hibernate
 **/

module.exports = (() => {
    const dotenv = require('dotenv');
    dotenv.config();

    const info = process.env.DB === 'pg' ? require('./postgres/info') : process.env.DB === 'mssql' ? require('./mssql/info') : null;
    const system = process.env.DB === 'pg' ? require('./postgres/system') : process.env.DB === 'mssql' ? require('./mssql/system') : null;
    const email = process.env.DB === 'pg' ? require('./postgres/mail') : process.env.DB === 'mssql' ? require('./mssql/mail') : null;
    return {
        info: info,
        system: system,
        email: email
    };
})();