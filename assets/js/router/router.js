//router
define ([
    'backbone',
    'common/dispatch',
    'common/defaults'
], function (
    Backbone,
    dispatch,
    defaults
) {
    'use strict'
	
    var Router = Backbone.Router.extend({
        routes: {
			""						:	"cleanUrl",
            "films/:year/:id"	: 	 "filmDetails", 
			"films/:year/" 		: 	"filmsByYear"
        },
        filmDetails: function (year, id) {
			var params = {
				year: year,
				filmId: id
			}
			
			dispatch.trigger("reviewApp:loadFilm", params)
				
			//dispatch.trigger("reviewApp:loadFilmDetail", id);
			
            
        },
		filmsByYear: function (year) {
			dispatch.trigger("reviewApp:loadYear", year);
		},
		cleanUrl: function () {
			//this fires if the user navigates straight to the site . . .it's the entry point
			this.navigate("/films/" + miffCurrentYear  + "/", true);
		}
    });
	

    return Router;

});