$(function() {
  var mainGroup = $('#main-group'),
      player = $('.player');

  var playerController = {
      left: function() {
        player.attr('x', +player.attr('x') - gridUnit);
      },
      right: function() {
        player.attr('x', +player.attr('x') + gridUnit);
      },
      up: function() {
        player.attr('y', +player.attr('y') - gridUnit);
      },
      down: function() {
        player.attr('y', +player.attr('y') + gridUnit);
      }
  };

  keyController = playerController;

  function zoom(direction, amount) {
    if (direction === 'out') {
      mainGroup.attr('transform', 'translate(' + (transform[0]) + ',' +(transform[1]) +') scale(' + (+transform[2] - amount) + ',' + (+transform[3] - amount) +')' );
    } else {
      mainGroup.attr('transform', 'translate(' + (transform[0]) + ',' +(transform[1]) +') scale(' + (+transform[2] + amount) + ',' + (+transform[3] + amount) +')' );
    }
  }

});
