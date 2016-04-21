import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Main from './main';
import { Dashboard } from './dashboard';
import { Recipes, ListRecipes, EditRecipe, ViewRecipe } from './recipes';

var App = React.createClass({
	render: function() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Main}>
					<IndexRoute component={Dashboard} />
					<Route path="recipes" component={Recipes}>
						<IndexRoute component={ListRecipes} />
						<Route path="/edit/:id" component={EditRecipe} />
						<Route path="/view/:id" component={ViewRecipe} />
					</Route>
				</Route>
			</Router>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('main'));
