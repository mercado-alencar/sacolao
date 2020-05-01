const routers = require('./router/routers');
const scheduler = require('./controllers/scheduler/scheduler');
const express = require('express');
const app = express();
const logger = require('./utils/logger');
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your port is ${process.env.PORT}`)

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile('./public/index.html', { root: __dirname });
});


routers.start(app);
logger.info('Router setted');
