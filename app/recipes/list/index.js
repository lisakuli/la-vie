import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import $ from 'jquery';

var ListRecipes = React.createClass({

	getInitialState: function() {
		return {
			recipes: []
		}
	},

	componentDidMount: function() {
		$.ajax({
			method: "GET",
			url: "http://localhost:3000/recipe"
		}).done(function(data) {
			this.setState({ recipes: data });
		}.bind(this))
	},

	render: function() {
		var recipes = this.state.recipes.map(function(recipe) {
			return (
				<Col md={3} key={recipe._id}>
					<Link to={`/view/${recipe._id}`}>
						<div style={style.recipeCard}>
						 	<img style={style.img} src={recipe.img} />
							<h1 style={style.h1}>{recipe.title}</h1>
							<p style={style.p}>{recipe.description}</p>
						</div>
					</Link>
				</Col>
			)
		});

		return (
			<div style={style.container}>
				<Grid style={style.grid} fluid={ true }>
					<Row>
						{recipes}
					</Row>
				</Grid>
			</div>
		);
	}
});

var style = {
	container: {
		float: "right",
		width: "calc(100% - 280px)",
		background: "#FBFBFB"
	},

	grid: {
		margin: "30px 15px"
	},

	recipeCard: {
		background: "#FFF",
	    borderRadius: "2px",
	    border: "1px solid #ECECEC",
	    height: "300px",
	    marginBottom: "30px"
	},

	img: {
		width: "100%",
	    height: "180px",
	    objectFit: "cover"
	},

	h1: {
		fontSize: "18px",
		padding: "0 10px"
	},

	p: {
		margin: "0 0 10px",
		padding: "0 10px"
	}
}

export default ListRecipes;
