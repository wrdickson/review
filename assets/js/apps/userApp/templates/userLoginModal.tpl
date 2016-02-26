<!--testModal.tpl-->
<div id="userLoginModal" class="modal fade">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Moab I.F.F. Login</h4>
            </div>
            <div class="modal-body">
                <label for="miffUserName">Username:</label><br/>
                <input type="text" id="miffUserName"><br/>
                <label for="miffUserPwd">Password:</label><br/>
                <input type="text" id="miffUserPwd"><br/>
                <h4><span id="miffLoginAlert" class="label label-warning" display="none"></span></h4>
            </div>
            <div class="modal-footer">
                <button id = "miffLoginButton" type="button" class="btn btn-primary" >Login</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>