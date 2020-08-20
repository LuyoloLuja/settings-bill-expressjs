const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

// configure handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// make public folder visible -- a middleware;
app.use(express.static('public'));

// getting our routes
app.get('/', function(req, res){
	res.render('index');
});
app.post('/settings', function(req, res){

})
app.post('/action', function(req, res){	
})
app.get('/actions', function(req, res){
	
})
app.get('/actions/:type', function(req, res){
	
})



const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
	console.log('App started at:', PORT);
});