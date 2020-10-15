const routers = require('./router/routers');
const express = require('express');
const app = express();
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const logger = require('./utils/logger');

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.headers['content-type'] === 'application/json;' || !req.headers['content-type']) {
    req.headers['content-type'] = 'application/json';
  }
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
           
  if (req.method === 'OPTIONS') {
    return res.status(204).send();
  }

  return next();
});

app.use('/api',routers);
app.listen(process.env.PORT,()=>{
    logger.info(`App started at ${process.env.PORT}`);
})


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile('./public/index.html', { root: __dirname });
});
