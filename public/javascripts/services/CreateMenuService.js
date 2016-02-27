define([
    'app'
], function(app) {
    app.factory('CreateMenuService', function() {
        return {
            openMenu: function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            }
        };
    });
})
