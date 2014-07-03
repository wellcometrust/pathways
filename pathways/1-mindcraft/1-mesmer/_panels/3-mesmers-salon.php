
<div id="mesmers-salon" class="panel mesmers-salon" data-component="crop-zoom">

    <div class="bg-container">
        <img src="/_assets/img/mesmer/mesmer-2.jpg">
    </div>

    <?php
        $panel = array(
            'links' => array(
                array(
                    'title'         => 'Mesmeric therapy',
                    'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1202566~S13',
                    'download_url'  => '',
                    'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0014796.html'
                )
            )
        );
    ?>

    <?php pattern('library_panel'); ?>

    <div class="crop-zoom">
        <svg class="info-box tap-target rod" data-crop="rod" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">
            <circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"/>
            <circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"/>
        </svg>

        <svg class="info-box tap-target woman" data-crop="woman" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">
            <circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"/>
            <circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"/>
        </svg>

        <svg class="info-box tap-target mesmer" data-crop="mesmer" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">
            <circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"/>
            <circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"/>
        </svg>
    </div>

    <script>
        var db = {
            'rod': {
                'image':    'rod-crop.jpg',
                'title':    '',
                'text':     'Mesmer ‘magnetised’ rods or wands that could be used to direct the fluid to the afflicted part of the body. He would often play music on a glass harmonica that sent shivers through the patients’ nerves.',
                'position': 'right'
            },
            'woman': {
                'image':    'woman-crop.jpg',
                'text':     'Patients would form circles, holding hands or grasping cords, to transfer the healing energies between them. Sometimes these healing circles would climax in mass convulsions.',
                'position': 'left'
            },
            'mesmer': {
                'image':    'mesmer-crop.jpg',
                'text':     'Mesmer, depicted here with his wand, taught his healing skills to initiates. They were obliged to take a strict vow of secrecy and pay the large sum of 100 livres. Many French aristocrats signed up.',
                'position': 'left'    
            }
        }
    </script>

</div>