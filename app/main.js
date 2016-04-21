import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import { Link } from 'react-router';

var Main = React.createClass({
	render: function() {
		return (
			<div style={style.main}>
                <Sidebar />
                <Content>
				    {this.props.children}
                </Content>
			</div>
		);
	}
});

var Sidebar = React.createClass({
    render: function() {
        var routes = [
            { name: '/', icon: 'explore' },
            { name: '/recipes', icon: 'local_dining' }
        ];

        return (
            <div style={style.sidebar}>
                {routes.map((route, i) =>
                    <Link to={route.name} key={i}>
                        <FontIcon 
                            className="material-icons" 
                            style={style.icon}
                            color={Colors.grey300}
                            hoverColor={Colors.grey100}>
                            {route.icon}
                        </FontIcon>
                    </Link>
                )}
            </div>
        )
    }
});

var Content = React.createClass({
    render: function() {
        return (
            <div style={style.content}>
                {this.props.children}
            </div>
        );
    }
});

var style = {
    main: {
        display: "flex",
        height: "100%"
    },
    sidebar: {
        width: "64px",
        background: "#5A5A5A"
    },
    route: {
    },
    icon: {
        cursor: "pointer",
        margin: "16px",
        fontSize: "32px"
    }
}

export default Main;
