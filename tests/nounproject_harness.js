var np = require('../nounproject.js');

const NOUN = 'book';

np.getGlyphsForNoun(NOUN,function(glyphs) {
    console.log('Found ', glyphs.length, ' glyphs for ', NOUN);
    console.log(JSON.stringify(glyphs));
});