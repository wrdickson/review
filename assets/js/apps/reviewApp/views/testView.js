define([
	'backbone',
	'tpl!apps/filmListApp/templates/testContainerTemplate.tpl',
	'validate'
], function (
	Backbone,
	TestContainerTemplate
){


	var TModel = Backbone.Model.extend({
		urlRoot: miffBaseUrl + "api/tmodel/",
		initialize: function () {
		
		}
	
	});

	var TestView = Backbone.View.extend({
		tagName: 'div',
		events: {
		
		},
		initialize: function () {
			console.log("initializing . . . ");
			//works sending GET
			/*
			var tModel = new TModel({id: 6});
			tModel.fetch({
				success: function (response) {
					console.log("response:", response);
				}
			
			});
			*/
			
			//works as a PUT (for updating a model
			/*
			var tModel = new TModel({
				id: 1,
				a: 1,
				b: 2
			});
			tModel.save({
				success: function (response) {
					console.log("response:", response);
				}
			})
			*/
			
			//works as a POST (for adding a model
			/*			
			var tModel = new TModel({
				a: 1,
				b: 2
			});
			tModel.save({
				success: function (response) {
					console.log("response:", response);
				}
			})
			*/
			
			var tModel = new TModel({
				id: 78,
				a: 1,
				b: 2
			});
			tModel.destroy({
				success: function (model, response) {
					console.log("model:", model, "response:", response);
				}
			})			
			
			
		},
		render: function () {
		
			var self = this;
			this.$el.html(TestContainerTemplate());
			return this;
		},
		submit: function () {
			console.log("submit from view");
		},
		//this is called outside the view after it has been inserted into the DOM
		onRender: function () {
			var self = this;
			$("#commentForm").validate({
				rules: {
					name: {
						required: true,
						minlength: 2,
						maxlength: 5					
					},
					email: {
						required: true,
						email: true
					}
					
				},
				errorClass: "validateErr",
				submitHandler: function () {
					self.submit();
				}
			});
			//probably a good convention here
			return this;
		}
	});
	
	return TestView;

});