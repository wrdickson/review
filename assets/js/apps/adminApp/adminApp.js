define([
	'common/dispatch',
	'bootstrap',
	'apps/adminApp/views/adminPanelView'


], function (
	dispatch,
	Bootstrap,
	AdminPanelView


){
	'use strict';
	var adminApp = {
		initialize: function () {
			console.log("adminApp initializes . . .");
			var self = this;
			//collapse dropdown in navbar
			$(".collapse").collapse('hide');
			//hide filmsList
			$("#filmsListWrapper").hide({
				done: function() {
					//wack anything in the workslate
					dispatch.trigger("closeWorkspaceView");
					self.loadAdminPanel();
				}
			});
			$("#mtoNav a").addClass("hidden");
		},
		loadAdminPanel: function () {
			var userModel = dispatch.trigger("userApp:getUserModel");
			var adminPanelView = new AdminPanelView(userModel);
			$("#workslateContent").html(adminPanelView.render().el);
		
		}
	
	};
	
	return adminApp;

});