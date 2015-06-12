var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
 
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));
 
// Create a route to render the home page
app.get('/', function(request, response) {
    response.render('some html template');
});
 
// Create a route that will handle the form submission

 
// Start the web application, and serve on local port 3000
app.listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port') + '....')
});
