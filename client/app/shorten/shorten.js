angular.module('shortly.shorten', [])

.controller('ShortenController', function($scope, $location, Links) {
  // Your code here
  $scope.link = {};
  console.log('>>>>>>>NEWLINK IS>>>>', $scope.newLink)
  $scope.addLink = function() {
    $scope.link.url = $scope.newLink;
    Links.addOne($scope.link).then(function(data) {
      console.log($scope.link.url, '>>>>>>>>>>>working!>>>>>>>>')
      return data;
    });
  };
});

// http://www.google.com