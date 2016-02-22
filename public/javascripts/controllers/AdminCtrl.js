angular.module('angular-products-management').
    controller('AdminCtrl', function($scope, $timeout, $mdBottomSheet, $mdToast) {
        $scope.showGridMenuComponent = function() {
            $scope.alert = '';
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
    });
