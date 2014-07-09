<?php global $library_db; ?>

<div class="library-layer" data-component="library-layer">
    
    <div class="bar">
        <span>Further reading</span>
        <div class="show-more">
            <span>Show</span>
        </div>
    </div>

    <div class="gap">

        <div class="in-the-player">
            <div class="inner">
                <header class="in-the-player--header">
                    <h1>In the player</h1>
                </header>

                <div>
                    <ul class="player-items clearfix">
                        <?php if( isset($library_db) && isset($library_db['player']) ): ?>
                            <?php foreach( $library_db['player'] as $data ): ?>
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
                                                <a href="#" data-embed="<?php echo $data['link'] ?>">View</a>
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

        <?php if( isset($library_db) && isset($library_db['related']) ): ?>

        <div class="related-resources">
            
            <div class="inner">
                <header class="related-resources--header">
                    <h1>Related Resources</h1>
                </header>

                <div>
                    <ul class="related-items clearfix">

                        <?php foreach ($library_db['related'] as $data): ?>
                            <li>
                                <div class="related-item book">
                                    <header class="related-item--header">
                                        <h1><?php echo isset( $data['title'] ) ? $data['title'] : '' ?></h1>
                                    </header>

                                    <div class="related-item--body">
                                        <cite><?php echo isset( $data['author'] ) ? $data['author'] : '' ?><?php echo isset( $data['date'] ) ? ', '. $data['date'] : '' ?></cite>
                                    </div>

                                    <?php if( isset( $data['link'] ) && $data['link'] != '' ): ?>
                                    <footer class="related-item--footer">
                                        <a href="#<?php echo $data['link'] ?>">View</a>
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
