import { fileURLToPath } from 'url'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config /** @type { import('webpack').Configuration } */ = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
    },
    resolve: {
        extensions: ['.ts', '.js', '.css'],
        plugins: [
            new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', minify: { removeRedundantAttributes: false } }),
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
            }
        ]
    },
}

export default config