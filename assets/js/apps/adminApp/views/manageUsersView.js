define([
	'backbone',
	'common/dispatch',
	'common/data',
	'tpl!apps/adminApp/templates/manageUsersTemplate.tpl',
	'apps/adminApp/views/editUserView',
	'apps/adminApp/views/changePasswordView'

], function (
	Backbone,
	dispatch,
	data,
	ManageUsersTemplate,
	EditUserView,
	ChangePasswordView

){

	var IUser = Backbone.Model.extend({
		save: function () {
			$.when(data.updateUser(this.toJSON())).done(function(response){
				if(response == true){
					//$("#mMessage").html("Updated . . .");
					//setTimeout(function(){dispatch.trigger("filmListApp:loadManageUsersView");},1000);
					
				}
			});
		},
		initialize: function () {
			this.on("change", function() {
				console.log("model changedii", this);
				this.save();
			});
		}
	
	});
	var IUserCollection = Backbone.Collection.extend({
		model: IUser
	});

	var ManageUsersView = Backbone.View.extend({
		changePassword: function(model) {
			//fire change password screen
			var changePasswordView = new ChangePasswordView(model);
			this.$("#mWorkslate").html(changePasswordView.render().el);
		},
		closeView: function () {
			this.remove();
		},
		events: {
			'click		.mUserSelect'		:	'selectUser',
			'click		#vClose'			:	'closeView'
		},
		initialize: function (usersJson) {
			var self = this;
			this.userCollection = new IUserCollection();
			$.each(usersJson, function(i, v){
				var iPerson = new IUser(v);
				self.userCollection.add(iPerson);
			});
			dispatch.on("ManageUsersView:fireChangePassword", function(model){
				self.changePassword(model);
			});
		
		},
		render: function () {
			var self = this;
			this.$el.html(ManageUsersTemplate());
			$.each(this.userCollection.models, function(i, model){
				//console.log("iModel", model);
				self.$("#usersTbody").append("<tr><td class='mUserSelect' miff-user-id = " + model.get("id") +">" + model.get("username") + "</td></tr>");
				$("#mUsersTable").css("max-width", "200px");
			});
			return this;
		},
		selectUser: function (e) {
			var userId = $(e.target).attr("miff-user-id");
			//remove active class from others
			$("#mUserSelect").removeClass("active");
			//add active class to this
			$(e.target).addClass("active");
			console.log("firing eUV");
			var editUserView = new EditUserView(this.userCollection.where({id: userId})[0]);
			this.$("#mWorkslate").html(editUserView.render().el);
		}
	});
	

	
	return ManageUsersView;

});