'use strict';

(function() {
    
    angular
        .module('simpleArmoryApp')
        .controller('LoginCtrl' , LoginCtrl)
        .controller('ModalInstanceCtrl' , ModalInstanceCtrl);

    function LoginCtrl($scope, $rootScope, $modal, $location, $timeout) {
        var modalInstance = $modal.open({
            templateUrl: 'ModelLogin.html',
            controller: 'ModalInstanceCtrl',
            backdrop: 'static',
        });

        modalInstance.opened.then(function () {
            // Focus on the selection box when the dialog comes up
            window.setTimeout(function() {
                $('#realmSelection').focus();
            },50);
        });     
         
        modalInstance.result.then(function (loginObj) {

            $location.url(loginObj.region + '/' + loginObj.realm + '/' + loginObj.character);
        });

       $rootScope.$on('$routeChangeSuccess', function() {

            modalInstance.dismiss();
       });
    }

    function ModalInstanceCtrl($scope, $modalInstance, BlizzardRealmService) {

        // initialize with select disabled and a loading text
        $scope.realms = [];
        $scope.selectedRealm = {};

        // turn drop down off until servers come back
        $scope.isDisabled = true;

        BlizzardRealmService.getAllRealms().then(function(realms) {
            $scope.isDisabled = false;
            if ($scope.realms.length === 1) {
                $scope.realms = [];
            }

            $scope.realms = realms;
        });

        $scope.ok = function () {
            $modalInstance.close({
                'region': $scope.selectedRealm.selected.region,
                'realm': $scope.selectedRealm.selected.slug,
                'character': $scope.characterName
            });
        };
    }

})();