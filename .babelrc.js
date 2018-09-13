"use strict";

const output = process.env.BABEL_OUTPUT;
const modules = output == null ? false : output;

const options = {
	presets: [["@babel/env", { loose: true, modules }]],
	plugins: [
		[
			"@babel/plugin-transform-runtime",
			{
				helpers: false,
				regenerator: true,
			}
		]
	]
};

module.exports = options;
