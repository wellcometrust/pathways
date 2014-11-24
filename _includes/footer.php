
    <script src="<?= $page->getAsset('build/js/libs.min.js') ?>"></script>
    <script src="<?= $page->getAsset('build/js/production.min.js') ?>"></script>
    <script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"></script>

    <script>
        var selectors = ["a[rel$='external']", "a[data-component$='library-panel']",
            "div[class$='handle']", "circle[class$='inner']",
            "a[data-component$='player-overlay']", "div[class$='further-reading']",
            "li[class$='twitter']", "li[class$='pinterest']"];

        var gaCLickHandler = function(){
            var gaLabel = $(this).data('ga');
            if (gaLabel) ga('send', 'event', 'link', 'click', gaLabel);
        };

        selectors.forEach(function(selector){ $(selector).click(gaCLickHandler);});

    </script>


    <!-- Facebook API -->
    <div id="fb-root"></div>

</body>
</html>
