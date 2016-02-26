define([
	'backbone',
	'common/data',
	'common/dispatch',
	'tpl!apps/adminApp/templates/adminPanelTemplate.tpl',
	'apps/adminApp/views/addUserView',
	'apps/adminApp/views/manageUsersView',
	'apps/adminApp/views/ratingDataView',
	'datatables'

], function (
	Backbone,
	data,
	dispatch,
	AdminPanelTemplate,
	AddUserView,
	ManageUsersView,
	RatingDataView

) {
	var AdminPanelView = Backbone.View.extend({
        closeView: function () {
			//undo all the shit we did to disable normal operations
			$("#filmsListWrapper").show();
			$("#mtoNav a").removeClass("hidden");
			//TODO navigate back to year view . . .
            this.remove();
        },	
		events: {
			'click #adminPanelClose'			: 'closeView',
			'click #adminAddUser'				: 'fireAddUserView',
			'click #adminManageUsers'			: 'fireManageUsersView',
			'click #adminRatingData	'			: 'fireRatingData',
		},
		fireAddUserView: function () {
			var addUserView = new AddUserView();
			console.log("aUV", addUserView);
			//render 
			$("#adminWorkslate").html(addUserView.render().el);
		},
		fireManageUsersView: function () {
			//go to db and get usersJson
			$.when(data.getAllUsers()).done(function(usersJson){
				var manageUsersView = new ManageUsersView(usersJson);
				$("#adminWorkslate").html(manageUsersView.render().el);
			});
		},
		fireRatingData: function () {
			//first, get the data
			var year = dispatch.request("reviewApp:getSelectedYear");
			$.when(data.getFilmsWithReviews(year)).done(function(fData){
				//work the data to show average reviews and number of reviews
				//integrate review data into film data
				$.each(fData.films, function (i, film){
					//are there reviews?
					if(fData.reviews[film.id]){
						//attach reviews 
						fData.films[i].reviews = fData.reviews[film.id];
						//get the number
						fData.films[i].numReviews = fData.reviews[film.id].length;
						//calculate average review
						var rTotal = 0;
						$.each(fData.reviews[film.id], function (i,v) {
								rTotal += Number(v.rating);
						});
						fData.films[i].avgRating = rTotal / fData.reviews[film.id].length;
						//limit to two decimal places
						fData.films[i].avgRating = fData.films[i].avgRating.toFixed(2);
					}else{
						fData.films[i].reviews = [];
						fData.films[i].avgRating = 0;
						fData.films[i].numReviews = 0;
					}
				});
				//now that they're integrated, we can pass just the films to the view
				var ratingDataView = new RatingDataView(fData.films);
				$("#adminWorkslate").html(ratingDataView.render().el);
				var table = $("#reviewDataTable").DataTable();
			});
		},
		initialize: function (userModel) {
			console.log("adminPanelView initializes . . .");
			this.userModel = userModel;
		},
		render: function () {
			this.$el.html(AdminPanelTemplate(this.userModel));
			return this;
		}
	});
	
	return AdminPanelView

});