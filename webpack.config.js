const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry:[ path.resolve(__dirname + '/src/test.js'),
			path.resolve(__dirname + '/src/openAudio.js'),	
		],
  output: {
    path: path.resolve(__dirname + '/public/'),
    filename: 'bundle.js'
  },

};