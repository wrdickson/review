<div class="row" style="margin-left: 0px !important; margin-right: 0px !important">
	<div class = "col-md-2 col-sm-3 col-xs-4" style="font-size: 10px">
		<%
		if (rating == 1) {
			print ('</span><span class="glyphicon glyphicon-star"></span>');
		};
		if (rating == 2) {
			print ('<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>');
		};	
		if (rating == 3) {
			print ('<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>');
		};	
		if (rating == 4) {
			print ('<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>');
		};	
		if (rating == 5) {
			print ('<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>');
		};	
		%>
	</div>
	<div class = "col-md-2 col-sm-3 col-xs-4">
		<a class="reviewerSelect" href="" reviewer-name = "<%-reviewer_name%>" reviewer-id = "<%-reviewer%>"><%-reviewer_name%></a>
	</div>
	<div clasx="col-md-2 col-sm-3 col-xs-4">
		<%
			var shortdate = last_update.substring(0,10);
		%>
		<%-shortdate%>
	</div>
	<div class = "col-md-8 col-sm-6 col-xs-12">
		<%=review%>
	</div>
	<div class="col-md-12 col-sm-12 col-xs-12">
		<hr/>
	</div>
	
</div>