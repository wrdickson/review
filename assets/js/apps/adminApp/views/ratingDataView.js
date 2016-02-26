define([
	'backbone',
	'common/defaults',
	'common/dispatch',
	'tpl!apps/adminApp/templates/ratingDataContainerTemplate.tpl',
	'tpl!apps/adminApp/templates/ratingDataItemTemplate.tpl',
	'tpl!apps/adminApp/templates/reviewListTemplate.tpl',
	'tpl!apps/adminApp/templates/reviewListItemTemplate.tpl'
], function (
	Backbone,
	Defaults,
	dispatch,
	RatingDataContainerTemplate,
	RatingDataItemTemplate,
	ReviewListTemplate,
	ReviewListItemTemplate
){
	var RatingDataView = Backbone.View.extend({
		closeView: function () {
			this.remove();
		},
		events: {
			'click	.dataViewTitle'		:	'loadFilmInfo',
			'click	.dataViewReviews'	:	'loadReviewData'
		},
		initialize: function (filmArr) {
			this.filmArr = filmArr;
			console.log('filmArr', filmArr);
		},
		loadFilmInfo: function (e) {
			e.preventDefault();
			console.log($(e.target));
		},
		loadReviewData: function (e) {
			e.preventDefault();
			var iFilmId = $(e.target).attr("film-id");
			//clear the div
			$("modalReviewsContent").html("");
			//iterate through the films and show the reviews in the modal
			$.each(this.filmArr, function(i,film){
				if (film.id == iFilmId) {
					console.log("our film: ", film);
					$("#modalReviewsContent").html(ReviewListTemplate(film));
					$.each(film.reviews, function (i, review) {
						$("#modalReviewsList").append(ReviewListItemTemplate(review));
					
					});
				}
			});
			$("#modalReviews").modal();
		},
		render: function () {
			var self = this;
			this.$el.html(RatingDataContainerTemplate(this.filmArr));
			$.each(self.filmArr, function (i, film) {
				$iHtml = RatingDataItemTemplate(film);
				self.$("#sortContainerTBody").append($iHtml);			
			});
			return this;
		},
		sortByProperty: function(property) {
			// usage:  array.sort(sortByProperty('firstName'));
			return function (a, b) {
				var sortStatus = 0;
				if (a[property] < b[property]) {
					sortStatus = -1;
				} else if (a[property] > b[property]) {
					sortStatus = 1;
				}
				return sortStatus;
			};
		}		
	});
	
	return RatingDataView;

});
	