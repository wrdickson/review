
<a class="film-select" film-id = "<%-id%>" href=""><%-title%><span class="badge pull-right"><%-reviews.length%></span>
	
	
	<span class="pull-right">
	<%
		if(userHasReviewed == true){
			print('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
		};
	%>
	
	</span>
	
	
	</a>

