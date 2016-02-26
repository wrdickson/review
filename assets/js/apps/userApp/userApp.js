//userApp.js
define([
    'backbone',
    'common/dispatch',
    'tpl!apps/userApp/templates/userLoginModal.tpl',
	'jquery'
], function (
    Backbone,
    dispatch,
    userLoginModal
) {
    
    //PRIVATE VARIABLES:
    var baseUrl;
    var userModel;
    
    var UserModel = Backbone.Model.extend({
        initialize: function(){
            this.on("change", function () {
                dispatch.trigger("userModel:change", this);
            });
        },
        login: function () {
            var self = this;
            var param = {};
            //scrape the inputs . . . 
            param.username = $("#miffUserName").val();
            param.password = $("#miffUserPwd").val();
			dispatch.trigger("app:spinOn");
            //send off the request . . . 
            $.ajax({
                url: miffBaseUrl + "api/login/",
                type: "GET",
                data: param,
                dataType: "json",
                success: function (data) { 
					dispatch.trigger("app:spinOff");
                    //TODO: handle a failed login, not just error as below . . . 
                    if(data.id > 0){
                        //login passes  ... continue .
						//close any workspace views
						dispatch.trigger("closeWorkspaceView");
						//reload filmList
						dispatch.trigger("reviewApp:reloadFilmList");
                        $("#userLoginModal").modal("hide");
                        //reload the model
                        self.set({
                            "miffUserId": data.id,
                            "miffUserKey": data.key,
                            "miffUserName": data.username,
                            "miffUserPerm": data.permission
                        });
                        userApp.setMenuToUser();
                    } else { 
                        //login failed
                        //alert the modal
                        $("#miffLoginAlert").html("Login Failed");
                        $("#miffLoginAlert").slideDown("slow");
                    }
                },
                error: function (error) {
					dispatch.trigger("app:spinOff");
                }
            }, this);                   
        },
        logoff: function () {
			dispatch.trigger("closeWorkspaceView");
            var self = this;
            $.ajax({
                url: baseUrl + "api/logoff",
                data: this.toJSON(),
                success: function(d) {
                    console.log("logoff response: ", d);
                    //remove user dropdown
                    self.setToGuest();
                },
                error: function() {
                    self.setToGuest();
                },
				complete: function () {
					//reload filmList
					dispatch.trigger("reviewApp:reloadFilmList");				
				},
                dataType: "json"
            });
        },
        setToGuest: function () {
            this.set({
                "miffUserId": 0,
                "miffUserKey": 0,
                "miffUserPerm": 0,
                "miffUserName": "Guest"
            });
            userApp.setMenuToLogin();
			$(".collapse").collapse('hide');
        }
    });    

    var userApp = {
        userModel: {},
        initialize: function () {
            console.log("userApp initializes . . . ");
            baseUrl = dispatch.request("app:getBaseUrl");
            this.userModel = new UserModel();
            this.userModel.set(miffUser);
            //set the menu appropriately
            //attach events
            $("#miffLoginA").on("click", function (e) {
				
				$(".collapse").collapse('hide');
				userApp.fireLoginModal();
			});               
            $("#userLogoff").on("click", function (e) {
				$(".collapse").collapse('hide');
				
                userApp.userModel.logoff();
            });            
            
            if(this.userModel.get("miffUserId") > 0 ) {
                //render
                this.setMenuToUser();
            } else {
                this.setMenuToLogin();
            }

        },
        fireLoginModal: function() {
			console.log("firing loginModal");
            //clean out the dialog div
            $("#dialogRegion").html('');
            //get the template into html
            var html1 = userLoginModal();
            //load the region
            $("#dialogRegion").html(html1);
            //render the modal, firing the Bootstrap modal() ftn
            $("#userLoginModal").modal("show");
            //attach event
            $("#miffLoginButton").on("click", function () {
                userApp.userModel.login();
            });
			
        },
        setMenuToLogin: function () {
            //show the nav section
            $("#miffLoginNav").removeClass("hidden");
            
            //attach event to button
            $("#miffLogin").on("click", this.fireLoginModal);
            //hide the user nav dropdown
            $("#miffUserNav").addClass("hidden");
            //remove username from menu <a> element
            $("#userNavA").html("");
			//hide admin toggle
			$("#adminToggleLi").addClass("hidden");
        },
        setMenuToUser: function () {
            //hide login
            $("#miffLoginNav").addClass("hidden");
            //inject username
            $("#userNavA").html(userApp.userModel.get("miffUserName") + "<b class='caret'></b>");
            //remove hidden class
            $("#miffUserNav").removeClass("hidden")
            //clear old events
            $("#userLogoff").unbind();
            //attach events
            $("#userLogoff").on("click", function (e) {
				//reapply preventDefault(), since we just unbound it . . . 
				e.preventDefault();
                userApp.userModel.logoff();
            });  
			//show the admin link if user has perms
			if(this.userModel.get("miffUserPerm") > 7){
				$("#adminToggleLi").removeClass("hidden");
			}else{
				$("#adminToggleLi").addClass("hidden");	
			}
        }
    }
    
    dispatch.setHandler("userApp:getUserModel", function() {
        return userApp.userModel;
    });
    
    return userApp;

});