define([
    'app',
    'services/GridMenuService',
    'services/CreateMenuService'
], function(app) {
    app.controller('CatalogCtrl', [
        '$scope', '$http','GridMenuService', 'CreateMenuService', 'API_CONFIG',
        'Flash', '$location',
        function($scope, $http, GridMenuService, CreateMenuService, API_CONFIG, Flash,
                 $location) {
            $scope.searchText = null;
            $scope.availableCategories = [];
            $scope.products = [];
            $scope.selectedCategory = null;
            $scope.autocompleteDemoRequireMatch = false;

            $scope.showGridMenuComponent = function() {
                GridMenuService();
            };

            $scope.openMenu = function($mdOpenMenu, ev) {
                CreateMenuService.openMenu($mdOpenMenu, ev);
            };

            $scope.submit = function() {
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
                        var message, id;
                        console.log('Dane zostały poprawnie wysłane.');
                        console.log(response);
                        message = '<strong> Gotowe!</strong>  Produkt został poprawnie dodany.';
                        id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        $location.path('admin/#/catalog');
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
                categories: [],
                created: "",
                updated: "",
                image: ""
            };

            $scope.querySearch = function(query) {
                var results = query ? this.availableCategories.filter(this.createFilterFor(query)) : [];
                return results;
            }

            // Create filter function for a query string
            $scope.createFilterFor = function(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(element) {
                    return (element._lowername.indexOf(lowercaseQuery) === 0);
                };
            }

            // Return the proper object when the append is called.
            $scope.transformChip = function(chip) {
                // If it is an object, it's already a known chip
                if (angular.isObject(chip)) {
                    return chip;
                }

                // Otherwise, create a new one
                return { name: chip }
            }

            $http({
                method: 'GET',
                url: API_CONFIG.URL + API_CONFIG.GET_PRODUCT,
            }).then(
                function successCallback(response) {
                    $scope.products = response.data;
                },
                function errorCallback(response) {
                }
            );

            $http({
                method: 'GET',
                url: API_CONFIG.URL + API_CONFIG.GET_CATEGORY,
            }).then(
                function successCallback(response) {
                    var categories = response.data;
                    categories.map(function(element) {
                        element._lowername = element.name.toLowerCase();
                        return element;
                    });

                    $scope.availableCategories = categories;
                },
                function errorCallback(response) {
                }
            );
        }
    ]);
});
