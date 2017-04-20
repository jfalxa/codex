module.exports = ( process.env.NODE_ENV === 'development' )
    ? require( './Root.dev' )
    : require( './Root.prod' );
