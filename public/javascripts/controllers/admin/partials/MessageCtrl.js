define([
    'app',
    'services/GridMenuService'
], function(app) {
    app.controller('MessageCtrl', ['$scope', 'GridMenuService', function($scope, GridMenuService) {
        $scope.showGridMenuComponent = function() {
            GridMenuService();
        }
    }]);
});
