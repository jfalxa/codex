const Document = require( '../models/document' );


exports.createDocument = function createDocument( req, res, next )
{
    Document.createDocument( req.body.name )
        .then( () => res.status( 201 ).end() )
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
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.updateDocument = function updateDocument( req, res, next )
{
    Document.updateDocument( req.params.docID, req.body )
        .then( () => res.status( 201 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.deleteDocument = function deleteDocument( req, res, next )
{
    Document.deleteDocument( req.params.docID )
        .then( () => res.status( 201 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};
