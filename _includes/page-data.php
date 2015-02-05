<?php

    include_once(PageBuilder::getDocRoot().'/_includes/Spyc.php');

    function truncate($string, $length=100, $append="") {
        $string = trim($string);

        if(strlen($string) > $length) {
            $string = wordwrap($string, $length);
            $string = explode("\n", $string, 2);
            $string = $string[0] . $append;
        }

        return $string;
    }

    class PageBuilder {

        private $defaultTitle = 'Digital Stories';
        private $defaultPageTitle = 'Digital Stories | Wellcome Collection';
        private $defaultDescription = 'Digital Stories from The Wellcome Collection';

        private $siteConfigData;
        private $moduleData;

        private $pathwayId = '';
        private $moduleId = '';

        private $modules;

        public $hostRoot = '';
        public $docRoot = '';

        public $siteConfigSrc = '/_includes/config.yaml';
        public $moduleDataSrc = 'db.yaml';
        public $mediaUrl = 'http://digitalstories.s3-website-eu-west-1.amazonaws.com/digital-stories/';

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
            $mod = $this->getModule();
            if (!empty($mod)) return $mod['title'];
            return $this->defaultTitle;
        }

        public function getPageTitle() {
            $m = $this->getModule();
            if (!empty($m)) {
                if (isset($m['title'])) {
                    if (isset($m['title_postfix'])) return $m['title'] . $m['title_postfix'];
                    return $m['title'];
                }
            }

            return $this->defaultPageTitle;

        }

        public function getDescription() {
            $m = $this->getModule();
            if (!empty($m)) { if (isset($m['description'])) return $m['description']; }
            return $this->defaultDescription;
        }

        public function getPathwayId() {
            return $this->_getModulePageInfo($this->pathwayId, $this->moduleData, 'pathway_id');
        }

        public function getModuleId() {
            return $this->_getModulePageInfo($this->moduleId, $this->moduleData, 'module_id');
        }

        public function getGARoot() {
            $spacer = ' - ';
            return $this->pathwayId . $spacer . $this->moduleId . $spacer;
        }


        public function getPanels() {
            return $this->_getModuleData('panels', $this->moduleData);
        }



        public function getPathwayPath() {
            return $this->_getPathwayPath($this->pathwayId, $this->siteConfigData);
        }

        public function getModulePath() {
            $mod = $this->getModule();
            $path = $mod['path'];
            return $this->docRoot.$this->_getPathwayPath($this->pathwayId, $this->siteConfigData).$path;
        }

        public function getPathwaySurveyLink() {
            return $this->_getPathwayInfo('survey_link', $this->pathwayId, $this->siteConfigData);
        }

        public function getPathwayIntroText() {
            return $this->_getPathwayInfo('intro_text', $this->pathwayId, $this->siteConfigData);
        }

        public function getPathwayTitle() {
            return $this->_getPathwayInfo('title', $this->pathwayId, $this->siteConfigData);
        }

        public function getPathwayModules() {
            return $this->modules;
        }



        public function getModule() {
            if (empty($this->moduleId)) return [];
            return $this->_getModuleById($this->moduleId, $this->modules);
        }

        public function getFirstPathwayPanelModule() {
            foreach( $this->modules as $m ){
                if ( isset($m['panels']) ) return $m;
            }
            return null;
        }

        public function getModuleData($id) {
            return $this->_getModuleData($id, $this->moduleData);
        }



        public function getAssetPath($location) {
            return '/_assets' . ( strpos($location, '/') != 0 ? '/' . $location : $location);
        }






        public function getPatternPath($pattern) {
            return $this->docRoot . '/_includes/components/' . $pattern . '.php';
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
            if (empty($id) && !empty($data) && !empty($data['page_info'])) {
                $id = $data['page_info'][$item];
            }
            return $id;
        }

        private function _getPathwayPath($pathwayId, $siteConfigData) {
            return $this->_getPathwayInfo('path', $pathwayId, $siteConfigData);
        }

        private function _getPathwayModules($pathwayId, $siteConfigData) {
            $modules = $this->_getPathwayInfo('modules', $pathwayId, $siteConfigData);
            return $this->_setModuleIndexes($modules);
        }
        private function _getPathwayInfo($itemId, $pathwayId, $siteConfigData) {
            $p = $siteConfigData['site']['pathways'];
            if (isset($p[$pathwayId])) {
                $q = $p[$pathwayId];
                if (isset($q[$itemId])) return $q[$itemId];
            }
            return '';
        }

        private function _setModuleIndexes($modules) {
            if (isset($modules) && !empty($modules)) {
                $count = 1;
                foreach($modules as &$m ) {
                    if ( isset($m['panels'])) $m['index'] = $count++;
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
            return 'http' . '://' . $_SERVER['HTTP_HOST'];
        }

        public static function getPage($pathwayId = '', $moduleId = '') {
            return new PageBuilder($pathwayId, $moduleId);
        }

    }
?>
