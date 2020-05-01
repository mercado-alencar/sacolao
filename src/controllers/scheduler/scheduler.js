module.exports = (() => {

    const cron = require('node-cron');
    const service = require('../service/service');

    const logger = require('../../utils/logger');

    const start = () => {
        service.requests();
        cron.schedule(' */10 * * * *', () => {
            logger.info('Running requests');
            service.requests();
        });
    };
    return {
        start: start
    };
})();