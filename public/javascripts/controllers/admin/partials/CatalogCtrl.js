define([
    'app',
    'services/GridMenuService',
    'services/CreateMenuService'
], function(app) {
    app.controller('CatalogCtrl', [
        '$scope', '$http','GridMenuService', 'CreateMenuService', 'API_CONFIG',
        'Flash', '$location', '$routeParams', 'STATUSES', '$mdDialog', '$mdToast',
        function($scope, $http, GridMenuService, CreateMenuService, API_CONFIG, Flash,
                 $location, $routeParams, STATUSES, $mdDialog, $mdToast)
        {
            var sku = $routeParams.sku;
            $scope.searchText = null;
            $scope.availableCategories = [];
            $scope.products = [];
            $scope.selectedCategory = null;
            $scope.autocompleteDemoRequireMatch = false;

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

            $scope.getProduct = function() {
                $http({
                    method: 'GET',
                    url: API_CONFIG.URL + API_CONFIG.PRODUCT_ACTION_GET + '/' + sku
                }).then(
                    function successCallback(response) {
                        $scope.product = response.data[0];
                        $scope.product.availability = new Date(response.data[0].availability);
                        console.log(response.data[0]);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            $scope.showGridMenuComponent = function() {
                GridMenuService();
            };

            $scope.openMenu = function($mdOpenMenu, ev) {
                CreateMenuService.openMenu($mdOpenMenu, ev);
            };

            $scope.delete = function(sku) {
                $http({
                    method: 'GET',
                    url: API_CONFIG.URL + API_CONFIG.PRODUCT_ACTION_DELETE + '/' + sku,
                }).then(
                    function successCallback(response) {
                        var message, id;
                        console.log('Dane zostały poprawnie wysłane.');
                        console.log(response);

                        if (response.data.status === STATUSES.SUCCESS) {
                            message = 'Gotowe!  Produkt został poprawnie usunięty.';
                            //id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        } else {
                            message = 'Wystąpił błąd!  Produkt nie może zostać usunięty.';
                            //id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        }

                        $mdToast.show(
                            $mdToast.simple()
                            .textContent(message)
                            .position('top right')
                            .hideDelay(1500)
                        );

                        $scope.products = $scope.getData();
                    },
                    function errorCallback(response) {
                        console.log('Wystąpił problem z wysłaniem danych');
                        console.log(response);
                    }
                );
            }

            $scope.showConfirm = function(ev, product) {
                var confirm = $mdDialog.confirm()
                    .title('Czy na pewno chcesz usunąć poniższy produkt?')
                    .textContent(product.name + ' - ' + product.sku)
                    .ariaLabel('Confirm deleting product')
                    .targetEvent(ev)
                    .ok('Tak, usuń!')
                    .cancel('To chyba pomyłka, anuluj');

                $mdDialog.show(confirm).then(function() {
                        $scope.delete(product.sku);
                    }, function() {
                        // ---
                    }
                );
            };

            $scope.validateProductBeforeSend = function() {
                if (this.product.name === "" || this.product.sku === "" ||
                    this.product.availability === "" || this.product.description === "" ||
                    this.product.price === ""
                ) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Żadne pole nie może być puste!')
                        .position('top right')
                        .hideDelay(1500)
                    );

                    return;
                }
            }

            $scope.createProduct = function() {
                $scope.validateProductBeforeSend();
                $http({
                    method: 'POST',
                    url: API_CONFIG.URL + API_CONFIG.PRODUCT_ACTION_CREATE,
                    data: this.product
                }).then(
                    function successCallback(response) {
                        var message, id;

                        if (response.data.status === STATUSES.SUCCESS) {
                            message = 'Gotowe! Produkt został poprawnie dodany.';
                            //id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        } else {
                            message = 'Wystąpił błąd! Produkt nie został poprawnie dodany.';
                            //id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        }

                        $mdToast.show(
                            $mdToast.simple()
                            .textContent(message)
                            .position('top right')
                            .hideDelay(1500)
                        );

                        $location.path('/catalog');
                    },
                    function errorCallback(response) {
                        console.log('Wystąpił problem z wysłaniem danych');
                        console.log(response);
                    }
                );
            }

            $scope.updateProduct = function() {
                $scope.validateProductBeforeSend();
                $http({
                    method: 'POST',
                    url: API_CONFIG.URL + API_CONFIG.PRODUCT_ACTION_EDIT + '/' + this.product.sku,
                    data: this.product
                }).then(
                    function successCallback(response) {
                        var message, id;

                        if (response.data.status === STATUSES.SUCCESS) {
                            message = 'Gotowe! Produkt został poprawnie zaaktualizowany.';
                            //id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        } else {
                            message = 'Wystąpił błąd! Produkt nie został poprawnie zaaktualizowany.';
                            //id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
                        }

                        $mdToast.show(
                            $mdToast.simple()
                            .parent(angular.element(document.body))
                            .textContent(message)
                            .position('top right')
                            .hideDelay(1500)
                        );

                        $location.path('/catalog');
                    },
                    function errorCallback(response) {
                        console.log('Wystąpił problem z wysłaniem danych');
                        console.log(response);
                    }
                );
            }

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
            };

            $scope.getData = function() {
                $http({
                    method: 'GET',
                    url: API_CONFIG.URL + API_CONFIG.PRODUCT_ACTION_GET_ALL,
                }).then(
                    function successCallback(response) {
                        $scope.products = response.data;
                    },
                    function errorCallback(response) {
                    }
                );
            };

            $scope.getCategories = function() {
                $http({
                    method: 'GET',
                    url: API_CONFIG.URL + API_CONFIG.CATEGORY_ACTION_GET_ALL,
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
                        // ---
                    }
                );
            };

            $scope.$on('$viewContentLoaded', function ($evt, data) {
                $scope.getData();
                $scope.getCategories();
            });

            // edit
            if (undefined !== sku) {
                $scope.getProduct();
            }
        }
    ]);
});
