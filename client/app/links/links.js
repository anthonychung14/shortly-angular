angular.module('shortly.links', [])

.controller('LinksController', function($scope, Links) {

  $scope.data = {};
  $scope.visits = []

  Links.getAll().then(function(data) {
    $scope.data.links=data;
  }).then(function() {
    for (var i = 0; i < $scope.data.links.length; i++) {
      $scope.visits.push({
          title: $scope.data.links[i].title,
          visits: $scope.data.links[i].visits
        })
    }
  });
});

