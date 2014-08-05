app.controller("StocksCtrl", ["$scope", "Stock", "$filter", "$http", "$q" function($scope, Stock, $filter, $http, $q) {
$scope.stocks = Stocks.all();
$scope.error = false; 

$scope.select20options = {



};

$scope.watch("newCompany", function(){
	if ($scope.newCompany != "" && $scope.newCompany != null) {
		$scope.createStock();
	}
});

$scope.fetchYahooFinanceData = function(symbol) {
	var deferred = $q.defer();
	var stock = {}; 
	$scope.loading = true; 
	$http({method: "GET", url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D" + "'" + symbol + "'" + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"}).success(function(data, status, headers, config){
	stock.name = data.query.results.quote["Name"];
	stock.bid = data.query.results.quote["Bid"];
	stock.ask = data.query.results.quote["Ask"];
	stock.year_low = data.query.results.quote["YearLow"];
	stock.year_high = data.query.results.quote["YearHigh"];	
	$scope.loading = false; 
	deferred.resolve(stock); 
}).error(function(data, status, headers, config){
	$scope.loading = false; 
	deferred.reject(status);

}); 

return deferred.promise;
};

$scope.stocklist = [{symbol: "AAPL", name: "Apple Inc"}, 
				   {symbol: "MSFT", name: "Microsoft Inc"}]


$scope.createStock = function(){
	var attr = {};
	attr.symbol = $filter("uppercase")($scope.newSymbol); 
	$http({method: GET, url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D" + "" + attr.symbol+ "'" + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
}).success(function(data, status, headers, config) {
	$scope.error = false; 
	attr.name = data.query.results.quote["Name"];
	attr.bid = data.query.results.quote["Bid"];
	attr.ask = data.query.results.quote["Ask"];
	attr.year_low = data.query.results.quote["YearLow"];
	attr.year_high = data.query.results.quote["YearHigh"];
	var newStock = Stock.create(attr);
	$scope.stocks.push(newStock); 
	$scope.newCompany = "";
	$scope.loading = false; 
}).error(function(data, status, headers, config) {
	$scope.error = true; 
	$scope.loading = false; 
});
};





$scope.deleteStock = function(idx){
	$scope.stocks.splice(idx, 1);
	return Stock.delete(id);
};


}]);