define([
    'app'
], function(app) {
    app.controller('GridMenuCtrl', function($scope, $mdBottomSheet, $window) {
        $scope.items = [
            { name: 'Dashboard', icon: 'dashboard', link: 'admin/#/' },
            { name: 'Catalog', icon: 'catalog', link: 'admin/#/catalog' },
            { name: 'Mail', icon: 'mail', link: 'admin/#/mail' },
            { name: 'Message', icon: 'message', link: 'admin/#/message' },
            { name: 'Settings', icon: 'settings', link: 'admin/#/settings' },
            { name: 'Web', icon: 'web', link: 'admin/#/web' },
        ];

        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
            $window.location.href = clickedItem.link;
        };
    });
});
