define ([
	'common/dispatch',
	'common/data',
	'apps/reviewApp/views/filmListView',
	'apps/reviewApp/views/filmDetailView',
	'apps/reviewApp/views/reviewListView',
	'apps/reviewApp/views/userReviewView',
	'autosize'


], function (
	dispatch,
	data,
	FilmListView,
	FilmDetailView,
	ReviewListView,
	UserReviewView,
	autosize

) {
	'use strict';
	//local properties
	var filmCollection;
	var filmDetailView;
	var filmListView;
	var selectedYear;
	
	
    var FilmModel = Backbone.Model.extend({
		initialize: function () {
		
		},
		
		save: function () {
			var self = this;
			//if this is a save, we want an id on the url, if it's an add
			//we want no id appended (there will be no id on the new film model
			if(self.get("id") > 0) {
				var url = miffBaseUrl + "api/films/" + self.get("id");
			};
			if(self.get("id") == undefined) {
				var url = miffBaseUrl + "api/films/";
			};
			$.ajax({
				type: 'post',
				url: url,
				data: self.toJSON(),
				dataType: 'json',
				success: function (response) {
					console.log("response:", response);
					//if it was an add, close the screen
					if(filmAddView){
						filmAddView.closeView();
					};
					dispatch.trigger("filmListApp:loadFilmByYear");
				}
			});
		}        
    });
    
    var FilmCollection = Backbone.Collection.extend({
        model: FilmModel
    });

	//app definition
	var reviewApp = {
		loadFilmDetails: function (filmId) {
			var self = this;
			var film;
			var iUser = dispatch.request("userApp:getUserModel");
			
			//get the model
			$.each(filmCollection.models, function(index, film){
				if(film.get("id") == filmId){

					//load the detail view
					filmDetailView = new FilmDetailView(film);
					$("#workslateContent").html(filmDetailView.render().el);
					//set the genre field to the correct
					//$("#fdGenre").html(Defaults.genres[film.get("genre")]);
					//autosize textareaa
					autosize($("#filmDetailTbody textarea"));
					//get reviews for this film and offer appropriate button options
					$.when(data.getFilmReviews(filmId)).done(function(reviews){
						//add the reviews to the film model (for editing functions)
						film.set("reviews", reviews);				
						//add a rate button (or a see my rating button)
						if(iUser.get("miffUserPerm") > 2){
							//iterate through the reviews and see if this user has one
							var userHasRated = false;
							$.each(reviews, function(i, review){
								if (review.reviewer == iUser.get("miffUserId")){
									userHasRated = true;
								}
							});
							if(userHasRated == true){
								//present the edit review button
								$("#workslateToolbar").append("<button class='btn btn-default btn-sm' id='editReview'>Edit My Review</button>");
							}else{
								//present the review this film button
								$("#workslateToolbar").append("<button class='btn btn-default btn-sm' id='addReview'>Review This Film</button>");
							};
						}
						//render reviews button . . .
						if(reviews.length > 0) {
							$("#workslateToolbar").append("<button class='btn btn-default btn-sm' id='loadFilmReviews'>See reveiws (" + reviews.length +") </button>");
							$("#loadFilmReviews").on("click", function() {
								self.loadReviews(film);
							});
						}
					});
				}
			});
		},
		//this ftn is used when a user navigates directly to the film (via the router)
		loadFilm: function (year, filmId) {
			//since we're coming in straight, need to set year
			//if user is back buttoning from admin panel, this needs fixed:
			$("#filmsListWrapper").show();
			$("#mtoNav a").removeClass("hidden");			
			selectedYear = year;
			var self = this;
			//first, get the film info and render the filmListView
			$.when(data.getFilmList(year)).done(function (response) {
				//build the collection
				filmCollection = new FilmCollection();
				if(response.films.length > 0){
					$.each(response.films, function (i, v) {
						var iFilm = new FilmModel(v);
						filmCollection.add(v);
					});
					filmListView = new FilmListView(filmCollection);
					$("#filmListView").html(filmListView.render().el);					
				} else {
					$("#filmListView").html("<h4>No films for " + year + ".</h4>");
				}
				$("#yearSelect").html("Festival Year " + year + '<b class="caret">');
				//once this is done we can load film details
				self.loadFilmDetails(filmId);
				//now we need to change the class on the filmListView to active
			});
		},		
		
		loadFilmsByYear: function () {
			//close anything in the workspace
			dispatch.trigger("closeWorkspaceView");
			$.when(data.getFilmList(selectedYear)).done(function (response) {
				//build the collection
				filmCollection = new FilmCollection();
				if(response.films.length > 0){
					$.each(response.films, function (i, v) {
						var iFilm = new FilmModel(v);
						filmCollection.add(v);
					});
					filmListView = new FilmListView(filmCollection);
					$("#filmListView").html(filmListView.render().el);					
				} else {
					$("#filmListView").html("<h4>No films for " + selectedYear + ".</h4>");
				}
				$("#yearSelect").html("Festival Year " + selectedYear + '<b class="caret">');
				
			});
		},
		initialize: function () {
			console.log("reviewApp initailizes . . . ");
			/*
			*events on menu
			*/
			$(".mYearSelect").on("click", function (e) {
				e.preventDefault();
				var year = $(e.target).attr("fyear");
				$(".collapse").collapse('hide');
				dispatch.trigger("closeWorkspaceView");
				dispatch.trigger("app:navigateRouterTrigger", "/films/" + year + "/");
			});
			$("#adminToggleA").on("click", function(e){
				e.preventDefault();
				dispatch.trigger("app:initializeAdminApp");
			});
		},
		loadReviews: function (film) {
			var reviewListView = new ReviewListView(film);
			$("#workslateContent").html(reviewListView.render().el);		
		},
		loadUserReviews: function(userId, username){
			$.when(data.getUserReviews(userId)).done(function(response){
				console.log("userId: ", userId);
				console.log("username:", username);
				console.log("rev:", response.reviews);
				var userReviewView = new UserReviewView(userId, username, response.reviews);
				$("#workslateContent").html(userReviewView.render().el);				
			});			
		},
		reloadFilmList: function () {
			$.when(data.getFilmList(selectedYear)).done(function (response) {
				//build the collection
				filmCollection = new FilmCollection();
				if(response.films.length > 0){
					$.each(response.films, function (i, v) {
						var iFilm = new FilmModel(v);
						filmCollection.add(v);
					});
					filmListView = new FilmListView(filmCollection);
					$("#filmListView").html(filmListView.render().el);					
				} else {
					$("#filmListView").html("<h4>No films for " + selectedYear + ".</h4>");
				}
			});
		}

	
	}
	
	dispatch.setHandler("reviewApp:getSelectedYear", function () {
		return selectedYear;
	});
	dispatch.on("reviewApp:loadFilm", function (params){
		reviewApp.loadFilm(params.year, params.filmId);
	});
	dispatch.on("reviewApp:loadFilmDetails", function(filmId) {
		reviewApp.loadFilmDetails(filmId);
	});
	dispatch.on("reviewApp:loadUserReviews", function(params) {
		//params.userId = user id; params.username = username
		reviewApp.loadUserReviews(params.userId, params.username);
	});
	dispatch.on("reviewApp:loadYear", function (year) {
		//set local variable
		selectedYear = year;
		reviewApp.loadFilmsByYear();
	});
	dispatch.on("reviewApp:reloadFilmList", function () {
		reviewApp.reloadFilmList();
	});
	
	
	return reviewApp;

});