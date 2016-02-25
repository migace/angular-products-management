require.config({
    baseUrl : 'javascripts',
    paths : {
        'angular'             : '//ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min',
        'angular.animate'     : '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-animate.min',
        'angular.route'       : '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-route.min',
        'angular.aria'        : '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-aria.min',
        'angular.messages'    : '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-messages.min',
        'angular.material'    : '//ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min',
        'angularAMD'          : '//cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
        'GridMenuController'  : 'components/GridMenu/controllers/GridMenuCtrl',
    },
    shim : {
        'angular' : {
            exports : 'angular'
        },
        'angular.route' : {
            deps : ['angular']
        },
        'angular.aria' : {
            deps : ['angular']
        },
        'angular.messages' : {
            deps : ['angular']
        },
        'angular.animate' : {
            deps : ['angular']
        },
        'angular.material' : {
            deps : ['angular', 'angular.aria', 'angular.messages', 'angular.animate']
        },
        'angularAMD' : {
            deps : ['angular']
        }
    },
    deps: ['app']
});
