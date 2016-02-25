define([
    'app',
    'services/GridMenuService'
], function(app) {
    app.controller('WebCtrl', ['$scope', 'GridMenuService', function($scope, GridMenuService) {
        $scope.showGridMenuComponent = function() {
            GridMenuService();
        }
    }]);
});
