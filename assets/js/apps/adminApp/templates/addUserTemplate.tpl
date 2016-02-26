<div style="max-width: 400px;">	
	<h4>Add New User</h4>
	<div>
		<label for="mUsername">Username:</label><br/>
		<input type="text" id="mUsername"><br/>
		<label for="mEmail">Email:</label><br/>
		<input type="text" id="mEmail"><br/>
		<label for="mPhone">Phone:</label><br/>
		<input type="text" id="mPhone"><br/>
		<label for="mPwd1">Password:</label><br/>
		<input type="text" id="mPwd1"><br/>
		<label for="mPwd2">Password again:</label><br/>
		<input type="text" id="mPwd2"><br/>
		<label for="mPerm">User permission:</label><br/>
		<select id="mPerm">
			<option value="0">select</option>
			<option value="1">Archived</option>
			<option value="3">Screener</option>
			<option value="7">Admin</option>
		</select>
		<h4><span id="mAlert" class="label label-warning" display="none"></span></h4>
	</div>
	<div class="modal-footer">
		<button id = "miffAddUserButton" type="button" class="btn btn-primary pull-left disabled" >Add User</button>
		<button id="mAddUserClose" type="button" class="btn btn-default pull-left" >Close</button>
	</div>
</div>