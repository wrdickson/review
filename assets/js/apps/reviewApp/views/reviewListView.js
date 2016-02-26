define([
	'backbone',
	'common/dispatch',
	'tpl!apps/reviewApp/templates/reviewListTemplate.tpl',
	'tpl!apps/reviewApp/templates/reviewListItemTemplate.tpl'
], function (
	Backbone,
	dispatch,
	ReviewListTemplate,
	ReviewListItemTemplate
){
	var ReviewListItem = Backbone.View.extend({
		initialize: function (review) {
			this.data = review;
		},
		render: function () {
			this.$el.html(ReviewListItemTemplate(this.data));
			return this;
		}
	});

	var ReviewListView = Backbone.View.extend({
        closeView: function () {			
            this.remove();
        },		
		events:{
			'click			.reviewerSelect'		:	'showUserReviews'
		},
		initialize: function (model) {
			this.model = model;
			this.listenTo(dispatch, "closeWorkspaceView", this.closeView);				
		},
		//see php.js for this function
		nl2br: function nl2br (str, is_xhtml) {   
			var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
			return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
		},
		render: function () {
			var self = this;
			//sort by star rataing
			var reviews = self.model.get("reviews");
			reviews.sort(function(a, b){return b.rating - a.rating});
			
			this.$el.html(ReviewListTemplate(this.model.toJSON()));
			$.each(reviews, function (i, review) {
				//convert newline to <br/>
				//clone the object  . . . we don't want to change the actual data
				var iReview = JSON.parse(JSON.stringify(review));
				//convert newline to <br>
				iReview.review  = self.nl2br(iReview.review, true);
				var reviewListItem = new ReviewListItem(iReview);
				//self.$("#reviewTBody").append(reviewListItem.render().el);
				self.$("#reviewTBody").append(ReviewListItemTemplate(iReview));
			});			
			return this;
		},
		showUserReviews: function (e) {
			var params = {
				userId: $(e.target).attr("reviewer-id"),
				username: $(e.target).attr("reviewer-name")
			}
			console.log("tar:", e.target);
			console.log("n", $(e.target).attr("reviewer-name"));
			dispatch.trigger("reviewApp:loadUserReviews", params);
			//this is called from a click event on a href . . . don't let it refresh
			return false;
		}
	});
	
	return ReviewListView;

});
	