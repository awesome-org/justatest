const SVG_NS="http://www.w3.org/2000/svg";

var keyController = {};

const gridUnit = 30;

$(function() {
    setupInput();
});

function setupInput() {
    $(document).keydown(function(e){
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