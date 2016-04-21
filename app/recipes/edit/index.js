import React from 'react';
import $ from 'jquery';

import Ingredients from './ingredients';
import Method from './method';

var EditRecipe = React.createClass({

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

    handleTitleChange: function(event) {
        var newTitle = event.target.value;
        var recipe = Object.assign({}, this.state.recipe, {title: newTitle});
        this.setState({recipe: recipe});
    },

    handleDescriptionChange: function(event) {
        var newDescription = event.target.value;
        var recipe = Object.assign({}, this.state.recipe, {description: newDescription});
        this.setState({recipe: recipe});
    },

    pushRecipe: function() {
        $.ajax({
			method: "PUT",
			url: "http://localhost:3000/recipe/" + this.props.params.id,
            contentType: "application/json",
            data: JSON.stringify(this.state.recipe)
        }).done(function() {
            console.log("Update success");
        })
    },

    onIngredientsChange: function(ingredients) {
        var recipe = this.state.recipe;
        recipe.ingredients = ingredients;
        this.setState({recipe: recipe});
        this.pushRecipe();
    },

    onMethodChange: function(method) {
        var recipe = this.state.recipe;
        recipe.method = method;
        this.setState({recipe: recipe});
        this.pushRecipe();
    },

    render: function() {
        var recipe = this.state.recipe;

        if(recipe === null) {
            return (<div />)
        } else {
            return (
                <div style={style.view}>
                    <input type="text"
                        value={recipe.title}
                        style={style.title}
                        onChange={this.handleTitleChange}
                        onBlur={this.pushRecipe} />
                    <input type="text"
                        value={recipe.description}
                        style={style.input}
                        onChange={this.handleDescriptionChange}
                        onBlur={this.pushRecipe} />
                    <Ingredients value={recipe.ingredients} onIngredientsChange={this.onIngredientsChange} />
                    <Method value={recipe.method} onMethodChange={this.onMethodChange} />
                </div>
            )
        }
    }
});

var style = {
    view: {
        width: "55%",
        margin: "0 auto",
        border: "none"
    },

    input: {
        display: "block",
        width: "100%",
        fontSize: "14px",
        border: "none",
        fontFamily: "'Open Sans', sans-serif"
    }
}

style.title = Object.assign({}, style.input, {
    fontSize: "28px"
});

export default EditRecipe;
