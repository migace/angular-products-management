define([
    'app',
    'services/GridMenuService'
], function(app) {
    app.controller('SettingsCtrl', ['$scope', 'GridMenuService', function($scope, GridMenuService) {
        $scope.showGridMenuComponent = function() {
            GridMenuService();
        }
    }]);
});
