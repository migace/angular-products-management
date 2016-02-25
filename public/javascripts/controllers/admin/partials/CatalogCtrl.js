define([
    'app',
    'services/GridMenuService'
], function(app) {
    app.controller('CatalogCtrl', ['$scope', 'GridMenuService', function($scope, GridMenuService) {
        $scope.showGridMenuComponent = function() {
            GridMenuService();
        }
    }]);
});
