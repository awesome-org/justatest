$(function() {
  var mainGroup = $('#main-group'),
      player = $('.player'),
      gridUnit = 30;

  $(document).keydown(function(e){
    switch(e.which) {
      case 37:
        player.attr('x', +player.attr('x') - gridUnit);
        break;
      case 38:
        player.attr('y', +player.attr('y') - gridUnit);
        break
      case 39:
        player.attr('x', +player.attr('x') + gridUnit);
        break;
      case 40:
        player.attr('y', +player.attr('y') + gridUnit);
        break
    }
  });

  function zoom(direction, amount) {
    console.log(transform)
    if (direction === 'out') {
      mainGroup.attr('transform', 'translate(' + (transform[0]) + ',' +(transform[1]) +') scale(' + (+transform[2] - amount) + ',' + (+transform[3] - amount) +')' );
    } else {
      mainGroup.attr('transform', 'translate(' + (transform[0]) + ',' +(transform[1]) +') scale(' + (+transform[2] + amount) + ',' + (+transform[3] + amount) +')' );
    }
  }

});
