define([
    'backbone',
    'common/dispatch',
    'common/data',
    'tpl!apps/reviewApp/templates/filmListTemplate.tpl',
    'tpl!apps/reviewApp/templates/filmListItemTemplate.tpl'
], function (
    Backbone,
    dispatch,
    data,
    FilmListTemplate,
    FilmListItemTemplate
){

    
    var FilmItemView = Backbone.View.extend({
        tagName: 'li',
        role: 'presentation',
        render: function () {
            this.$el.html(FilmListItemTemplate(this.model.toJSON()));
            return this;
        }
    });
    var FilmListView = Backbone.View.extend({
	
        tagName: 'ul',
        events: {
            'click  .film-select'        : 'selectFilm'
        },
        className: 'nav nav-pills nav-stacked',
		closeView: function () {
			this.remove();
		},
        initialize: function (collection) {
            var self = this;
            this.collection = collection;
			dispatch.on("filmListView:remove", function() {
				self.closeView();
			});
            
        },
        render: function () {
            var self = this;
			//attach userId to each film so template can check if user has reviewed
			var userId = dispatch.request("userApp:getUserModel").get("miffUserId");
            this.collection.each(function(film){
				//set userHasReviewed
				film.set("userHasReviewed", false);
				$.each(film.get("reviews"), function (i,v){
					if(v == userId){
						film.set("userHasReviewed", true);
					}
				});
				var filmItemView = new FilmItemView({model:film});
                self.$el.append(filmItemView.render().el);
            }, this);
            return this;
        },
        selectFilm: function (e) { 
			e.preventDefault();
            var filmId = $(e.target).attr("film-id");
            dispatch.trigger("reviewApp:loadFilmDetails", filmId);
		    //now set the url with the router, no trigger
		    var selectedYear = dispatch.request("reviewApp:getSelectedYear");
		    dispatch.trigger("app:navigateRouterNoTrigger", "films/" + selectedYear + "/" + filmId);
        }
	
    });
    
    return FilmListView;

});