import ListRecipes from './list';
import EditRecipe from './edit';
import ViewRecipe from './view';

import React from 'react';

var Recipes = React.createClass({

	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}

});

export { Recipes, ListRecipes, EditRecipe, ViewRecipe };
