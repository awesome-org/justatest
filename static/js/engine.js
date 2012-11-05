const SVG_NS="http://www.w3.org/2000/svg";

var keyController = {};

const gridUnit = 30;

$(function() {
    setupInput();
});

function setupInput() {
    $(document).keydown(function(e){
        if ($(".noun-search").is(":focus")) return; // hack, since stopPropogation() isn't working on the search form
        const keyMappings = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        if (keyMappings[e.which] && keyController[keyMappings[e.which]]) {
            keyController[keyMappings[e.which]]();
            // Prevent default actions, eg. the user scrolling the page
            // with arrow keys.
            e.preventDefault();
        }
        if (keyController.alpha) {
            keyController.alpha(e.which);
        }
    });
}

function glyphify(svgObj,backgroundColor,foregroundColor) {
    // NB: getBBox will return a 0x0 bbox unless svgObj is already added to the DOM.
    var boundingRect = svgObj.getBBox();
    var largerAxis = boundingRect.width > boundingRect.height ? 'width' : 'height';
    var smallerAxis = largerAxis == 'height' ? 'width' : 'height';
    var largerAxisLength = parseInt(Math.max(1,boundingRect[largerAxis]/boundingRect[smallerAxis])) * gridUnit;
    var $svgObj = $(svgObj);

    $svgObj.attr(largerAxis, largerAxisLength.toString() + 'px').attr(smallerAxis, gridUnit.toString() + 'px');
    return $svgObj;
}


// TODO: Remove this. It's just a testing function that exists until glyphify
// is integrated into the glyph chooser.
function testGlyphify(svgCode) {
    var newTiger = $(svgCode);
    newTiger.attr('x',120);
    newTiger.attr('y',120);
    $('#editor').append(newTiger);
    glyphify(newTiger.get()[0]);
    return newTiger.get()[0];
}