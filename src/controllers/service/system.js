module.exports = (() => {
    const database = require('../database/database');


    const save = async (req) => {
        let result = await database.system.save(req);
        return result;
    }
    const get = async (id) => {
        let result = await database.system.get(id);
        return result;
    }
    const list = async () => {
        let result = await database.system.all();
        return result;
    }
    const remove = async (id) => {
        let result = await database.system.remove(id);
        return result;
    }
    const update = async (req) => {
        let result = await database.system.update(req);
        return result;
    }

    return {
        save: save,
        get: get,
        list: list,
        remove: remove,
        update: update
    };
})();