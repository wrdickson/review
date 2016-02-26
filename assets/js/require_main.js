//require_main.js
requirejs.config({
  //var mtoBaseUrl was passed in via PHP in index.php
  waitSeconds: 200,
  baseUrl: "http://localhost/filmReview1/assets/js",
  paths: {
    backbone: "vendor/backbone",
    jquery: "vendor/jquery",
    json2: "vendor/json2",
    text: "vendor/text",
    tpl: "vendor/underscore-tpl",
    underscore: "vendor/underscore",
    bootstrap: "vendor/bootstrap/dist/js/bootstrap.min",
	datatables: "vendor/DataTables/DataTables-1.10.10/js/jquery.dataTables", //works
	tablesorter: "vendor/tablesorter/jquery.tablesorter",
	linq: "vendor/linq.js_ver2.2.0.2/jquery.linq",
	validate: "vendor/jquery-validation-1.15.0/jquery.validate",
	autosize: "vendor/autosize"
  },
  shim: {
    bootstrap: {
        deps: ["jquery"]
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    tpl: {
        deps: ["text"]
    },
	datatables: {
		deps: ["jquery"]
	},
	tablesorter: {
		deps: ["jquery"]
	},
	linq: {
		deps: ["jquery"]
	},
	validate: {
		deps: ["jquery"]
	},
	autosize: {
		exports: "autosize"
	}
		
  }
});
require(["app"], function(app){
  app.start();
});
