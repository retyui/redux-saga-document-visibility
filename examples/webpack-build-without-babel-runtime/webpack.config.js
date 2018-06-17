const {parse, resolve} = require('path');
const resolveToDir = moduleName => parse(require.resolve(moduleName)).dir;

const entrySagaVisibility = resolveToDir('redux-saga-document-visibility');
const pathToSrcSagaVisibility = resolve(entrySagaVisibility, '../src/index.js');

// console.log({
// 	entrySagaVisibility,
// 	pathToSrcSagaVisibility,
// });

module.exports = {
	resolve: {
		alias: {
			'redux-saga-document-visibility': pathToSrcSagaVisibility
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					resolve(__dirname, './src'),
					resolveToDir(pathToSrcSagaVisibility)
				],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}