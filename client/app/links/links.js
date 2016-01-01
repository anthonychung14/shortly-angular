angular.module('shortly.links', [])

.controller('LinksController', function($scope, Links) {
  //Why isn't this getting wiped every single time if we couldn't declare an empty array for links?
  $scope.data = {};

  Links.getAll().then(function(data) {
    $scope.data.links=data;
  });
});