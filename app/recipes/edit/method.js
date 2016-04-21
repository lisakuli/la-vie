import React from 'react';

var Method = React.createClass({

    getInitialState: function() {
        return {
            method: this.props.value,
        };
    },

    handleChange: function(event, index) {
        var newSteps = this.state.method.slice(0);
        newSteps[index] = event.target.value;
        this.setState({method: newSteps});
    },

    onAddStep: function() {
        var newSteps = this.state.method.slice(0);
        newSteps.push('');
        this.setState({method: newSteps});
    },

    handleMethodBlur: function() {
        this.props.onMethodChange(this.state.method);
    },

    render: function() {
        return(
            <div>
                <h2 style={style.h2}>Method</h2>
                {
                    this.state.method.map((step, i) =>
                        <textarea
                            style={style.textarea}
                            key={i}
                            value={step}
                            placeholder="Insert step"
                            onChange={event => this.handleChange(event, i)}
                            onBlur={this.handleMethodBlur}
                            value={this.state.method[i]}
                        />
                    )
                }
                <button onClick={this.onAddStep}>Add step</button>
            </div>
        )
    }
})

var style = {

    h2: {
        fontSize: "18px",
        fontFamily: "'Open Sans', sans-serif"
    },

    textarea: {
        width: "100%",
        border: "none",
        minHeight: "80px",
        fontFamily: "'Open Sans', sans-serif"
    }
}

export default Method;
