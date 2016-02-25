define([
    'app',
    'services/GridMenuService'
], function(app) {
    app.controller('MailCtrl', ['$scope', 'GridMenuService', function($scope, GridMenuService) {
        $scope.showGridMenuComponent = function() {
            GridMenuService();
        }
    }]);
});
