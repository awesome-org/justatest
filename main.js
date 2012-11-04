var express = require('express');
var app = express();
var nounProject = require('nounproject');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.configure(function () {
    // Serve static files
    app.use('/static',express.static('static'));
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/author', function(req, res) {
  res.render('author');
});

app.get('/author/find-noun', function(req, res) {
  var query = req.query["noun"];
  if (query && query.length) {
    nounProject.getGlyphsForNoun(query, function(glyphs) {
      res.json(200, { glyphs: glyphs });
    });
  } else {
    res.send(400, { error: 'No noun specified' });
  }
});

app.listen(3000);