<?php 

$patterns_dir = str_replace($_SERVER['SCRIPT_NAME'], '/', $_SERVER['SCRIPT_FILENAME']) . "patterns";
// $sections_dir = str_replace($_SERVER['SCRIPT_NAME'], '/', $_SERVER['SCRIPT_FILENAME']) . "patterns/sections/";

function pattern($str) {
    global $patterns_dir;

    include $patterns_dir . $str . '.html';
}

function section($str) {
    global $sections_dir;

    include $sections_dir . $str . '.html';
}