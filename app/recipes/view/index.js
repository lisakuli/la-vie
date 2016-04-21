import React from 'react';
import $ from 'jquery';

var ViewRecipe = React.createClass({

    getInitialState: function() {
		return {
			recipe: {}
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

//componentDidMount: legge data inn i state
//render: hente ut data fra state

    render: function() {

        return(
            <div>
                <h1>View Recipe: {this.state.recipe.title}</h1>
            </div>
        )
    }
});

export default ViewRecipe;
