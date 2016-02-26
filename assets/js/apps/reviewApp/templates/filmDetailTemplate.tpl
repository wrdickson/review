<div id="tableWrapper">
    <div id ="workslateToolbar">
        <button id="filmDetailClose" class="btn btn-default btn-sm">Close</button>
    </div>
    <table id="filmDetailTable" class="table table-striped table-condensed">
        <thead>
            <th class="col1" style="width: 20%"></th>
            <th class="col2" style="width: 80%"></th>
        
        </thead>
        <tbody id="filmDetailTbody">
            <tr>
                <td class="td-editable">Name:</td>
                <td><b><%-title%></b></td>
            </tr>
            <tr>
                <td>Review url:</td>
                <td><a href="<%-screener%>"><%-screener%></a></td>
            </tr>
            <tr>
                <td>Review password:</td>
                <td><%-screenerpass%></td>
            </tr>

        
        </tbody>
    </table>
</div>
<div id="modalContentEdit" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
			<button type="button" class="close btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title"><%-title%></h4>
			</div>
			<div class="modal-body" >
				<b>Rate this film:</b>
				<select id="starRatingEdit">
					<option value="1">1 Star</option>
					<option value="2">2 Stars</option>
					<option value="3">3 Stars</option>
					<option value="4">4 Stars</option>
					<option value="5">5 Stars</option>
				</select><br/><br/>
				<b>Write a review:</b>
				<textarea id="reviewModalTextA"></textarea>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" id="reviewSaveEdit" class="btn btn-primary">Save</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- -->
<div id="modalContentAdd" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title"><%-title%></h4>
			</div>
			<div class="modal-body" >
				<b>Rate this film:</b>
				<select id="starRatingAdd">
					<option value="-1">Rate</option>
					<option value="1">1 Star</option>
					<option value="2">2 Stars</option>
					<option value="3">3 Stars</option>
					<option value="4">4 Stars</option>
					<option value="5">5 Stars</option>
				</select><br/><br/>
				<b>Write a review:</b>
				<textarea id="reviewModalTextAdd"></textarea>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" id="reviewSave" class="btn btn-primary disabled">Save</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->