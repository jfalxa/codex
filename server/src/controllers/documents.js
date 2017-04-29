const Document = require( '../models/document' );


exports.createDocument = function createDocument( req, res, next )
{
    Document.createDocument( req.body.name )
        .then( data => res.status( 201 ).json( data ) )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.getAllDocuments = function getAllDocuments( req, res, next )
{
    Document.getAllDocuments()
        .then( documents => res.status( 200 ).json( documents ) )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.getDocument = function getDocument( req, res, next )
{
    Document.getDocument( req.params.docID )
        .then( doc => res.status( 200 ).json( doc ) )
        .catch( error => res.status( 404 ).end() );
};


exports.updateDocument = function updateDocument( req, res, next )
{
    Document.updateDocument( req.params.docID, req.body )
        .then( () => res.status( 200 ).end() )
        .catch( error => res.status( 404 ).end() );
};


exports.deleteDocument = function deleteDocument( req, res, next )
{
    Document.deleteDocument( req.params.docID )
        .then( () => res.status( 200 ).end() )
        .catch( error => res.status( 404 ).end() );
};
