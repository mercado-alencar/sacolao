
module.exports = (() => {

    const conection = require('./conection');
    const utils = require('./utils');

    const client = conection.connectDB();

    async function encrypt(text) {
        let toString = new Buffer(text).toString("base64")
        return toString
    }

    async function decrypt(text) {
        let toString = new Buffer(text, "base64").toString("ascii")
        return toString

    }

    const get = async (id, decriptPassword) => {
        client = client || await conection.connectDB();
        let request = await client.request();
        request.input('id', utils.getType(id), id);
        const res = await request.query(`select * from ${conection.schema}.EMAIL where id = @id `);
        let response = await res.recordset[0];
        if (decriptPassword && response) {
            response.senha = await decrypt(response.senha);
        }
        return response || {};
    };

    const validatePasswordChange = async (model) => {
        let exist = await get(model.id);
        if (exist && exist.id) {
            let senhaAtual = exist.senha;
            let senhaAtualDescriptografada = await decrypt(exist.senha);
            if (senhaAtual == model.senha) {
                return senhaAtual;
            }
            else if (senhaAtualDescriptografada == model.senha) {
                return encrypt(senhaAtualDescriptografada)
            } else {
                return encrypt(model.senha)
            }
        } else {
            return encrypt(model.senha);
        }
    }

    const update = async (req) => {
        client = client || await conection.connectDB();
        let cripted = await validatePasswordChange(req.body);
        req.body.senha = cripted;

        let params = utils.updatetQueryBuilder(`${conection.schema}.SYSTEM`, req.body);
        client.query(params.string, params.values, (err, res) => {
            if (err) {
                throw err.stack;
            } else {
                return res;
            }
        });
    };

    const persist = async (req) => {
        req.body.id = 1;
        try {
            client = client || await conection.connectDB();

            let model = JSON.parse(JSON.stringify(req.body));
            let cripted = await validatePasswordChange(model);
            model.senha = cripted;
            let params = utils.insertQueryBuilder(`${conection.schema}.EMAIL`, model);
            client.query(params.string, params.values, (err, res) => {
                if (err) {
                    throw err.stack;
                } else {
                    return res;
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const save = async (req) => {
        let exist = await get(1);
        if (exist && exist.id) {
            return update(req);
        } else {
            return persist(req);
        }
    }
    return {
        get: get,
        update: update,
        save: save

    };
})();