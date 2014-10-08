<?php
    global $library_db;

    $layer = isset( $library_db['library_layer'] ) ? $library_db['library_layer'] : [];
?>

<div class="library-layer">
    
    <div class="gap">

        <div class="controls clearfix" data-component="toggle-section" data-toggle-section-target=".library-layer .gap" data-toggle-section-anchor=".library-layer">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32" xml:space="preserve">
                <g>
                    <polygon fill="#60B8B2" points="20.9,9.6 16,14.6 11,9.6 9.7,11 14.6,16 9.7,20.9 11,22.3 16,17.4 20.9,22.3 22.4,20.9 17.4,16 22.4,11"/>
                    <path fill="#60B8B2" d="M16,0C7.2,0,0,7.2,0,16s7.1,16,16,16s16-7.1,16-16S24.8,0,16,0z M16,29.5c-7.5,0-13.5-6-13.5-13.5 S8.5,2.5,16,2.5s13.5,6,13.5,13.5C29.5,23.4,23.4,29.5,16,29.5z"/>
                </g>
            </svg>
        </div>

        <div class="in-the-player">
            <div class="inner">
                <header class="in-the-player--header">
                    <h1>See in the Wellcome Library</h1>
                </header>

                <div>
                    <ul class="player-items clearfix">
                        <?php if( isset($layer['See_in_the_Wellcome_Library']) ): ?>
                            <?php foreach( $layer['See_in_the_Wellcome_Library'] as $data ): ?>
                                <li>
                                    <div class="player-item clearfix<?php echo isset($data['type'] ) ? ' '.$data['type'] : '' ?>">
                                        <div class="player-item--thumb"></div>

                                        <div class="player-item--content">
                                            <header class="player-item--header">
                                                <h1><?php echo isset( $data['title'] ) ? $data['title'] : '' ?></h1>
                                            </header>

                                            <div class="player-item--body">                                                
                                                <cite><?php echo isset( $data['author'] ) ? $data['author'] : '' ?><?php echo isset( $data['date'] ) ? ', '. $data['date'] : '' ?></cite>
                                            </div>

                                            <footer class="player-item--footer">
                                                <?php if( isset( $data['link'] ) && $data['link'] != '' ): ?>
                                                <a href="#" data-component="player-overlay" data-embed="<?php echo $data['link'] ?>">View</a>
                                                <?php endif ?>
                                            </footer>
                                        </div>
                                    </div>
                                </li>
                            <?php endforeach ?>
                        <?php endif ?>
                    </ul>
                </div>
            </div>
        </div>

        <?php if( isset($layer['See_Elsewhere']) ): ?>

        <div class="related-resources">
            
            <div class="inner">
                <header class="related-resources--header">
                    <h1>See elsewhere</h1>
                </header>

                <div>
                    <ul class="related-items clearfix">

                        <?php foreach ($layer['See_Elsewhere'] as $data): ?>
                            <li>
                                <div class="related-item<?php echo isset($data['type'] ) ? ' '.$data['type'] : '' ?>">
                                    <header class="related-item--header">
                                        <h1><?php echo isset( $data['title'] ) ? $data['title'] : '' ?></h1>
                                    </header>

                                    <div class="related-item--body">
                                        <cite><?php echo isset( $data['author'] ) ? $data['author'] : '' ?><?php echo isset( $data['date'] ) ? ', '. $data['date'] : '' ?></cite>
                                    </div>

                                    <?php if( isset( $data['link'] ) && $data['link'] != '' ): ?>
                                    <footer class="related-item--footer">
                                        <a href="<?php echo $data['link'] ?>" rel="external">View</a>
                                    </footer>
                                    <?php endif ?>
                                </div>
                            </li>
                        <?php endforeach ?>
                    </ul>
                </div>
            </div>

        </div>

        <?php endif ?>

    </div>

</div>

