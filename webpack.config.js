module.exports = {
    
	module: {
		rules: [
			{
				loader: 'css-loader',
				options: {
					modules: true,
					localIdentName: '[sha1:hash:7]'
				}
			},
			{
				loader: 'style-loader',
				options: {
					singleton: true
				}
			}
		]
	}
};