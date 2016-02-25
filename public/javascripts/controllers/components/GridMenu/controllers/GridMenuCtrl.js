define([
    'app'
], function(app) {
    app.controller('GridMenuCtrl', function($scope, $mdBottomSheet, $window) {
        $scope.items = [
            { name: 'Dashboard', icon: 'dashboard', link: '#/' },
            { name: 'Catalog', icon: 'catalog', link: '#/catalog' },
            { name: 'Mail', icon: 'mail', link: '#/mail' },
            { name: 'Message', icon: 'message', link: '#/message' },
            { name: 'Settings', icon: 'settings', link: '#/settings' },
            { name: 'Web', icon: 'web', link: '#/web' },
        ];

        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
            $window.location.href = clickedItem.link;
        };
    });
});
