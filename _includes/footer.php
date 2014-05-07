    
    <script src="../_assets/js/lib/jquery-2.1.0.min.js"></script>
    <script src="../_assets/js/lib/hammer.min.js"></script>
    
    <script src="../_assets/js/lib/greensock/TweenMax.min.js"></script>
    <script src="../_assets/js/lib/jquery.scrollmagic.js"></script>

    <script>
        // global nav
        var $nav_container  = document.querySelector('.global-navigation .container'),
            $nav_handle     = document.querySelector('.global-navigation .handle');

        $nav_handle.addEventListener('click', function() {
            if( $nav_container.classList.contains('active') )
                $nav_container.classList.remove('active');
            else
                $nav_container.classList.add('active');
        });
    </script>
    
    <script src="../_assets/js/main.js"></script>

</body>
</html>
