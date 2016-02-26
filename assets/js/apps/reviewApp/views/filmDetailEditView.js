define([
    'backbone',
    'common/dispatch',
	'common/defaults',
    'tpl!apps/filmListApp/templates/filmDetailEditTemplate.tpl'
    
], function (
    Backbone,
    dispatch,
	Defaults,
    filmDetailEditTemplate
){
	'use strict';
    var FilmDetailEditView = Backbone.View.extend({
        closeView: function () {
            this.remove();
        },
        events: {
            'click  #filmDetailClose'       : 'closeView',
            'click  #filmEditSave'          : 'filmEditSave'
        },
        filmEditSave: function () {
            console.log("debug save");
            //scrape the new values from the view
            var n = {};
            n.film_name = $("#feFilmName").val();
            n.review_url = $("#feReviewUrl").val();
            n.review_pwd = $("#feReviewPwd").val();
            n.festival_year = $("#feYearSelect").val();
			n.film_length = $("#feLength").val();
			n.genre = $("#feGenre").val();
            n.short_synopsis = $("#feShortSynopsis").val();
            n.long_synopsis = $("#feLongSynopsis").val();
            n.website = $("#feWebsite").val();
            n.executive_director = $("#feExecutiveDirector").val();
            n.director = $("#feDirector").val();
            n.director_other = $("#feDirectorOther").val();
            n.executive_producer = $("#feExecutiveProducer").val();
            n.producer = $("#feProducer").val();
            n.producer_other = $("#feProducerOther").val();
            n.music = $("#feMusic").val();
            n.sound = $("#feSound").val();
            n.writing = $("#feWriting").val();
            n.other_credits = $("#feOtherCredits").val();
            n.press_kit = $("#fePressKit").val();
            n.press_links = $("#fePressLinks").val();
            n.special_instructions = $("#feSpecialInstructions").val();
            n.terms = $("#feTerms").val();
            //set
            this.model.set(n);
			//HACK - remove the hacked in genres attribute
			//  this attribute was added so the template would have the default genres - Defaults.genres
			this.model.unset("genres");
            this.model.save();
            
        },
        initialize: function (model) {
            this.model = model;
            
        },
        render: function () {
			//hack default genres into the model for the template to render select options
			this.model.set("genres", Defaults.genres);			
            this.$el.html(filmDetailEditTemplate(this.model.toJSON()));

            return this;
        }
        
    });
    
    return FilmDetailEditView;


});