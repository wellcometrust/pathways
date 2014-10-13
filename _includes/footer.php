    
    <script src="<?php echo asset('build/js/libs.min.js') ?>"></script>
    <script src="/_assets/animations/magnetised-trees/tree2.js"></script>
    <script src="<?php echo asset('build/js/production.js') ?>"></script>
    <script id="embedWellcomePlayer" src="/wellcomeplayer/js/embed.js"></script>

    <!-- Facebook API -->
    <div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=1494497634145827&version=v2.0";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>

		
	<!-- Google+ API -->
	<script >
	  window.___gcfg = {
	    parsetags: 'onload'
	  };
	</script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>

	<!-- Pinerest API -->
	<!-- Please call pinit.js only once per page -->
	<script type="text/javascript" async src="//assets.pinterest.com/js/pinit.js"></script>
	
	<!-- Twitter API -->  
	<script type="text/javascript" async src="//platform.twitter.com/widgets.js"></script>
</body>
</html>
