//app.js
define([
	'common/dispatch',
	'router/router',
	'vendor/spin',
	'apps/userApp/userApp',
	'apps/reviewApp/reviewApp',
	'apps/adminApp/adminApp',
    'backbone', 
    'jquery',
	'bootstrap'
], function (
	dispatch,
	Router,
	Spinner,
	userApp,
	reviewApp,
	adminApp,
	Backbone
) {
	'use strict';
    /*
    PRIVATE VARIABLES:
    */
    var app;
    //miffBaseUrl and miffRoot were echoed out as globals by index.php
    var baseUrl = miffBaseUrl;
    var root = miffRoot;
	var router;
	var spinner;

    /*
    APP INITIALIZATION:
    */
    var app = {
		handleViewportResize: function () {
			var vHeight = $(window).height();
			var vWidth = $(window).width();
			//set height on film navigation
			

			if(vWidth < 780) {
				$("#filmsListWrapper").css({
					'min-height': 220,
					'max-height': 220
				});			
			}else{
				$("#filmsListWrapper").css({
					'min-height': vHeight - 50,
					'max-height': vHeight - 50
				});			
			}
			
		
		},
		initializeSpinner: function() {
			var opts = {
			  lines: 13 // The number of lines to draw
			, length: 0 // The length of each line
			, width: 14 // The line thickness
			, radius: 50 // The radius of the inner circle
			, scale: 1 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#000' // #rgb or #rrggbb or array of colors
			, opacity: 0 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 1 // Rounds per second
			, trail: 29 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '50%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
			}
			var target = document.getElementById('spinner');
			spinner = new Spinner(opts).spin(target);
		},
		spinOff: function () {
			$("#spinner").css("display", "none");
		},
		spinOn: function () {
			$("#spinner").css("display", "block");
		},
		
        start:  function () {
            var self = this;
            console.log("app started . . . ");
            console.log("miffUser: ", miffUser);
			//initialize the spinner
			self.initializeSpinner();			
            //initialize router
            router = new Router();
            //initialize history AFTER instantion of router(s)
            Backbone.history.start({
                pushState: true,
                root: root
            });
            
			userApp.initialize();
			reviewApp.initialize();

			
			$(window).resize(function() {
				self.handleViewportResize();
			});
			//run it even without a change to initialize
			this.handleViewportResize();
			
			//stop a links in nav bar from reloading page
			$("#mtoNav  a").on("click", function(e) {
				e.preventDefault();
			});
        }
    };
	
	/*ON */
	dispatch.on("app:initializeAdminApp", function () {
		adminApp.initialize();
	});
	//go to a route AND trigger the resulting function
	dispatch.on("app:navigateRouterTrigger", function(route){
		router.navigate(route, true);
	});
	//just navigate to a route, without triggering the function
	dispatch.on("app:navigateRouterNoTrigger", function(route) {
		router.navigate(route);
	});
	dispatch.on("app:spinOn", function() {
		app.spinOn();
	});
	dispatch.on("app:spinOff", function() {
		app.spinOff();
	});

	
	
    /* SETHANDLER: */
    dispatch.setHandler("app:getBaseUrl", function () {
        return baseUrl;
    });
	
	
  

	return app;
});

