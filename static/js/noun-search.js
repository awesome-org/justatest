var glypharoEditor = angular.module('glypharoEditor', []);

function NounSearchCtrl($scope, $element, $http) {

  $scope.url = '/author/find-noun';

  $scope.submit = function(query) {
    $scope.statusMessage = '';
    $http({
      method: "get",
      dataType: "JSON",
      url: $scope.url,
      params: {
        noun: query
      }
    }).success(function(data, status) {
      if (data.glyphs && data.glyphs.length) {
        $scope.glyphs = data.glyphs;
      }
      else {
        $scope.statusMessage = "No matching nouns matching '" + query + "' could be found.";
      }
    }).error(function(data, status) {
      $scope.statusMessage = data.error;
    });
    return false;
  };
}
