const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "development",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template/template.pug"
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{ loader: "css-loader", options: { importLoaders: 1 } },
					"postcss-loader",
				]
			}
		]
	},
	devServer: {
		watchContentBase: true,
		contentBase: path.resolve(__dirname, "dist"),
		open: true,
	},
});
