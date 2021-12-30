const fs = require('fs');

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
	? '/enr/'
	: '/',
	devServer: {
		https: {
			key: fs.readFileSync('./certs/key.pem'),
			cert: fs.readFileSync('./certs/cert.pem'),
		},
	},
	pwa: {
		name: "Easy note reader",
		themeColor: "#4DBA87",
		msTileColor: "#000000",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "black",
		// configure the workbox plugin
		workboxPluginMode: "GenerateSW",
	},
};
