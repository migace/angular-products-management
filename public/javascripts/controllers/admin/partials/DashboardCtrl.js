define([
    'app',
    'services/GridMenuService'
], function(app) {
    app.controller('DashboardCtrl', ['$scope', 'GridMenuService', function($scope, GridMenuService) {
        $scope.showGridMenuComponent = function() {
            GridMenuService();
        }
    }]);
});
