<div>	
	<h4>Edit User</h4>
	<h3 id="mMessage" style="color: green"></h3>	
	<div>
		<label for="mUsername">Username:</label><br/>
		<input type="text" value="<%-username%>"id="mUsername"><br/>
		<label for="mEmail">Email:</label><br/>
		<input type="text" id="mEmail" value="<%-email%>"><br/>
		<label for="mPhone">Phone:</label><br/>
		<input type="text" id="mPhone" value="<%-phone%>"><br/>
		<label for="mPerm">User permission:</label><br/>
		<select id="mPerm">
			<option value="1">Archived</option>
			<option value="3">Screener</option>
			<option value="8">Admin</option>
		</select>
		<h4><span id="mAlert" class="label label-warning" display="none"></span></h4>
	</div>
	<div>
		<button id = "mEditUser" type="button" class="btn btn-default pull-left" >Update User</button>
		<button id = "mChangeUserPwd" type="button" class="btn btn-default pull-left" >Change Password</button><br><br>
		<button id = "mCancelUser" type="button" class="btn btn-default pull-left" >Cancel</button>
	</div>
</div>