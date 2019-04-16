const path = require('path');
const crypto = require('crypto');
const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 生成version版本hash
const hash = crypto.createHash('md5').update(new Date().getTime().toString(), 'utf8').digest('hex');
let options = require(path.join(__dirname, 'webpack.options.js'));

let webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        app: ['babel-polyfill', path.join(__dirname, 'src/main.js')]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'src': path.join(__dirname, 'src/')
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: [
                path.join(__dirname, 'src')
            ],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: [
                        'transform-runtime',
                        'transform-object-rest-spread',
                        ['import', {
                            'libraryName': 'antd',
                            'libraryDirectory': 'es',
                            // `style: true` 会加载 less 文件
                            'style': 'css'
                        }]
                    ]
                }
            }
        }, {
            test: /\.json$/, loader: 'json-loader'
        }, {
            test: /\.(jp(e)?g|gif|png)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'images/[name].[hash].[ext]',
                    // publicPath: '..'
                }
            }]
        }, {
            test: /\.(woff(2)?|eot|ttf|otf|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                query: {
                    limit: 10240,
                    name: 'font/[name].[hash].[ext]',
                    publicPath: '..'
                }
            }]
        }]
    },
    plugins: [
        // webpack4中js分割
        new Webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    enforce: true
                }
            }
        })
    ]
};

if (process.env.NODE_ENV === 'development') {
    module.exports = WebpackMerge(webpackConfig, {
        devServer: {
            hot: true,
            port: options.port,
            host: '127.0.0.1',
            // historyApiFallback: true,
            // webpack-dev-server关闭host检查，如果hostname不是配置内的，将中断访问。presets
            disableHostCheck: true,
            proxy: options.proxy
        },
        module: {
            rules: [{
                // eslint
            //     test: /\.(js|jsx)$/,
            //     include: [
            //         path.join(__dirname, 'src')
            //     ],
            //     enforce: 'pre',
            //     loader: 'eslint-loader'
            // }, {
                // 开发环境启用热加载,不能抽离css
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader', options: {importLoaders: 1}
                }, {
                    loader: 'postcss-loader', options: {
                        plugins: [
                            // require('postcss-px2rem')({remUnit: 16}),
                            require('autoprefixer')()
                        ]
                    }
                }]
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader', options: {
                        sourceMap: true,
                        plugins: [
                            // require('postcss-px2rem')({remUnit: 16}),
                            require('autoprefixer')()
                        ]
                    }
                }, 'sass-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader', options: {
                        sourceMap: true,
                        plugins: [
                            // require('postcss-px2rem')({remUnit: 16}),
                            require('autoprefixer')()
                        ]
                    }
                }, 'less-loader']
            }]
        },
        devtool: '#cheap-module-eval-source-map',
        plugins: [
            new Webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                minify: {
                    // 删除html中的注释代码
                    removeComments: true,
                    // 删除html中的空白符
                    collapseWhitespace: true
                }
            }),
        ]
    });
}

if (process.env.NODE_ENV === 'production') {
    let productionConfig = WebpackMerge(webpackConfig, {
        output: {
            filename: 'javascript/[name].[hash].js',
            path: path.join(__dirname, 'dist'),
            chunkFilename: 'javascript/chunk/[name].[chunkHash].js'
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader', options: {importLoaders: 1}
                }, {
                    loader: 'postcss-loader', options: {
                        plugins: [
                            require('autoprefixer')(),
                            // require('postcss-px2rem')({remUnit: 16}),
                            require('cssnano')()
                        ]
                    }
                }]
            }, {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader', options: {
                        sourceMap: true,
                        plugins: [
                            require('autoprefixer')(),
                            // require('postcss-px2rem')({remUnit: 16}),
                            require('cssnano')()
                        ]
                    }
                }, 'sass-loader']
            }, {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader', options: {
                        sourceMap: true,
                        plugins: [
                            require('autoprefixer')(),
                            // require('postcss-px2rem')({remUnit: 16}),
                            require('cssnano')()
                        ]
                    }
                }, 'less-loader']
            }]
        },
        devtool: '#source-map',
        plugins: [
            new CleanWebpackPlugin(['dist', 'dist.rar', 'dist.zip']),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                script: `<script type="text/javascript">sessionStorage.setItem('version', '${hash}')</script>`,
                minify: {
                    // 删除html中的注释代码
                    removeComments: true,
                    // 删除html中的空白符
                    collapseWhitespace: true
                }
            })
        ]
    });
    // 手动启动webpack
    Webpack(productionConfig, function (err, stats) {
        if (err || stats.hasErrors()) {
            console.error(err || stats.hasErrors());
            throw err || stats.hasErrors();
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');
    });
}