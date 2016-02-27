define([
    'angularAMD',
], function(angularAMD) {
    angular.module('BackModule', []).
        directive('back', ['$window', function($window) {
            return {
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    elem.bind('click', function () {
                        $window.history.back();
                    });
                }
            };
        }]);
});
