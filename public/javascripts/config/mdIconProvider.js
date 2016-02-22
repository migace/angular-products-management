angular.module('angular-products-management')
    .config(function($mdIconProvider) {
        $mdIconProvider
            .icon('catalog', '/images/icons/catalog.svg', 24)
            .icon('mail', '/images/icons/mail.svg', 24)
            .icon('message', '/images/icons/message.svg', 24)
            .icon('settings', '/images/icons/settings.svg', 24)
            .icon('web', '/images/icons/web.svg', 24)
            .icon('dashboard', '/images/icons/dashboard.svg', 24);
        });
