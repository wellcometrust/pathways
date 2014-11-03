    
    <script src="<?= $page->getAsset('build/js/libs.min.js') ?>"></script>
    <script src="/_assets/animations/magnetised-trees/tree2.js"></script>
    <script src="<?= $page->getAsset('build/js/production.min.js') ?>"></script>
    <script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"></script>

    <script>
      $("a[rel$='external']").each(function(index) {
        gaLabel = $(this).attr('data-ga');
        linkOnClick = "ga('send', 'event', 'link', 'click', gaLabel);"
        $(this).attr("onClick", linkOnClick);
      });
      $("a[data-component$='player-overlay']").each(function(index) {
        gaLabel = $(this).attr('data-ga');
        linkOnClick = "ga('send', 'event', 'link', 'click', gaLabel);"
        $(this).attr("onClick", linkOnClick);
      });
      $("a[data-component$='library-panel']").each(function(index) {
        gaLabel = $(this).attr('data-ga');
        linkOnClick = "ga('send', 'event', 'link', 'click', gaLabel);"
        $(this).attr("onClick", linkOnClick);
      });
    </script>


    <!-- Facebook API -->
    <div id="fb-root"></div>
	
</body>
</html>
