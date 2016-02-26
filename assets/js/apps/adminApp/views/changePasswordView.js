define([
	'backbone',
	'common/dispatch',
	'common/data',
	'tpl!apps/adminApp/templates/changePasswordTemplate.tpl'
], function (
	Backbone,
	dispatch,
	data,
	ChangePasswordTemplate
){
	var ChangePasswordView = Backbone.View.extend({
		changePassword: function () {
			var ret = this.validateInputs();
			console.log("ret:", ret);
			if (ret.pass == true){
				
				$.when(data.updateUserPassword(this.model.get("id"), $("#mPwd1").val())).done(function(response){
					console.log("re", response);
					if(response == true){
						$("#mAlert").html("<h3 style='color: green'>Password updated . . .</h3>");
						setTimeout(function(){dispatch.trigger("filmListApp:loadManageUsersView");},1000);					
					}else{
					
					}
				});	
				
			}else{
				$("#mAlert").html(ret.errorMsg);
			}
		},
		closeView: function () {
			//remove active from selected
			$(".mUserSelect").removeClass("active");
			this.remove();
		},
		events: {
			'click			#mCancel'		: 'closeView',
			'click			#mChangePwd'	: 'changePassword'
		},
		initialize: function (model) {
			this.model = model;
		},
		render: function () {
			this.$el.html(ChangePasswordTemplate(this.model.toJSON()));
			return this;
		},
		validateInputs: function () {
			var ret = {
				errorMsg: "",
				pass: true
			}
			var pwd1 = $("#mPwd1").val();
			var pwd2 = $("#mPwd2").val();
			//TODO - more more more validation
			//passwords match
			if(pwd1 != pwd2) {
				ret.pass = false;
				ret.errorMsg += "Passwords don't match.   ";
			};
			if(pwd1.length < 6 || pwd2.length < 6) {
				ret.pass = false;
				ret.errorMsg += "Password too short.   ";			
			};
			return ret;			
		}		
	});
	
	return ChangePasswordView;

});