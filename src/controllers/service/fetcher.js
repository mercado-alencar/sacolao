module.exports = (() => {
    const fetch = require('node-fetch');
    const mailer = require('../mail/mailer');
    const logger = require('../../utils/logger');

    let last = {
        date: new Date(),
        status: ''
    };
    const handlers = (sys, last, erro, callback) => {
        last.response = new Date();
        last.status = erro.status || 'Erro';
        last.error = erro.status ? JSON.stringify(erro.message) : erro.toString();
        logger.error((new Date()) + ': Ocorreu um erro na requisicao para: ' + sys.name + '. Erro: ' + (last.error ? last.error : last.status));
        if (!sys.maintance) {
            mailer.sendError(sys, last);
        }
        else {
            logger.info((new Date()) + ': ' + sys.name + ' em manutenção.');
        }

        callback && callback(last);
    };

    const fetchNow = async (sys, callback) => {
        last.request = new Date();
        try {
            fetch(sys.request_url).then((response) => {
                if (response.status == 200) {
                    last.status = response.status;
                    last.response = new Date();
                    callback && callback(last);
                } else {
                    handlers(sys, last, response, callback);
                }
            }).catch((e) => {
                handlers(sys, last, e, callback);
            });
        } catch (e) {
            handlers(sys, last, e, callback);
        }


    };
    const fetchMe = async (sys, callback) => {
        fetchNow(sys, callback);

    };
    return {
        fetchNow: fetchNow,
        fetchMe: fetchMe
    };
})();