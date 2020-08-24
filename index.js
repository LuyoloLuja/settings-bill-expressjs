const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const SettingsBill = require('./settings-bill');
const settingsBill = SettingsBill();

// configure handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// make public folder visible -- (a middleware)
app.use(express.static('public'));

// parse appliction
app.use(bodyParser.urlencoded({ extended: false }))

// parse application / json
app.use(bodyParser.json());

// getting our routes
app.get('/', function(req, res){
	res.render('index', {
		settings: settingsBill.getSettings()
	});
});

app.post('/settings', function(req, res){

	settingsBill.setSettings({
		callCost: req.body.callCost,
		smsCost: req.body.smsCost,
		warningLevel: req.body.warningLevel,
		criticalLevel: req.body.criticalLevel
	});

	// console.log(settingsBill.getSettings());
	res.redirect('/');
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