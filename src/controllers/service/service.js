module.exports = (() => {
    const fetcher = require('./fetcher');
    const system = require('./system');
    const databaseHelper = require('../database/database');

    const maintanceMode = async (sys) => {
        var systems = await databaseHelper.system.all();
        var stored = systems.find(s => s.id == sys.id);
        return stored.maintance;
    };

    const request = (sys) => {
        fetcher.fetchMe(sys, function (response) {
            databaseHelper.info.save(sys, response);
            if (response.status != 200 && !maintanceMode(sys)) {
                setTimeout(
                    () => { request(sys); }, 180000);
            }
        });
    };

    const requests = async () => {
        let systems = await databaseHelper.system.all();
        systems.forEach(async (sys) => {
            if (!sys.maintance) {
                request(sys);
            }

        });
    };

    const _requests = async (id) => {
        var systems = await databaseHelper.system.all();
        var system = systems.find(s => s.id == id);
        request(system);
    };

    const start = () => {
        databaseHelper.connectDB();
    };
    return {
        start: start,
        requests: requests,
        request: _requests,
        system: system
    };
})();