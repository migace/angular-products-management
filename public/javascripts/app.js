define([
    'angularAMD',
    'angular.material',
    'angular.route',
    'directives/context-menu'
], function(angularAMD) {
    var app = angular.module('angular-products-management', [
        'ngMaterial', 'contextMenuApp', 'ngRoute', 'ngAnimate'
    ]);

    app.config(function($mdIconProvider) {
        $mdIconProvider
            .icon('catalog', '/images/icons/catalog.svg', 24)
            .icon('mail', '/images/icons/mail.svg', 24)
            .icon('message', '/images/icons/message.svg', 24)
            .icon('settings', '/images/icons/settings.svg', 24)
            .icon('web', '/images/icons/web.svg', 24)
            .icon('dashboard', '/images/icons/dashboard.svg', 24);
    });

    app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.
            when('/admin',
                angularAMD.route({
                    templateUrl: 'admin/partials/dashboard',
                    controller: 'DashboardCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/DashboardCtrl.js'
                })
            ).
            when('/admin/catalog',
                angularAMD.route({
                    templateUrl: 'admin/partials/catalog',
                    controller: 'CatalogCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/CatalogCtrl.js'
                })
            ).
            when('/admin/mail',
                angularAMD.route({
                    templateUrl: 'admin/partials/mail',
                    controller: 'MailCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/MailCtrl.js'
                })
            ).
            when('/admin/message',
                angularAMD.route({
                    templateUrl: 'admin/partials/message',
                    controller: 'MessageCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/MessageCtrl.js'
                })
            ).
            when('/admin/settings',
                angularAMD.route({
                    templateUrl: 'admin/partials/settings',
                    controller: 'SettingsCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/SettingsCtrl.js'
                })
            ).
            when('/admin/web',
                angularAMD.route({
                    templateUrl: 'admin/partials/web',
                    controller: 'WebCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/WebCtrl.js'
                })
            ).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);

    return angularAMD.bootstrap(app);
});
