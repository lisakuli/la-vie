import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

var ViewRecipe = React.createClass({

    getInitialState: function() {
		return {
			recipe: null
		}
	},

    componentDidMount: function() {
		$.ajax({
			method: "GET",
			url: "http://localhost:3000/recipe/" + this.props.params.id
		}).done(function(data) {
			console.log(data);
            this.setState({ recipe: data });
		}.bind(this))
	},

    getAmount: function({amount, unit, displayUnit} = ingredient) {
        var conversionRates = {
            g: {
                g: 1,
                kg: 0.001
            },
            ml: {
                ml: 1,
                dl: 0.01,
                l: 0.001
            },
            tbsp: { tbsp: 1 },
            tsp: { tsp: 1 }
        }

        var newAmount = amount * conversionRates[unit][displayUnit];
        return newAmount;
    },

    render: function() {
        var recipe = this.state.recipe;

        if(recipe === null) {
            return (<div />)
        } else {

            return(
                <div style={style.div}>
                    <h1>{recipe.title}</h1>
                    <p style={style.p}>{recipe.description}</p>
                    <h2 style={style.h2}>Ingredients</h2>
                    <ul>
                    {
                        recipe.ingredients.map((ingredient, i) =>
                            <li key={i} style={style.list}>
                                {ingredient.ingredient} {this.getAmount(ingredient)} {ingredient.displayUnit}
                            </li>
                        )
                    }
                    </ul>
                    <h2 style={style.h2}>Method</h2>
                    {
                        recipe.method.map((step, i) =>
                            <p key={i} style={style.p}>{step}</p>
                        )
                    }

                    <Link to={`/edit/${recipe._id}`}>
						<div style={style.recipeCard}>
						 	<button type="button">Edit recipe</button>
						</div>
					</Link>

                </div>
            )
        }
    }
})

var style = {
    div: {
        width: "55%",
        margin: "0 auto",
        border: "none"
    },

    list: {
        fontFamily: "'Open Sans', sans-serif",
        fontSize: "14px"
    },

    h2: {
        fontFamily: "'Open Sans', sans-serif",
        fontSize: "22px"
    },

    p: {
        fontFamily: "'Open Sans', sans-serif",
        fontSize: "14px"
    }
};

//style.title = Object.assign({}, style.input, {
//    fontSize: "28px"
//});

export default ViewRecipe;
