var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.configure(function () {
    // Serve static files
    app.use('/static',express.static('static'));
});

app.get('/', function(req, res){
  res.send('games \'n glpyhs!');
});

app.get('/author', function(req, res) {
    res.render('author');
});

app.listen(3000);