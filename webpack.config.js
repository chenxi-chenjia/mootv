const webpack=require('webpack');

module.exports = {
    entry: './dev/main.jsx',
    output: {
        filename: './site/public/js/index.js'
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    } 
    //  ,
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env':{
    //             NODE_ENV:JSON.stringify('production')
    //         }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
};