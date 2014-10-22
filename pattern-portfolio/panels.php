<?php
include '../tapestry/functions.php';

$assets_dir     = str_replace($_SERVER['SCRIPT_NAME'], '/', $_SERVER['SCRIPT_FILENAME']) . "_assets";
$files          = array();
$handle         = opendir(str_replace($_SERVER['SCRIPT_NAME'], '/', $_SERVER['SCRIPT_FILENAME']) . '/patterns/panels');

while (false !== ($file = readdir($handle))):
    if($file != 'index.php' && (stristr($file,'.html') || stristr($file,'.php'))):
        $files[] = $file;
    endif;
endwhile;

sort($files);

$root = str_replace($_SERVER['SCRIPT_NAME'], '/', $_SERVER['SCRIPT_FILENAME']);

include_once( $root .'/_includes/Spyc.php');
include_once( $root .'/_includes/page-data.php');

$config_yml = spyc_load_file( $root .'/_includes/config.yaml');

// Default Config
$pathway    = 'mindcraft';
$module     = 'mesmer';
$path       = $config_yml['site']['pathways'][$pathway]['path'];

$teaser = array(
    'image' => 'teaser-jtm.jpg',
    'link'  => $path.'2-airloom',
    'title' => 'A machine to control the mind'
);

$page = PageBuilder::getPage();

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">

        <!-- Resize site based on device widths -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
       
        <link rel="stylesheet" href="/_assets/build/css/main.css">

        <style>
            body {
                font:   16px 'Helvetica Neue', Arial, sans-serif;
                background-color: #fff;
            }
            .primer-header {
                position: fixed;
                z-index: 100000;
                left: 0;
                right: 0;
                top: 0;
                padding: 1em;
                background: rgb(240, 240, 236);
                border-bottom: 1px solid #bbb;
            }
            .primer-header h1 {
                float: left;
                font-family: 'helvetica neue', 'arial', sans-serif;
                color: rgb(112, 147, 15);
                font-size: 24px;
                font-weight: bold;
                letter-spacing: -1px;
                line-height: 24px;
                text-shadow: 0 1px 0 rgb(255, 255, 255);
                text-rendering: optimizeLegibility;
            }
            .primer-header select {
                float: right;
                width: 20em;
            }
            .primer-section {
                position: relative;
                padding: 8em 1em 1em;
                margin-bottom: 2em;
            }
            .primer-section .primer-section-header {
                color: rgb(121, 44, 92);
                font-size: 22px;
                border-bottom: 1px dashed #dedede;
                margin-bottom: 35px;
                padding-bottom: 10px;
            }
            .primer-section .primer-section-header span {
                display: block;
                color: #999;
                font-size: 14px;
            }
            .primer-section .primer-content {
                position: relative;
                margin-bottom: 1em;
            }
            .primer-section .primer-code {
                font-size: 13px;
            }
            .primer-section .primer-code textarea {
                font-family: monospace;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
                padding: 0.5em;
                height: 8em;
                border: 1px solid #999;
            }
            .primer-section .primer-code p {
                font-size: 12px;
                margin-top: 10px;
            }

            .wrap { margin: 0 auto; max-width: 1280px; }

            .clearfix:before, .clearfix:after {
                content: "";
                display: table;
            }
            .clearfix:after {
                clear: both;
            }
            .clearfix {
                *zoom: 1;
            }
            
            .modal-outer,
            .modal,
            .modal-outer .modal {
                position: relative;
                top: 0;
            }
            
        </style>
        <link rel="stylesheet" href="../tapestry/css/prism.css">
    </head>
    <body class="primer">
        <div class="primer-header">

            <h1>Patterns</h1>
            
            <select onchange="document.location='#'+this.options[this.selectedIndex].value">
                <?php
                foreach ($files as $file):
                    if( $file[0] == '_' )
                        continue;

                    echo '<option>'.str_replace('.html', '', $file).'</option>';
                endforeach;
                ?>
            </select>
        </div>
        <div class="wrap">
            <?php
            foreach ($files as $file):
                $pattern = str_replace('.html', '', $file);
                $title = str_replace('-', ' ', $pattern);
            ?>

            <div class="primer-section" id="<?php echo $pattern ?>">
                
                <h3 class="primer-section-header"><?php echo ucwords($title) ?> <span>(<?php echo $pattern ?>)</span></h3>
                
                <div class="primer-content clearfix">

            <?php
                // Return the included files as a string so that the output code also contains any included patterns within patterns.
                ob_start();
                include($patterns_dir.'/panels/'.$file);
                $inc = ob_get_clean();

                $split = preg_split('/<!--[\n\s]*(.*)[\n\s]*-->/', $inc, -1, PREG_SPLIT_DELIM_CAPTURE);

                if( count($split) > 2 ) {
                    $vars = json_decode($split[1]);
                    // echo($vars->max_width );

                    $inc = $split[2];
                    echo '<div style="'.(isset($vars->max_width) ? 'max-width: '.$vars->max_width.'px' : '').'">';
                    echo $inc;
                    echo '</div>';
                }
                else {
                    echo $inc;
                }
            ?>
                
                </div>

                <div class="primer-code">
                    <pre>
                        <code class="language-php"><?php echo htmlspecialchars($inc); ?></code>
                    </pre>
                    <p><a href="/patterns/<?php echo $file ?>">View <?php echo $file ?></a></p>
                </div>
            </div>
            <?php endforeach; ?>
        </div><!-- /.wrap -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        
        <script src="../tapestry/js/prism.js"></script>
        
    </body>
</html>