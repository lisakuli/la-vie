var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/la-vie');

var recipeSchema = mongoose.Schema({
	title: String,
	description: String,
	thumbnail: String,
	link: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);

//---------------------------------------
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/recipe', function(req, res) {
	Recipe.find() // Returns a promise
		.then(function(recipes) {
			res.json(recipes);
		})
		.catch(function(err) {
			console.log(err);
			res.status(500).json(err);
		})
})


app.post('/recipe', function(req, res) {
	console.log(req.body);
	var body = req.body;

	//todo: check if body is valid input
	var recipe = new Recipe(body);

	recipe.save(function(err, recipe){
		if (err) return res.json(err);
		res.sendStatus(200);
	});
	
});


app.listen(3000, function() {
	console.log("Lisa er kul");
});