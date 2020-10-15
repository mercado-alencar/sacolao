/**
 TODO Utilizar https: //www.npmjs.com/package/js-hibernate
 **/

module.exports = (() => {
    return {
        User: require('./models/User'),
        Cliente:  require('./models/Cliente'),
        Venda:  require('./models/Venda'),
        Sorteio:  require('./models/Sorteio')
    };
})();
