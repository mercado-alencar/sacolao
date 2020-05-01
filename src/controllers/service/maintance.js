module.exports = (() => {

    const databaseHelper = require('../database/database');
    const set = async (id) => {

        var system = await databaseHelper.system.get(id);
        if (!system) return 'erro';

        try {
            if (system.maintance == null) {
                system.maintance = true;
            } else {
                system.maintance = !system.maintance;
            }
            databaseHelper.system.maintance(id, system.maintance);

            return 'ok';
        } catch (err) {
            return 'erro';
        }
    };

    return {
        set: set
    };
})();