angular.module('angular-products-management').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/dashboard',
            controller: 'DashboardCtrl'
        }).
        when('/catalog', {
            templateUrl: 'partials/catalog',
            controller: 'CatalogCtrl'
        }).
        when('/mail', {
            templateUrl: 'partials/mail',
            controller: 'MailCtrl'
        }).
        when('/message', {
            templateUrl: 'partials/message',
            controller: 'MessageCtrl'
        }).
        when('/settings', {
            templateUrl: 'partials/settings',
            controller: 'SettingsCtrl'
        }).
        when('/web', {
            templateUrl: 'partials/web',
            controller: 'WebCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
