<?php
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include_once($docRoot.'/_includes/page-data.php');
    $page = PageBuilder::getPage('mindcraft', 'credits');

    include_once($docRoot.'/_includes/credits_start.php');
?>

                <h1>Credits</h1>

                <h3>Wellcome Collection</h3>

                <ul>
                    <li><span>Author:</span> Mike Jay</li>
                    <li><span>Producer:</span> Jane Audas</li>
                    <li><span>Executive Producer:</span> Danny Birchall</li>
                    <li><span>Project Manager:</span> Oliver Vicars-Harris</li>
                    <li><span>Production Assistant:</span> Joe Simmonds-Issler</li>
                    <li><span>Digital/Production Assistant:</span> Anna Ostrowska</li>
                    <li><span>Content Research:</span> Julia Nurse and Ruth Blue</li>
                    <li><span>Media Production:</span> Chris Chapman</li>
                </ul>

                <h3>Clearleft</h3>

                <ul>
                    <li><span>Art direction &amp; Design:</span> Michael Allan</li>
                    <li><span>Developer:</span> Graham Smith</li>
                    <li><span>UX Designer:</span> Richard Rutter and Ben Sauer</li>
                    <li><span>Project Manager:</span> Jessica Jebari</li>
                </ul>

                <h3>Angular Momentum</h3>

                <ul>
                    <li><span>Developer:</span> Danielle Huntrods</li>
                </ul>

                <h3>Beakus <span>(Air Loom Animation)</span></h3>

                <ul>
                    <li><span>Producer:</span> Laura Thomas</li>
                    <li><span>Director:</span> Leo Bridle</li>
                    <li><span>Script:</span> James Tilly Matthews / Mike Jay</li>
                </ul>

<?php include_once($docRoot.'/_includes/credits_end.php') ?>
