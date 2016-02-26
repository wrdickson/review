define([
	'backbone',
	'common/data',
	'common/dispatch',
	'tpl!apps/reviewApp/templates/userReviewListTemplate.tpl',
	'tpl!apps/reviewApp/templates/userReviewListItemTemplate.tpl'
], function (
	Backbone,
	data,
	dispatch,
	UserReviewListTemplate,
	UserReviewListItemTemplate
){
	'use strict';
	
	var UserReviewView = Backbone.View.extend({
        closeView: function () {			
            this.remove();
        },	
		events: {
		
		},
		initialize: function (userId, username, reviews) {
			this.listenTo(dispatch, "closeWorkspaceView", this.closeView);		
			var self = this;
			//no - this yields the logged in user
			this.userId = userId;
			this.username = username;
			self.reviews = reviews;
			//sort by film_name
			self.reviews.sort(function(a,b){
				var nameA = a.title.toLowerCase();
				var nameB = b.title.toLowerCase();
				if(nameA < nameB){
					return -1;
				}
				if(nameA > nameB){
					return 1;
				}
				return 0;
			});

		},
		//see php.js for this function
		nl2br: function nl2br (str, is_xhtml) {   
			var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
			return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
		},		
		render: function () {
			var self = this;
			console.log("rendering userReviewView . . .");
			this.$el.html(UserReviewListTemplate({username: self.username}));
			//iterate through the reviews			
			$.each(self.reviews, function(i, review) {
				console.log("ireveiw:", review);
				//convert newline to <br/>
				//clone the review . . . we don't want to change the actual data
				var iReview = JSON.parse(JSON.stringify(review));
				//now replace the newlines with <br/> on the .review property
				iReview.review = self.nl2br(iReview.review, true);
				//render
				
				var userReviewListItem = UserReviewListItemTemplate(iReview);
				self.$("#userReviewsDiv").append(userReviewListItem);
				
			
			});
			return this;
		}
	});
	
	return UserReviewView;

});