
import jQuery from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col, Button, Jumbotron } from 'react-bootstrap';


let recipes = [
	{
		title: "Tikka Masala",
		description: "Godt på onsdager"
	},
	{
		title: "Spaghetti Carbonara",
		description: "Pasta er godt noen ganger"
	}
]


let RecipeView = React.createClass({
	getInitialState() {
		return {recipes: []};
	},

	componentDidMount() {
		jQuery.ajax({
			url: "http://localhost:3000/recipe",
			dataType: "json",
			cache: false,
			success: function(data) {
				console.log(data);
				this.setState({recipes: data})
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(status, err.toString())
			}.bind(this)
		});
	},

	render() {
		return (
			<Grid style={{marginTop: 20, marginBottom: 20}}>
				<Row>
					<Jumbotron>
						<h1>La Vie</h1>
						<p>Dette er en webapplikasjon som hjelper deg med å holde ditt liv organisert.</p>
						<p><Button bsStyle="primary">Finn ut mer her</Button></p>
					</Jumbotron>
					<RecipeList recipes={this.state.recipes}></RecipeList>
				</Row>
			</Grid>
		);
	}
});


class RecipeList extends React.Component {
	render() {
		let recipeNodes = this.props.recipes.map((recipe) => {
			return <Recipe key={recipe._id} title={recipe.title} description={recipe.description}></Recipe>
		});

		return (
			<div className="recipe-list">
				{recipeNodes}
			</div>
		);
	}
}

class Recipe extends React.Component {
	render() {
		return (
			<div className="recipe">
				<h1 className="title">{this.props.title}</h1>
				<p className="description">{this.props.description}</p>
				<Button bsStyle="primary">View</Button>
			</div>
		);
	}
}

ReactDOM.render(<RecipeView/>, document.getElementById('main'));