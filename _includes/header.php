<?php header("X-UA-Compatible: IE=edge"); ?>
<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?= $page->getPageTitle()?></title>

    <meta name="description" content="<?= $page->getDescription() ?>">
    <meta name="viewport" content="initial-scale=1,width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="x-dns-prefetch-control" content="on">

    <link rel="stylesheet" type="text/css" href="<?= $page->getAssetPath('build/css/main.css') ?>">

    <link rel="dns-prefetch" href="http://digitalstories.s3-website-eu-west-1.amazonaws.com">
    <link rel="dns-prefetch" href="//use.typekit.net">
    <link rel="dns-prefetch" href="//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=1494497634145827&version=v2.0">
    <link rel="dns-prefetch" href="//apis.google.com/js/platform.js">
    <link rel="dns-prefetch" href="//assets.pinterest.com/js/pinit.js">
    <link rel="dns-prefetch" href="//platform.twitter.com/widgets.js">

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        if (window === window.top) {
            ga('create', 'UA-54268163-1', 'auto');
            ga('send', 'pageview');
        }
	</script>

    <script src="/_assets/build/js/header.min.js"></script>

    <script src="//use.typekit.net/nlx6tdo.js"></script>
    <script>try{Typekit.load();}catch(e){}</script>


</head>
<?php flush(); ?>
<body>
