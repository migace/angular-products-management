define([
    'app',
    'angular.material',
    'GridMenuController'
], function(app) {
    "use strict";

    app.service('GridMenuService', ['$mdBottomSheet', '$mdToast', function ($mdBottomSheet, $mdToast) {
        return function showGridMenuComponent() {
            $mdBottomSheet.show({
                templateUrl: 'components/grid-menu',
                controller: 'GridMenuCtrl',
                clickOutsideToClose: true
            }).then(function(clickedItem) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(clickedItem['name'] + ' clicked!')
                    .position('top right')
                    .hideDelay(1500)
                );
            });
        };
    }]);
});
