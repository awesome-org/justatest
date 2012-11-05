'use-strict';
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
        $scope.selectedGlyphIndex = 0;
        $scope.glyphs[0].selectedClass = 'selected';
      }
      else {
        $scope.glyphs = [];
        $scope.statusMessage = "A noun like '" + query + "' could not be found.";
      }
    }).error(function(data, status) {
      $scope.statusMessage = data.error;
    });
    return false;
  };

  $scope.handleKeypress = function(key, event) {
    if (typeof $scope.selectedGlyphIndex == 'undefined') return;
    switch(key) {
      case 13: //enter
        $scope.placeGlyph($scope.glyphs[$scope.selectedGlyphIndex]);
        break;
      case 38: //up
        if ($scope.selectedGlyphIndex > 0) {
          delete $scope.glyphs[$scope.selectedGlyphIndex].selectedClass;
          $scope.selectedGlyphIndex--;
        }
        break;
      case 40: //down
        if ($scope.selectedGlyphIndex < $scope.glyphs.length - 1) {
          delete $scope.glyphs[$scope.selectedGlyphIndex].selectedClass;
          $scope.selectedGlyphIndex++;
        }
        break;
    }
    $scope.glyphs[$scope.selectedGlyphIndex].selectedClass = 'selected';
    // TODO: the following is not working for some reason, and should be fixed (or removed)
    if (key === 13 || key === 38 || key === 40) {
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  };

  $scope.placeGlyph = function(glyph) {
    var glyphElement = $(glyph.svg).last()[0]; // using last because some of the NP svg data contains comment and text nodes
    var cursor = $('.cursor');

    $('svg#editor').append(glyphElement); // element must be in the DOM for glyphify to set a bounding box
    glyphify(glyphElement).attr('x', cursor.attr('x')).attr('y', cursor.attr('y'));
  };

  $scope.resultClicked = function($event) {
    $scope.placeGlyph({svg: $($event.target).closest('svg').clone()});
  };
}

function GridCtrl($scope, $element) {
  $scope.playerPosition = [5,10]
  $scope.player = {
    x: 10,
    y: 120
  }
}

glypharoEditor.directive('onKeyupFn', function() {
  return function(scope, elm, attrs) {
    //Evaluate the variable that was passed
    //In this case we're just passing a variable that points
    //to a function we'll call each keyup
    var keyupFn = scope.$eval(attrs.onKeyupFn);
    elm.bind('keyup', function(evt) {
      //$apply makes sure that angular knows
      //we're changing something
      scope.$apply(function() {
        keyupFn.call(scope, evt.which, evt);
      });
    });
  };
});


