"use strict";
const useOldRuntime = process.env.BABEL_OLD != null;
const output = process.env.BABEL_OUTPUT;
const modules = output == null ? false : output;

const options = {
	presets: [["@babel/env", { loose: true, modules }]],
	plugins: [
		[
			"@babel/plugin-transform-runtime",
			{
				helpers: false,
				polyfill: false,
				regenerator: true,
				moduleName: useOldRuntime ? "babel-runtime": "@babel/runtime"
			}
		]
	]
};

module.exports = options;
