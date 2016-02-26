define ([
    'common/dispatch',
    'jquery'
], function (
    dispatch
) {
    
    var data = {
		addNewUser: function (name, pwd, perm, email, phone) {
			var deferred = $.Deferred();
			dispatch.trigger("app:spinOn");			
            $.ajax({
                method: "post",
                data: {
                    name: name,
					pwd: pwd,
					perm: perm,
					email: email,
					phone: phone
                },
                url: data.getBaseUrl() + "api/users/",
                success: function (data) {
                    deferred.resolve(data);
                },
				complete: function () {
					dispatch.trigger("app:spinOff");				
				},
                dataType: 'json'
            });
            return deferred.promise(); 			
		},
		getAllUsers: function () {
            var deferred = $.Deferred();
			dispatch.trigger("app:spinOn");				
            $.ajax({
                method: "GET",
                data: {},
                url: data.getBaseUrl() + "api/users/",
                success: function (data) {
                    deferred.resolve(data);
                },
				complete: function () {
					dispatch.trigger("app:spinOff");
				},
                dataType: 'json'
            });
            return deferred.promise(); 		
		},
        getBaseUrl: function () {
            return dispatch.request('app:getBaseUrl')
        },
        getFilmList: function (year) {
			dispatch.trigger("app:spinOn");
            var deferred = $.Deferred();
            $.ajax({
                method: "GET",
                data: {
                    "year": year
                },
                url: data.getBaseUrl() + "api/films/",
                success: function (data) {
					//iterate through the films and attach array of ids of reviews
					$.each(data.films, function (i,film){
						var  hasReview = false;
						$.each(data.reviews, function(filmId, reviews){
							if(filmId == film.id) {
								film.reviews = reviews;
								hasReview = true;
							}
						});
						if(hasReview == false){
							film.reviews = [];
						}
					});
                    deferred.resolve(data);
                },
				complete: function (){
					dispatch.trigger("app:spinOff");				
				},
                dataType: 'json'
            });
            return deferred.promise();   
        },
		getFilmReviews: function(filmId) {
			dispatch.trigger("app:spinOn");		
            var deferred = $.Deferred();
            $.ajax({
                method: "GET",
                
                url: data.getBaseUrl() + "api/reviews/" + filmId,
                success: function (data) {
					dispatch.trigger("app:spinOff");				
                    deferred.resolve(data);
                },
				error: function(error) {
					dispatch.trigger("app:spinOff");					
				},
                dataType: 'json'
            });
            return deferred.promise();			
		},
		getFilmsWithReviews: function (year) {
			dispatch.trigger("app:spinOn");
            var deferred = $.Deferred();
            $.ajax({
                method: "GET",
                data: {
                    "year": year
                },
                url: data.getBaseUrl() + "api/reviewdata/",
                success: function (data) {
                    deferred.resolve(data);
                },
				complete: function (){
					dispatch.trigger("app:spinOff");				
				},
                dataType: 'json'
            });
            return deferred.promise();  		
		},
		getUserReviews: function (userId) {
            var deferred = $.Deferred();
            $.ajax({
                method: "GET",
                data: {
                    "userId": userId
                },
                url: data.getBaseUrl() + "api/reviews/user/" + userId,
                success: function (data) {
                    deferred.resolve(data);
                },
                dataType: 'json'
            });
            return deferred.promise();		
		},
		saveNewReview: function (params) {
			var deferred = $.Deferred();
			$.ajax({
				method: 'post',
				data: params,
				url: data.getBaseUrl() + "api/reviews/",
				success: function (response) {
					deferred.resolve(response);
				},
				dataType: 'json'
			});
			return deferred.promise();
		},
		updateReview: function (params) {
			var deferred = $.Deferred();
			$.ajax({
				method: 'post',
				data: params,
				url: data.getBaseUrl() + "api/reviews/" + params.film.id,
				success: function (response) {
					deferred.resolve(response);
				},
				dataType: 'json'
			});
			return deferred.promise();		
		},
		updateUser: function (userJson){
			var deferred = $.Deferred();
			$.ajax({
				method: 'post',
				data: userJson,
				url: data.getBaseUrl() + "api/users/" + userJson.id,
				success: function (response) {
					deferred.resolve(response);
				},
				dataType: 'json'
			});
			return deferred.promise();			
		},
		updateUserPassword: function(userId, newPwd){
			console.log("userId", userId, "newPwd", newPwd);
			var kddd = {
				pwd: newPwd,
				userId: userId
				
			};
			var deferred = $.Deferred();
			$.ajax({
				method: 'post',
				data: kddd,
				url: data.getBaseUrl() + "api/users/" + userId,
				success: function (response) {
					deferred.resolve(response);
				},
				dataType: 'json'
			});
			return deferred.promise();	
		}
    }

    return data;
});