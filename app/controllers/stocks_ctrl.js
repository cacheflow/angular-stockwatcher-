app.controller("StocksCtrl", ["scope", "$resource", function($scope, $resource) {
$scope.stocks = Stocks.all();

$scope.deleteStock = function(idx){
	$scope.stocks.splice(idx, 1);
	return Stock.delete(id);
};


}]);