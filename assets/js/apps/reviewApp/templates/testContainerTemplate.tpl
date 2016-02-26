<form class="cmxform" id="commentForm" method="get" action="">
  <fieldset>
    <legend>Please provide your name, email address (won't be published) and a comment</legend>
		<p>
			<label for="cname">Name (required, at least 2 characters)</label><br/>
			<!--<input id="cname" name="name" minlength="2" type="text" required>-->
			<input id="cname" name="name" type="text">
		</p>
		<p>
			<label for="cemail">E-Mail (required)</label><br/>
			<input id="cemail" name="email">
		</p>
		<p>
			<label for="curl">URL (optional)</label><br/>
			<input id="curl" type="url" name="url"><br/>
		</p>
		<p>
			<label for="ccomment">Your comment (required)</label><br/>
			<textarea id="ccomment" name="comment" required></textarea>
		</p>
		
			<input id="testSubmit" class="submit" type="submit" value="Submit">
    
  </fieldset>
</form>