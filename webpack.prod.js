let path = require("path");
let common = require("./webpack.common");
let merge = require("webpack-merge");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let TerserPlugin = require("terser-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, "dist")
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin({
				terserOptions: {
					compress: {
						defaults: false
					},
				}
			}),
			new HtmlWebpackPlugin({
				template: "./src/template/template.pug",
				filename: 'index.html',
				inject: true
			}),
		]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "css/style.css" }),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // Extract css into files
					{ loader: "css-loader", options: { importLoaders: 1 } },
					"postcss-loader",
				]
			}
		]
	}
});
