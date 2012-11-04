$(function() {
  var mainGroup = $('#main-group'),
      player = $('.player'),
      cursor = $('.cursor');

  var cursorKeyController = {
      left: function() {
        cursor.attr('x', +cursor.attr('x') - gridUnit);
      },
      right: function() {
        cursor.attr('x', +cursor.attr('x') + gridUnit);
      },
      up: function() {
        cursor.attr('y', +cursor.attr('y') - gridUnit);
      },
      down: function() {
        cursor.attr('y', +cursor.attr('y') + gridUnit);
      },
      alpha: function(keyCode) {
          var keyChar = String.fromCharCode(keyCode);
          if (keyChar == 'P') {
            // Move player starting position to cursor
            player.attr('x',cursor.attr('x'));
            player.attr('y',cursor.attr('y'));
          }
          else if (keyChar == 'W') {
            // Create a medium wall at the cursor
            var newWall= document.createElementNS(SVG_NS,"rect");
            newWall.width.baseVal.value=gridUnit;
            newWall.height.baseVal.value=gridUnit;
            newWall.setAttribute('x',cursor.attr('x'));
            newWall.setAttribute('y',cursor.attr('y'));
            newWall.style.fill='url(#wall-medium)';
            $('#main-group').append(newWall);
          }
          else if (keyChar == "N") {
            $(document).trigger('ui-wants-noun')
          }
      }
  };

  keyController = cursorKeyController;
});

