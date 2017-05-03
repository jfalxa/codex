const pgp = require( 'pg-promise' )();

const db               = require( '../services/db' );
const buildSearchQuery = require( '../services/search' );


exports.search = function search( req, res, next )
{
    const query = buildSearchQuery( req.query.query )

    db.any( query )
        .then( data => res.status( 200 ).json( data ) )
        .catch( error => res.status( 500 ).end() );
};
