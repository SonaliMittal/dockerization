// Add module dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
//const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
// const commonConf = require('./common/config');
// const appConf = commonConf.services.sample;
// let mongoConf = commonConf.databases.mongodb;

// Add custom dependencies
const config = require('./config/config');
const sampleRoutes = require('./routes/routes');
const authVerifier = require('./helpers/auth-verifier.helper');

// process.env.JWT_SECRET = commonConf.JWT_SECRET || config.JWT_SECRET;
// process.env.RESOURCE_ID = appConf.resourceId || config.resourceId;

// appConf.port = appConf.port || config.PORT;
// appConf.appName = appConf.appName || config.APP_NAME;
// appConf.apiBase = appConf.apiBase || config.API_BASE;

// Init dbConnection
if(config.LOCAL != 'no') mongoConf = {};
let dbUrl;
let dbConf = {
    "hostname" :  config.MONGO.hostname,
    "port": config.MONGO.port,
    "username" :  config.MONGO.username,
    "password" :  config.MONGO.password,
    "replicaSet":  config.MONGO.replicaSet,
    "dbName":config.MONGO.dbName
};
if(dbConf.username != '' || dbConf.password != ''){
    //dbUrl = `mongodb://${dbConf.username}:${dbConf.password}@${dbConf.hostname}:${dbConf.port}/${dbConf.dbName}`;
    dbUrl = `mongodb://${dbConf.username}:${dbConf.password}@${dbConf.hostname}/${dbConf.dbName}`;
    if(dbConf.replicaSet){
        dbUrl += `?replicaSet=${dbConf.replicaSet}`;
    }
    mongoose.connect(dbUrl, { 
        "auth" : { "authSource": "admin" },
        "useNewUrlParser" : true, 
        "useUnifiedTopology" : true 
    });
}else{
    dbUrl = `mongodb://${dbConf.hostname}/${dbConf.dbName}`;
    mongoose.connect(dbUrl, { 
        "useNewUrlParser" : true, 
        "useUnifiedTopology" : true 
    });
}
console.log(dbUrl,"-------------------------");
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB Successfully.");
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});
mongoose.connection.on('disconnected', () => {
    console.error("Mongodb is disconnected");
});
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});
mongoose.connection.on('error', (error) => {
    console.log('MongoDB error :: ' + error);
});

// App Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.setTimeout(100000); //10 secs
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With, content-type, Authorization');
    res.setTimeout(300000,function(){
        res.status(408).json({success:false, message:"Request has timed out."})
    });
    next();
});


app.use(cors());
app.use(helmet.noCache())
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

// Add swagger api-docs
const swaggerDocument = require('./swagger.json');
const options = {
    customCss: '.swagger-ui .topbar { display: none }'
};
// app.use(`${appConf.apiBase}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Add service routes
//app.use(authVerifier);
app.use(sampleRoutes);

// Hanlde uncaughtExceptions here to prevent termination
process.on('uncaughtException', function(error) {
    console.log("uncaughtException :: ", error);
    console.error((new Date).toUTCString() + ' uncaughtException Message :: ', error.message);
});

// Run the microservice app
app.listen(config.PORT, () => {
	console.log(`${config.APP_NAME} is running on ${config.PORT} Port`);
});
