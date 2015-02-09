var eshop = angular.module('eshop', []);

var BasketController = function($scope, BillService){

  $scope.total = 0;
  $scope.discount = 0;
  $scope.final = 0;
  $scope.product = {
    quantity: 0
  };
  $scope.anyProducts = false;

  var calculateFigures = function(){
    $scope.anyProducts = ($scope.product.quantity > 0);
    $scope.total = BillService.calculateTotal($scope.product.quantity);
    $scope.discount = BillService.calculateDiscount($scope.product.quantity);
    $scope.final = BillService.calculateFinal($scope.total, $scope.discount);
  }

  $scope.addProduct = function(){
    $scope.product.quantity++;
    calculateFigures();
  };

  $scope.$watch('product.quantity', function(){
    calculateFigures();
  }, true);
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

eshop.service('BillService', BillService);

var ProductDirective = function(){
  return {
    templateUrl: 'product.html'
  };
};

eshop.directive('product', ProductDirective);
