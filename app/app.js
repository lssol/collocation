angular.module('roundFilter', []).filter('deuxiemeDecimal', function() {
  return function(input) {
    return Math.round(input * 100) / 100;
  };
});

var app = angular.module('angularjs-starter', ['roundFilter']);

var controller = app.controller('MainCtrl', ['$scope', '$log', function($scope, $log) {
  $scope.message = "message";
  $scope.items = [{id: 0}, {id: 1}];
  $scope.totalPrice=0;
  $scope.users = ['Sacha', 'Sarah', 'Florian', 'Maxime'];
  $scope.payTable = {};

    for (var i = 0; i < $scope.users.length; i++) {
  //    $scope.message+=$scope.users[i] + '\n';
      $scope.payTable[$scope.users[i]] = 0;
    }

  $scope.addNewChoice = function() {
    var newItemNo = $scope.items.length;
    $scope.items.push({'id':newItemNo});
  };

  $scope.removeChoice = function() {
    var lastItem = $scope.items.length-1;
    $scope.items.splice(lastItem);
  };

  $scope.calculateHeight = function(price) {
    var maxHeight = 200;
    var minHeight = 20;
    return {'height': Math.round(price*maxHeight/$scope.totalPrice+minHeight) + 'px'};
  };

  $scope.calculate = function() {
    var i;
    var count = 0;
    var toPay = 0;
    $scope.totalPrice = 0;

    for (var nom in $scope.payTable) {
      $scope.payTable[nom] = 0;
    }

    for (i = 0; i < $scope.items.length; i++) {
      if($scope.items[i].price > 0) {
        $scope.totalPrice += $scope.items[i].price;
        count = 0;
        for (var nom in $scope.items[i].users) {
          if ($scope.items[i].users[nom]) count++;
        }

        toPay = ($scope.items[i].price) / count;

        //$scope.message += ("toPay : " + toPay);
        // Building the payTable
        for (var nom in $scope.payTable) {
          if ($scope.items[i].users[nom]) $scope.payTable[nom] += toPay;
        }
      }
    }
  };

}]);

controller.directive('changeFocus', ['$log', function($log)  {

  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('keyup', function (e) {
        // up arrow
        if (e.keyCode == 38) {
          if(!scope.$first) {

            elem[0].previousElementSibling.focus();
          }
        }
        // down arrow
        else if (e.keyCode == 13) {
          if(!scope.$last) {
            $log.log(elem[0].name);

          }
        }
      });
    }
  };
}]);
