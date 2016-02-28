define([
    'app',
    'services/GridMenuService',
    'services/CreateMenuService'
], function(app) {
    app.controller('CatalogCtrl', [
        '$scope', '$http','GridMenuService', 'CreateMenuService', 'API_CONFIG',
        function($scope, $http, GridMenuService, CreateMenuService, API_CONFIG) {
            $scope.showGridMenuComponent = function() {
                GridMenuService();
            };

            $scope.openMenu = function($mdOpenMenu, ev) {
                CreateMenuService.openMenu($mdOpenMenu, ev);
            };

            $scope.submit = function() {
                console.log(this.product);

                // to do
                if (this.product.name === "" || this.product.sku === "" ||
                    this.product.availability === "" || this.product.description === "" ||
                    this.product.price === ""
                ) {
                    alert("Error!");
                    return;
                }

                $http({
                    method: 'POST',
                    url: API_CONFIG.URL + API_CONFIG.POST_PRODUCT,
                    data: this.product
                }).then(
                    function successCallback(response) {
                        console.log('Dane zostały poprawnie wysłane.');
                        console.log(response);
                    },
                    function errorCallback(response) {
                        console.log('Wystąpił problem z wysłaniem danych');
                        console.log(response);
                    }
                );
            };

            $scope.product = {
                name: "",
                sku: "",
                availability: "",
                description: "",
                categories: "",
                created: "",
                updated: "",
                image: ""
            };

            $scope.products = [];

            $http({
                method: 'GET',
                url: API_CONFIG.URL + API_CONFIG.GET_PRODUCT,
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $scope.products = response.data;                  
                },
                function errorCallback(response) {
                }
            );
        }
    ]);
});
