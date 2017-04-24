const devConfig = require( 'pfft-preset-react-app/webpack/development' );


devConfig.devServer.proxy =
{
    '/api' :
    {
        target : 'http://localhost:4000'
    }
};


module.exports = devConfig;
