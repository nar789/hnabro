;(function(){

	module.exports = function(){

		function loadNodeModules() {
			_g={};//static global
			_g.express = require('express');
			_g.app = require('express')();
			_g.bodyParser = require('body-parser');
			_g.mysql = require('mysql');	
			_g.config = require('./../dbConfig');
		}

		function loadRoute() {
			var route = require('./Route.js')(_g);
			var provierRoute = require('./provider/Route.js')(_g);
			route.route();
			provierRoute.route();
		}

		function initialize(){
			var app=_g.app;
			app.set('view engine', 'ejs');
			app.engine('html', require('ejs').renderFile);
			app.use('/assets',_g.express.static(__dirname + '/../assets'));
			app.use(_g.bodyParser.urlencoded({
			    extended: true
			}));
			app.use(_g.bodyParser.json());
		}

		function doInBackend(){
			loadNodeModules();
			initialize();
			loadRoute();
		}

		return {
			doInBackend:doInBackend,
		}
	}

})();

