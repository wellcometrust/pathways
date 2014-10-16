<?php
    
    include_once(PageBuilder::getDocRoot().'/_includes/Spyc.php');

    class PageBuilder {

        private $defaultTitle = 'Pathways';
        private $defaultDescription = 'Wellcome Collection';

        private $title = 'Pathways';
        private $description = 'Wellcome Collection';
        
        private $siteConfigData;
        private $moduleData;

        private $pathwayId = '';
        private $moduleId = '';

        private $modules;

        public $hostRoot = '';
        public $docRoot = '';

        public $siteConfigSrc = '/_includes/config.yaml';
        public $moduleDataSrc = 'db.yaml';
        public $mediaUrl = 'http://wellcome-pathways.s3.amazonaws.com/';

        function __construct($pathwayId = '', $moduleId = '') {
            
            $this->pathwayId = $pathwayId;
            $this->moduleId = $moduleId;

            $this->docRoot = PageBuilder::getDocRoot();
            $this->hostRoot = PageBuilder::getHostRoot();        

            $this->initVals();
       	}


    // Public methods

        public function setModuleDataSrc($src) {                          
            if ($this->moduleDataSrc != $src) {
                $this->moduleDataSrc = $src;                 
                $this->initVals();
            }
        }

        public function setSiteConfigSrc($src) {            
            if ($this->siteConfigSrc != $src) {
                $this->siteConfigSrc = $src;                
                $this->initVals();
            }
        }

        public function setModuleId($id) {
            if ($this->moduleId != $id ) {
                $this->moduleId = $id;
                $this->initVals();
            }
        }

        public function setPathwayId($id) {            
            if ($this->pathwayId != $id) {
                $this->pathwayId = $id;
                $this->initVals();
            }
        }

        private function initVals() {
            
            $this->moduleData = spyc_load_file($this->moduleDataSrc);
            $this->siteConfigData = spyc_load_file($this->docRoot.$this->siteConfigSrc);

            $this->pathwayId = $this->_getModulePageInfo($this->pathwayId, $this->moduleData, 'pathway_id');
            $this->moduleId = $this->_getModulePageInfo($this->moduleId, $this->moduleData, 'module_id');

            $this->modules = $this->_getPathwayModules($this->pathwayId, $this->siteConfigData);

        }

        public function getTitle() {
            return $this->getModule()['title'];
        }    

        public function getPageTitle() {
            return $this->getModule()['title'] . $this->getModule()['title_postfix'];
        }

        public function getDescription() {
            return $this->getModule()['description'];
        }
       
        public function getPathwayId() {
            return $this->_getModulePageInfo($this->pathwayId, $this->moduleData, 'pathway_id');
        }        

        public function getModuleId() {
            return $this->_getModulePageInfo($this->moduleId, $this->moduleData, 'module_id');
        }
        

        
        public function getAudio() {
            return $this->_getModuleData('audio', $this->moduleData);           
        }

        public function getTeaserData() {
            return $this->_getModuleData('teaser', $this->moduleData);
        }

        public function getPanels() {
            return $this->_getModuleData('panels', $this->moduleData);
        }



        public function getPathwayPath() {    
            return $this->_getPathwayPath($this->pathwayId, $this->siteConfigData);  
        }   

        private function getPathwayModules() {
            return $this->modules;
        }
        


        public function getModule() {   
            if (empty($this->moduleId)) return [];   
            return $this->_getModuleById($this->moduleId, $this->modules);
        }


        public function getModuleData($id) {
            return $this->_getModuleData($id, $this->moduleData);
        }



        public function getAsset($location) {
            return '/_assets' . ( strpos($location, '/') != 0 ? '/' . $location : $location);
        }

        

        public function getAudioByPanelId($id) {
            return $this->getAudio()[$id];
        }



        public function render() {
            $page = $this;
            include_once($this->docRoot.'/_includes/module.php');
        }

        public function renderPattern($pattern, $data = null) {
            $page = $this;
            include($this->docRoot . '/patterns/' . $pattern . '.php' );
        }


    // Private methods
        private function _getModuleById($id, $modules) {
            foreach( $modules as $m ) {
                if( $id == $m['id'] ) {
                    $module = $m;             
                }
            }
            return $module;
        }

        private function _getModuleData($item, $data) {
            if ( !empty($data) && !empty($data[$item] )) {
                return $data[$item];
            } else {
                return [];
            }
        }

        private function _getModulePageInfo($id, $data, $item){
            if (empty($id) && !empty($data)) {
                $id = $data['page_info'][$item];
            }            
            return $id;
        }

        private function _getPathwayPath($pathwayId, $siteConfigData) {
            return $siteConfigData['site']['pathways'][$pathwayId]['path'];  
        }

        private function _getPathwayModules($pathwayId, $siteConfigData) {
            $modules = $siteConfigData['site']['pathways'][$pathwayId]['modules'];       
            return $this->_setModuleIndexes($modules);
        }

        private function _setModuleIndexes($modules) { 
            if (isset($modules)) {
                $count = 1;
                foreach($modules as &$m ) {   
                    if ($m['panels']) $m['index'] = $count++;                                      
                }          
                return $modules; 
            } else {
                return [];
            }           
                 
        }

    // Static methods
        public static function getDocRoot(){
            if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' ) {
                $root = '/home/clearleft/subdomains/wellcome-pathways';
            } else {
                $root = $_SERVER['DOCUMENT_ROOT'];
            }
            
            return $root;
        }

        public static function getHostRoot(){
            return (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST']; 
        }

        public static function getPage($pathwayId = '', $moduleId = '') {
            return new PageBuilder($pathwayId, $moduleId);
        }

        public static function renderPage() {
            $page = new PageBuilder();
            $page->render();
        }

    }
?>