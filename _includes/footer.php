
    <script src="<?= $page->getAsset('build/js/libs.min.js') ?>"></script>
    <script src="<?= $page->getAsset('build/js/production.min.js') ?>"></script>
    <script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"></script>

    <script>

        $("[data-ga]").click(function(){
            var gaLabel = $(this).data('ga');
            console.log('ga click:', gaLabel);
            if (gaLabel) ga('send', 'event', 'link', 'click', gaLabel);
        });

    </script>


    <!-- Facebook API -->
    <div id="fb-root"></div>

</body>
</html>
