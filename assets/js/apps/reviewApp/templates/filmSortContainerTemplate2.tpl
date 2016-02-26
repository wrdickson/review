<div>
	<button class="btn btn-default btn-sm pull-right" id="dataClose">Close</button>
	<button class="btn btn-default btn-sm pull-left" id="linq">Linq</button>
	
	<select id="genreFilterSelect">
		<option></option>
		<%
		$.each(genres, function(i,v){
			print( '<option value="' + v + '">' + v + '</option>' );
		});
		%>
	</select>
	<table id="reviewDataTable" class="table-striped table-bordered tablesorter paginated">
		<thead>
			<tr>
				<th>
					Film Name
				</th>
				<th>
					Genre
				</th>
				<th>
					Length
				</th>
				<th>
					Avg. Review
				</th>
				<th>
					Qty. Reviews
				</th>		
		</thead>
		<tbody id="sortContainerTBody">

		</tbody>	
	</table>

</div>