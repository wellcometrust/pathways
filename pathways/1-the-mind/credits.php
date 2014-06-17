
<?php
$path = '';

if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
    $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
else
    $docRoot = $_SERVER['DOCUMENT_ROOT'];

include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="credits">

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

            <h3>Beakus (Air Loom Animation)</h3>

            <ul>
                <li><span>Producer:</span> Laura Thomas</li>
                <li><span>Director:</span> Leo Bridle</li>
            </ul>

            <h3>Clearleft</h3>

            <ul>
                <li><span>Designer:</span> Michael Allan</li>
                <li><span>Developer:</span> Graham Smith</li>
                <li><span>UX Designer:</span> Richard Rutter</li>
                <li><span>Project Manager:</span> Jessica Jebari</li>
            </ul>

        </div>


    </main>

<?php include($docRoot.'/_includes/footer.php') ?>