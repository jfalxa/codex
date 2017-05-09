const Tag = require( '../models/tag' );


exports.autocomplete = function autocomplete( req, res, next )
{
    Tag.findTag( req.query.fragment )
        .then( tags => res.status( 200 ).json( tags ) )
        .catch( error => res.status( 500 ).json( { error } ) );
};
