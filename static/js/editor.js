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

  $(document).on('ui-wants-noun', function () {
    $('.noun-search').show().find('input').focus();
  });

  $('.noun-search').submit(function (event) {
    var searchForm = $(this),
        query = searchForm.find('.search-query').val();

    searchForm.attr('disabled', 'disabled')
    $.ajax('/author/find-noun', {
      data: {noun: query},
      dataType: 'JSON',
      success: function(response) {
        var foundNouns = $('.found-nouns').empty();
        console.log('success', response.glyphs)

        if (response.glyphs.length) {
          response.glyphs.forEach(function(g, i) {
            var li = $( "<li id='glyph-" + g.id + "'>" + g.svg + "</li>" );
            foundNouns.append(li);
          })
        }
        else {
          foundNouns.append($("<li>No nouns like '<em>" + query +"</em>' were found.</li>"))
        }
      },
      error: function(e, m) {
        console.log("ERROR!", e, m);
      },
      complete: function() {
        searchForm.attr('disabled', '')
      }
    });

    event.preventDefault();
    return false;
  })

  keyController = cursorKeyController;
});
