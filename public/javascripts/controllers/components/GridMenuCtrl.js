angular.module('angular-products-management')
    .controller('GridMenuCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Catalog', icon: 'catalog' },
            { name: 'Mail', icon: 'mail' },
            { name: 'Message', icon: 'message' },
            { name: 'Settings', icon: 'settings' },
            { name: 'Web', icon: 'web' },
        ];

        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    });
