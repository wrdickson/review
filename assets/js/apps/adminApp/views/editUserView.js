define([
	'backbone',
	'common/data',
	'common/dispatch',
	'tpl!apps/adminApp/templates/editUserTemplate.tpl'

], function (
	Backbone,
	data,
	dispatch,
	EditUserTemplate
	
){
	var EditUserView = Backbone.View.extend({
		changePassword: function () {
			console.log("trig");
			dispatch.trigger("ManageUsersView:fireChangePassword", this.model);
			this.closeView();
		},
		closeView: function () {
			this.remove();
		},
		events: {
			'click		#mEditUser'			: 'updateUser',
			'click		#mChangeUserPwd'	: 'changePassword',
			'click		#mCancelUser'		: 'closeView'
		},
		initialize: function (model) {
			this.model = model;
		},
		render: function () {
			this.$el.html(EditUserTemplate(this.model.toJSON()));
			this.$("#mPerm").val(this.model.get("permission"));
			return this;
		},
		updateUser: function () {
			var self = this;
			var ret = this.validateInputs();
			console.log("ret:", ret);
			if (ret.pass == true) {
				console.log("fir");
				var name = $("#mUsername").val();
				var perm = $("#mPerm").val();
				var email = $("#mEmail").val();
				var phone = $("#mPhone").val();
				console.log("ready to save");
				//change the model . .. this should fire change and reburn
				this.model.set({
					username : $("#mUsername").val(),
					permission : $("#mPerm").val(),
					email : $("#mEmail").val(),
					phone : $("#mPhone").val()				
				});
				
				
			}else{
				$("#mAlert").html(ret.errorMsg);
			}
		
		},
		validateInputs: function () {
			var ret = {
				errorMsg: "",
				pass: true
			}
			var uName = $("#mUsername").val();
			var email = $("#mEmail").val();
			var phone = $("#mPhone").val();
			//TODO - more more more validation
			//passwords match
			if(uName.length < 6 ){
				ret.pass = false;
				ret.errorMsg += "Username too short.   ";				
			};
			return ret;			
		}		
	});
	
	return EditUserView;

});