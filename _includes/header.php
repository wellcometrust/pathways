<?php    
    function asset($location) {
        return '/_assets' . ( strpos($location, '/') != 0 ? '/' . $location : $location);
    }

    function pattern($pattern, $library_content = '') {
        global $docRoot;

        include($docRoot . '/patterns/' . $pattern . '.php' );
    }
?>
<!DOCTYPE HTML>
<html lang="en"> 
<head>
    <meta charset="utf-8"> 
    <title>Pathways: The Mind</title>

    <meta name="viewport" content="initial-scale=1,width=device-width">

    <link rel="stylesheet" href="//f.fontdeck.com/s/css/VWVFQa58PbJBMqY5yx0LaLm3Wok/<?php echo $_SERVER['SERVER_NAME'] ?>/44200.css" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<?php echo asset('build/css/main.css') ?>">

    <script>
        // Cuts the mustard
        var cuts_the_mustard = (document.querySelectorAll) ? true : false;

        // Load webfonts
        // WebFontConfig = { fontdeck: { id: '44200' } };

        // (function() {
        //   var wf = document.createElement('script');
        //   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        //   '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        //   wf.type = 'text/javascript';
        //   wf.async = 'true';
        //   var s = document.getElementsByTagName('script')[0];
        //   s.parentNode.insertBefore(wf, s);
        // })();
    </script>

    <script src="/_assets/js/lib/modernizr-2.8.3.custom.min.js"></script>
</head>
<body>