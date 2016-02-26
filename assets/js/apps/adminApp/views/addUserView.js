define([
	'backbone',
	'common/dispatch',
	'common/data',
	'tpl!apps/adminApp/templates/addUserTemplate.tpl'

], function (
	Backbone,
	dispatch,
	data,
	AddUserTemplate

){
	var AddUserView = Backbone.View.extend({
		addUser: function() {
			var self = this;
			var ret = this.validateInputs();
			console.log("ret:", ret);
			if (ret.pass == true) {
				console.log("fir");
				var name = $("#mUsername").val();
				var pwd = $("#mPwd1").val();//they've passed validation
				var perm = $("#mPerm").val();
				var email = $("#mEmail").val();
				var phone = $("#mPhone").val();
				$.when(data.addNewUser(name, pwd, perm, email, phone)).done(function(response){
					console.log("back from add user: ", response);
					if(response == true) {
						//tell the user
						$("#mAlert").html("User has been created.");
						//clear the inputs
						self.clearInputs();
						//disable the save button
						$("#miffAddUserButton").addClass("disabled");
					}
				});			
			}else{
				$("#mAlert").html(ret.errorMsg);
			}
		},
		checkUserPerm: function () {
			if($("#mPerm").val() > 0 ) {
				$("#miffAddUserButton").removeClass("disabled");
			}else{
				$("#miffAddUserButton").addClass("disabled");
			}
		},
		clearInputs: function () {
			$("#mUsername").val("");
			$("#mPwd1").val("");
			$("#mPwd2").val("");
			$("#mEmail").val("");
			$("#mPhone").val("");
			$("#mPerm").val("0");
		},
		closeView: function () {
			this.remove();
		},
		events: {
			'change 	#mPerm'					:	'checkUserPerm',
			'click		#miffAddUserButton'	:	'addUser',
			'click		#mAddUserClose'		:	'closeView'
		},
		initialize: function () {
		
		},
		render: function () {
			this.$el.html(AddUserTemplate());
			return this;
		},
		validateInputs: function () {
			var ret = {
				errorMsg: "",
				pass: true
			}
			var uName = $("#mUsername").val();
			var pwd1 = $("#mPwd1").val();
			var pwd2 = $("#mPwd2").val();
			var email = $("#mEmail").val();
			var phone = $("#mPhone").val();
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
			if(uName.length < 6 ){
				ret.pass = false;
				ret.errorMsg += "Username too short.   ";				
			};
			return ret;			
		}
	});
	
	return AddUserView;

});