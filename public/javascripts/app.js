define([
    'angularAMD',
    'angular.material',
    'angular.route',
    'BackModule',
    'directives/context-menu',
    'angular.material.table',
    'angular.flash'
], function(angularAMD) {
    var app = angular.module('angular-products-management', [
        'ngMaterial', 'contextMenuApp', 'ngRoute', 'ngAnimate',
        'BackModule', 'md.data.table', 'ngFlash'
    ]);

    app.constant(
        "API_CONFIG", {
            "URL": "http://localhost:3000/api/v1",
            "PRODUCT_ACTION_DELETE": "/product/delete",
            "PRODUCT_ACTION_CREATE": "/product/create",
            "PRODUCT_ACTION_EDIT": "/product/edit",
            "PRODUCT_ACTION_GET_ALL": "/product/getAll",
            "PRODUCT_ACTION_GET": "/product/get",
            "CATEGORY_ACTION_CREATE": "/category/create",
            "CATEGORY_ACTION_GET_ALL": "/category/getAll"
        }
    ).constant(
        "STATUSES", {
            "SUCCESS": 200
        }
    );

    app.config(function($mdIconProvider, $mdThemingProvider) {
        $mdIconProvider
            .icon('catalog', '/images/icons/catalog.svg', 24)
            .icon('mail', '/images/icons/mail.svg', 24)
            .icon('message', '/images/icons/message.svg', 24)
            .icon('settings', '/images/icons/settings.svg', 24)
            .icon('web', '/images/icons/web.svg', 24)
            .icon('dashboard', '/images/icons/dashboard.svg', 24)
            .icon('menu', '/images/icons/menu.svg', 24)
            .icon('create', '/images/icons/create.svg', 24)
            .icon('left-arrow', '/images/icons/left-arrow.svg', 24)
            .icon('right-arrow', '/images/icons/right-arrow.svg', 24)
            .icon('price', '/images/icons/price.svg', 24)
            .icon('ok', '/images/icons/ok.svg', 24)
            .icon('euro', '/images/icons/euro.svg', 24)
            .icon('edit', '/images/icons/edit.svg', 24)
            .icon('trash', '/images/icons/trash.svg', 24);

        $mdThemingProvider.theme('docs-dark');
    });

    app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            //$locationProvider.html5Mode(true);

            $routeProvider.
            when('/',
                angularAMD.route({
                    templateUrl: 'admin/partials/dashboard',
                    controller: 'DashboardCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/DashboardCtrl.js'
                })
            ).
            when('/catalog',
                angularAMD.route({
                    templateUrl: '/admin/partials/catalog/index',
                    controller: 'CatalogCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/CatalogCtrl.js'
                })
            ).
            when('/catalog/create',
                angularAMD.route({
                    templateUrl: '/admin/partials/catalog/create',
                    controller: 'CatalogCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/CatalogCtrl.js'
                })
            ).
            when('/catalog/edit/:sku',
                angularAMD.route({
                    templateUrl: '/admin/partials/catalog/edit',
                    controller: 'CatalogCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/CatalogCtrl.js'
                })
            ).
            when('/mail',
                angularAMD.route({
                    templateUrl: 'admin/partials/mail',
                    controller: 'MailCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/MailCtrl.js'
                })
            ).
            when('/message',
                angularAMD.route({
                    templateUrl: 'admin/partials/message',
                    controller: 'MessageCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/MessageCtrl.js'
                })
            ).
            when('/settings',
                angularAMD.route({
                    templateUrl: 'admin/partials/settings',
                    controller: 'SettingsCtrl',
                    controllerUrl: '/javascripts/controllers/admin/partials/SettingsCtrl.js'
                })
            ).
            when('/web',
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
