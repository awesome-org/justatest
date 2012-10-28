$(function() {
  var player = $('#player'),
      gridUnit = 30;

  $(document).keydown(function(e) {
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
});
