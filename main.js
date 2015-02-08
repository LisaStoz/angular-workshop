var eshop = angular.module('eshop', []);

var BasketController = function($scope, BillService){

  $scope.total = 0;
  $scope.discount = 0;
  $scope.final = 0;
  $scope.quantity = 0;
  $scope.anyProducts = false;

  $scope.addProduct = function(){
    $scope.quantity++;
    $scope.anyProducts = true;
    $scope.total = BillService.calculateTotal($scope.quantity);
    $scope.discount = BillService.calculateDiscount($scope.quantity);
    $scope.final = BillService.calculateFinal($scope.total, $scope.discount);
  };
};

BasketController.$inject = ['$scope', 'BillService'];
eshop.controller('BasketController', BasketController);

var BillService = function(){

  return {
    calculateTotal: function(quantity){
      return quantity * 10;
    },
    calculateDiscount: function(quantity){
      var notEligibleForDiscount = quantity % 3;
      var eligibleForDiscount = quantity - notEligibleForDiscount;
      var free = eligibleForDiscount / 3;
      return free * 10;
    },
    calculateFinal: function(total, discount){
      return total - discount;
    }
  };

};

eshop.factory('BillService', BillService);

var ProductDirective = function(){
  return {
    templateUrl: 'product.html'
  }
};

eshop.directive('product', ProductDirective);
