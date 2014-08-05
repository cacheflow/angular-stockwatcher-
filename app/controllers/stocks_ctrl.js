app.controller("StocksCtrl", ["scope", "$resource", function($scope, $resource) {
$scope.stocks = Stocks.all();


}]);