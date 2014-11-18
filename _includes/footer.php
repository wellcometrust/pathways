
    <script src="<?= $page->getAsset('build/js/libs.min.js') ?>"></script>
    <script src="<?= $page->getAsset('build/js/production.min.js') ?>"></script>
    <script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"></script>

    <script>
        $("a[rel$='external']").click(function() {
            var gaLabel1 = $(this).data('ga');
            ga('send', 'event', 'link', 'click', gaLabel1);
        });
        $("a[data-component$='library-panel']").click(function() {
            var gaLabel3 = $(this).data('ga');
            ga('send', 'event', 'link', 'click', gaLabel3);
        });
        $("circle[class$='inner']").click(function() {
            var gaLabel4 = $(this).data('ga');
            ga('send', 'event', 'link', 'click', gaLabel4);
        });

        $("a[data-component$='player-overlay']").click(function() {
            var gaLabel2 = $(this).data('ga');
            ga('send', 'event', 'link', 'click', gaLabel2);
        });
        $("div[class$='handle']").click(function() {
            var gaLabel5 = $(this).data('ga');
            ga('send', 'event', 'link', 'click', gaLabel5);
        });

        $("div[class$='further-reading']").click(function() {
            var gaLabel6 = $(this).data('ga');
            ga('send', 'event', 'link', 'click', gaLabel6);
        });
    </script>


    <!-- Facebook API -->
    <div id="fb-root"></div>

</body>
</html>
