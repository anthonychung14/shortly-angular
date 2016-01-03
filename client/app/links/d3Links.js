angular.module('shortly.d3', ['d3'])

.directive("barChart", ['d3Service', function(d3Service) {
  return {
    restrict: "EA",
    scope: {
      data: '='
    },
    link: function(scope, elem, attrs){
      d3Service.d3().then(function(d3) {
        console.log('d3 load successful')
        var margin = parseInt(attrs.margin) || 20,
        barHeight = parseInt(attrs.barHeight) || 50,
        barPadding = parseInt(attrs.barPadding) || 10;

        var svg = d3.select(elem[0])
                    .append('svg')
                    .style('width', '100%');
        window.onresize = function() {
          scope.$apply();
        };

        scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
              }, function() {
             scope.render(scope.data);
        });

        scope.$watch('data', function(newVals, oldVals) {
          return scope.render(newVals);
        }, true);

        scope.render = function(data) {
          svg.selectAll('*').remove();
          if(!data) {console.log('no data'); return;}

          var width = d3.select(elem[0]).node().offsetWidth - margin,
              height = scope.data.length * (barHeight + barPadding),
              color = d3.scale.category20(),
              xScale = d3.scale.linear()
                          .domain([0, d3.max(data, function(d) {
                            return d.visits;
                          })])
                          .range([0, width]);
        
          svg.attr('height', height);

          svg.selectAll('rect')
              .data(data).enter()
              .append('rect')
              .attr('height', barHeight)
              .attr('width', 140)
              .text(function(d) {return d.title}) 
              .attr('x', Math.round(margin/2))
              .attr('y', function(d, i) {
                return i * (barHeight + barPadding);
              })
              .attr('fill', function(d) {return color(d.score)})
              .transition()
                .duration(1000)
                .attr('width', function(d) {
                  return xScale(d.visits);
                })
          svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "#fff")
            .attr("y", function(d, i){return i * 27 + 10;})
            .attr("x", 15)
            .text(function(d){return d.title;});
          }
      });
    }
  };
}]);