module.exports = {
    entry: "./app/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
    		//{ test: require.resolve("jquery"), loader: "expose?$!expose?jQuery!jquery" },
			{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
		]
	},
    devServer: {
        historyApiFallback: true
    }
}
