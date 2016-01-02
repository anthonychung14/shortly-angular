angular.module('shortly.shorten', [])

.controller('ShortenController', function($scope, $location, Links) {
  // Your code here
  $scope.link = {};
  $scope.addLink = function() {
    $scope.link.url = $scope.newLink;
    Links.addOne($scope.link).then(function(data) {
      return data;
    });
  };
});

// http://www.google.com