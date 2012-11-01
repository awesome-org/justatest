var jsdom = require("jsdom");
var fs = require("fs");
var jquerySrc = fs.readFileSync("./jquery.js").toString();

function getGlyphsForNoun(noun,callback) {
    jsdom.env({
      html: "http://thenounproject.com/noun/" + noun + "/",
      src: jquerySrc,
      done: function (errors, window) {
        var $ = window.$;
        var liIcons = $("li.icon");
        var glyphs = $.map(liIcons,function(el,idx) {
            return {
                // `id`s are formatted like otherIcon-2768
                id: el.id.split('-')[1],
                svg: $(el).find('.icon').html().trim()
            };
        });
        // Throw away last glyph -- it's just an "upload one" icon
        glyphs.splice(glyphs.length-1,1);
        callback(glyphs);
      }
    });
}

exports['getGlyphsForNoun'] = getGlyphsForNoun;