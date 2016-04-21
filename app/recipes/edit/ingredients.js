import React from 'react';

var Ingredients = React.createClass({

    getInitialState: function() {
        return {
            ingredients: this.props.value,
            newIngredient: {
                ingredient: '',
                amount: 0,
                displayUnit: 'kg'
            }
        };
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

    handleIngredientChange: function(event) {
        var newIngredient = Object.assign({}, this.state.newIngredient);
        newIngredient.ingredient = event.target.value;
        this.setState({newIngredient: newIngredient});
    },

    handleAmountChange: function(event) {
        var newIngredient = Object.assign({}, this.state.newIngredient);
        newIngredient.amount = event.target.value;
        this.setState({newIngredient: newIngredient});
    },

    handleDisplayUnitChange: function(event) {
        var newIngredient = Object.assign({}, this.state.newIngredient);
        newIngredient.displayUnit = event.target.value;
        this.setState({newIngredient: newIngredient});
    },

    onAddIngredient: function() {
        var unitMap = {
            g: "g",
            kg: "g",
            l: "ml",
            dl: "ml",
            ml: "ml",
            tbsp: "tbsp",
            tsp: "tsp"
        };

        var conversionRates = {
            g: 1,
            kg: 1000,
            ml: 1,
            dl: 100,
            l: 1000,
            tbsp: 1,
            tsp: 1
        };

        var newIngredients = this.state.ingredients.slice(0);
        var newIngredient = Object.assign({}, this.state.newIngredient);
        newIngredient.unit = unitMap[newIngredient.displayUnit];
        newIngredient.amount *= conversionRates[newIngredient.displayUnit];
        newIngredients.push(newIngredient);

        this.setState({
            ingredients: newIngredients,
            newIngredient: {ingredient: '', amount: 0, displayUnit: 'kg'}
        });

        this.props.onIngredientsChange(newIngredients);
    },

    render: function() {
        return(
            <div>
                <h2 style={style.h2}>Ingredients</h2>

                <ul>
                    {
                        this.state.ingredients.map((ingredient, i) =>
                            <li key={i} style={style.list}>
                                {ingredient.ingredient} {this.getAmount(ingredient)} {ingredient.displayUnit}
                            </li>
                        )
                    }
                </ul>

                <input type="text" placeholder="Add ingredient"
                    style={style.addIngredient}
                    onChange={this.handleIngredientChange}
                    value={this.state.newIngredient.ingredient} />

                <input type="number" step="0.1" min="0" placeholder="Amount"
                    style={style.ingredientAmount}
                    onChange={this.handleAmountChange}
                    value={this.state.newIngredient.amount} />

                    <select onChange={this.handleDisplayUnitChange} value={this.state.newIngredient.displayUnit}>
                        <option value="l">l</option>
                        <option value="dl">dl</option>
                        <option value="ml">ml</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                    </select>

                <button onClick={this.onAddIngredient}>Add ingredient</button>
            </div>
        )
    }
})

var style = {
    //view
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
    },

    h2: {
        fontSize: "18px",
        fontFamily: "'Open Sans', sans-serif"
    },

    list: {
        fontFamily: "'Open Sans', sans-serif",
        fontSize: "14px"
    }
};

style.title = Object.assign({}, style.input, {
    fontSize: "28px"
});

style.addIngredient = Object.assign({}, style.input, {
    width: "80%",
    display: "inline-block"
})

style.ingredientAmount = Object.assign({}, style.input, {
    width: "10%",
    display: "inline-block"
})

export default Ingredients;
