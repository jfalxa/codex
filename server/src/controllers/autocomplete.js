const Label = require( '../models/label' );
const Tag   = require( '../models/tag' );


exports.autocompleteLabel = function autocompleteLabel( req, res, next )
{
    Label.findLabel( req.query.fragment )
        .then( labels => res.status( 200 ).json( labels ) )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.autocompleteTag = function autocompleteTag( req, res, next )
{
    Tag.findTag( req.query.fragment )
        .then( tags => res.status( 200 ).json( tags ) )
        .catch( error => res.status( 500 ).json( { error } ) );
};
