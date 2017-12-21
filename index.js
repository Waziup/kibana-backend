"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const Keycloak = require('keycloak-connect');
const session = require('express-session');
const httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer()


//Create app and router
const app = express();
const router = express.Router();

//Log every API call 
router.use(function(req, res, next) {
    console.log('%s URI: %s PATH: %s', req.method, req.url, req.path);
    console.log('  Headers:' + JSON.stringify(req.headers));
    next();
});

//Create memory store and session to store user credentials server side
var memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));


//Add keycloak middleware to handle request authentication
const keycloak = new Keycloak({store: memoryStore}, 
    {
    serverUrl: config.keycloakUrl,
    realm:     config.keycloakRealm,
    clientId:  config.keycloakClientId,
    public: true,
    bearerOnly: false
});
console.log('keyc:' + JSON.stringify(keycloak))

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
}));

console.log(JSON.stringify(keycloak))

//install routes
app.all("/*", keycloak.protect(), function(req, res){
  console.log(req.method + ' : ' + req.url);
  console.log('kibanaUrl: ' + config.kibanaUrl);
  //req.url = req.url.replace('/kibana','');
  apiProxy.web(req, res, { target: config.kibanaUrl });
  apiProxy.on('error', function(e) { 
    console.log('Error: ' + e);
     
  });
  console.log('after');
});

async function run() {
    await app.listen(config.port);
    console.log('Listening on port ', config.port);
}

run();
