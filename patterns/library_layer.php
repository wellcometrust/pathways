
<div class="library-layer" data-component="library-layer">
    
    <div class="bar">
        <span>Curious for more?</span>
    </div>

    <div class="gap">

        <div class="in-the-player">
            <div class="inner">
                <header class="in-the-player--header">
                    <h1>In the player</h1>
                </header>

                <div>
                    <ul class="player-items clearfix">
                        <?php if( isset($library_content) && isset($library_content['in the player']) ): ?>
                            <?php foreach( $library_content['in the player'] as $data ): ?>
                                <li>
                                    <div class="player-item clearfix">
                                        <img src="http://placekitten.com/150/200" class="player-item--thumb">

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
                        <?php else: ?>

                        <li>
                            <div class="player-item clearfix">
                                <img src="http://placekitten.com/150/200" class="player-item--thumb">

                                <div class="player-item--content">
                                    <header class="player-item--header">
                                        <h1>Benjamin Franklin’s Report of the French Commission</h1>
                                    </header>

                                    <div class="player-item--body">
                                        <p>Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity</p>
                                        
                                        <cite>London: J Johnson, 1785</cite>
                                    </div>

                                    <footer class="player-item--footer">
                                        <a href="#" data-embed="http://wellcomelibrary.org/package/b20458228">View</a>
                                    </footer>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="player-item clearfix">
                                <img src="http://placekitten.com/150/200" class="player-item--thumb">

                                <div class="player-item--content">
                                    <header class="player-item--header">
                                        <h1>Benjamin Franklin’s Report of the French Commission</h1>
                                    </header>

                                    <div class="player-item--body">
                                        <p>Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity</p>
                                        
                                        <cite>London: J Johnson, 1785</cite>
                                    </div>

                                    <footer class="player-item--footer">
                                        <a href="#" data-embed="http://wellcomelibrary.org/package/b20458228">View</a>
                                    </footer>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="player-item clearfix">
                                <img src="http://placekitten.com/150/200" class="player-item--thumb">

                                <div class="player-item--content">
                                    <header class="player-item--header">
                                        <h1>Benjamin Franklin’s Report of the French Commission</h1>
                                    </header>

                                    <div class="player-item--body">
                                        <p>Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity</p>
                                        
                                        <cite>London: J Johnson, 1785</cite>
                                    </div>

                                    <footer class="player-item--footer">
                                        <a href="#" data-embed="http://wellcomelibrary.org/package/b20458228">View</a>
                                    </footer>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="player-item clearfix">
                                <img src="http://placekitten.com/150/200" class="player-item--thumb">

                                <div class="player-item--content">
                                    <header class="player-item--header">
                                        <h1>Benjamin Franklin’s Report of the French Commission</h1>
                                    </header>

                                    <div class="player-item--body">
                                        <p>Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity Yakkity shmackity</p>
                                        
                                        <cite>London: J Johnson, 1785</cite>
                                    </div>

                                    <footer class="player-item--footer">
                                        <a href="#" data-embed="http://wellcomelibrary.org/package/b20458228">View</a>
                                    </footer>
                                </div>
                            </div>
                        </li>

                        <?php endif ?>
                    </ul>
                </div>
            </div>
        </div>

        <?php if( isset($library_content) && isset($library_content['related resources']) ): ?>

        <div class="related-resources">
            
            <div class="inner">
                <header class="related-resources--header">
                    <h1>Related Resources</h1>
                </header>

                <div>
                    <ul class="related-items clearfix">

                        <?php foreach ($library_content['related resources'] as $data): ?>
                            <li>
                                <div class="related-item book">
                                    <header class="related-item--header">
                                        <a href="#"><h1><?php echo isset( $data['title'] ) ? $data['title'] : '' ?></h1></a>
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
