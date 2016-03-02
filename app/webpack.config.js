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
			}
		]
	}
}