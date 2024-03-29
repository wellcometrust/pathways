<?php

$patterns_dir = str_replace($_SERVER['SCRIPT_NAME'], '/', $_SERVER['SCRIPT_FILENAME']) . "_includes/components/";
// $sections_dir = str_replace($_SERVER['SCRIPT_NAME'], '/', $_SERVER['SCRIPT_FILENAME']) . "patterns/sections/";


function section($str) {
    global $sections_dir;

    include $sections_dir . $str . '.html';
}

if( !function_exists('export') ) {
    function export($pathway) {
        global $docRoot, $path, $config_yml;

        //
        $zipName    = tempnam("tmp", "zip");
        $zip        = new ZipArchive();
        $res        = $zip->open($zipName, ZipArchive::CREATE);

        // Collect up all the modules for a pathway and render them into HTML.
        // Then zip 'em up and send them to the browser.
        $dirPath = $config_yml['site']['pathways'][$pathway]['path'];

        // get the pathway directory
        $d          = dir($docRoot . '/' . $dirPath);

        // add the intro and credits
        $intro = file_get_contents('http://'.$_SERVER['SERVER_NAME'] . $dirPath . '/index.php');
        $zip->addFromString('intro.html', $intro);

        $credits = file_get_contents('http://'.$_SERVER['SERVER_NAME'] . $dirPath . '/credits.php');
        $zip->addFromString('credits.html', $credits);

        // Find the pathway modules
        while ($file = $d->read()) {
            $childFolderStr = $docRoot . $dirPath . $file;

            // only get the numbered modules
            if( preg_match('/^\d/', $file) && is_dir( $childFolderStr ) ) {
                // get the file and load the contents into a string
                $loc = $_SERVER['SERVER_NAME'] . $dirPath . $file . '/index.php';
                $page = file_get_contents('http://'.$loc);

                // create a file from the string and add straight to the zip file.
                $zip->addFromString($file.'.html', $page);
            }
        }

        $zip->close();

        $filename = $pathway . '.zip';

        // output the zip file to the browser
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: private",false);
        header("Content-Type: application/zip");
        header('Content-Length: ' . filesize($zipName));
        header("Content-Disposition: attachment; filename=\"$filename\";" );
        readfile($zipName);
        unlink($zipName);
    }
}
