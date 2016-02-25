define([
    'angularAMD'
], function(angularAMD) {
    'use strict';

    /**
     * @ngdoc directive
     * @name contextMenuApp.directive:contextMenu
     * @description
     * # contextMenu
     * Custom Context Menu Directive
     */
    angular.module('contextMenuApp', [])
        .directive('ngRightClick', function($parse) {
            return function(scope, element, attrs) {
                var fn = $parse(attrs.ngRightClick);
                element.bind('contextmenu', function(event) {
                    scope.$apply(function() {
                        event.preventDefault();
                        fn(scope, {$event:event});
                    });
                });
            };
        });
});
