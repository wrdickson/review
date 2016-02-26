define([
    'backbone',
    'common/dispatch',
	'common/data',
	'common/defaults',
	'autosize',
    'tpl!apps/reviewApp/templates/filmDetailTemplate.tpl'
], function (
    Backbone,
    dispatch,
	data,
	Defaults,
	autosize,
    filmDetailTemplate
){
    var FilmDetailView = Backbone.View.extend({
		addReview: function () {
			var self = this;
			$("#modalContentAdd").modal();
			//make the textarea autosize-able using the autosize method
			autosize($("#reviewModalTextAdd"));
			//enable or disable the save button based on whether a star rating is selected
			$("#starRatingAdd").change(function() {
				self.handleStarRatingChangeAdd();
			});
		},
        closeView: function () {
			$("starRating").unbind();
            this.remove();
        },
		editReview: function() {
			var self = this;
			$("#modalContentEdit").modal();
			$("#modalContentEdit").on("shown.bs.modal", function () {
				//iterate through the reviews and find user's
				$.each(self.model.get("reviews"), function(i, review){
					if(review.reviewer == self.userModel.get("miffUserId")){
						//save the index of the reviewer's review
						self.reviewIndex = i;
						//set the select to reviewer's choice
						$("#starRatingEdit").val(review.rating);
						//set the text area
						$("#reviewModalTextA").val(review.review);
						//make the textarea autosize-able using the autosize method
						autosize($("#reviewModalTextA"));						
					
					}
				});
			});
		},
        events: {
            'click  #filmDetailClose'      : 'closeView',
			'click	#addReview'			: 'addReview',
			'click	#reviewSave'			: 'saveReview',
			'click	#editReview'			: 'editReview',
			'click	#reviewSaveEdit'		: 'updateReview'
        },
		handleStarRatingChangeAdd: function () {
			//don't let them save off if they haven't chosen properly
			if($("#starRatingAdd").val() > 0) {
				$("#reviewSave").removeClass("disabled");
			}else{
				$("#reviewSave").addClass("disabled");
			}
		},
        initialize: function (model){
            this.model = model;
            this.userModel = dispatch.request("userApp:getUserModel");
			this.listenTo(dispatch, "closeWorkspaceView", this.closeView);
        },
        render: function () {
            this.$el.html(filmDetailTemplate(this.model.toJSON()));
			
            return this;
        },
		saveReview: function () {
			var self = this;
			var params = {};
			params.rating = $("#starRatingAdd").val();
			params.review = $("#reviewModalTextAdd").val();
			params.film = this.model.toJSON();
			params.user = this.userModel.toJSON();
			$.when(data.saveNewReview(params)).done( function (response) {
				console.log("back from review save . .. ", response);
				if(response == true) {
					//close modal
					$("#modalContentAdd").modal('hide');
					//remove view
					//don't remove the view until modal is hidden!
					$("#modalContentAdd").on("hidden.bs.modal", function () {
						//reload film details
						dispatch.trigger("reviewApp:loadFilmDetails", self.model.get("id"));
						dispatch.trigger("reviewApp:reloadFilmList");
					});
					
				}
			});
		},
		updateReview: function () {
			var self = this;
			var params = {};
			params.rating = $("#starRatingEdit").val();
			params.review = $("#reviewModalTextA").val();
			params.film = this.model.toJSON();
			params.user = this.userModel.toJSON();
			$.when(data.updateReview(params)).done( function (response) {
				var that = self;
				console.log("back from review update . .. ", response);
				if(response.success == true) {
					//close modal
					$("#modalContentEdit").modal('hide');
					//remove view
					//don't remove the view until modal is hidden!
					$("#modalContentEdit").on("hidden.bs.modal", function () {
						//self.closeView();
					});
					//these stupid gymnastics are just to make sure the model is
					//correct, updated with new info
					var reviewerName = self.model.get('reviews')[self.reviewIndex].reviewer_name;
					var tempReviews = self.model.get('reviews');
					tempReviews[self.reviewIndex] = response.updatedReview;
					tempReviews[self.reviewIndex].reviewer_name = reviewerName;
					self.model.set("reviews", tempReviews);
				}else{
					//TODO handle failed save
				}
			});			
		}
    
    });
    return FilmDetailView;

});