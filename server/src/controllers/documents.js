const Document = require( '../models/document' );
const Label    = require( '../models/label' );
const Tag      = require( '../models/tag' );
const DocTag   = require( '../models/docTag' );


exports.createDocument = function createDocument( req, res, next )
{
    let docID;

    const { name, tags } = req.body;

    Document.createDocument( name )
        .then( data => ( docID = data.id ) )
        .then( () => Label.createManyLabels( tags ) )
        .then( () => Tag.createManyTags( tags ) )
        .then( () => DocTag.addManyDocTags( docID, tags ) )
        .then( () => res.status( 201 ).json( { id : docID } ) )
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
    let doc;

    const { docID } = req.params;

    Document.getDocument( docID )
        .then( data => ( doc = data ) )
        .then( () => DocTag.getDocTags( docID ) )
        .then( data => ( doc.tags = data ) )
        .then( () => res.status( 200 ).json( doc ) )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.updateDocument = function updateDocument( req, res, next )
{
    const { name } = req.body;

    Document.updateDocument( req.params.docID, { name } )
        .then( () => res.status( 204 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.deleteDocument = function deleteDocument( req, res, next )
{
    Document.deleteDocument( req.params.docID )
        .then( () => res.status( 204 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.addDocTag = function addDocTag( req, res, next )
{
    const { docID }                 = req.params;
    const { type:label, value:tag } = req.body;

    Label.createLabel( label )
        .then( () => Tag.createTag( tag ) )
        .then( () => DocTag.addDocTag( docID, label, tag ) )
        .then( data =>
        {
            // tag already exists
            if ( !data )
            {
                res.status( 204 ).end();
            }

            res.status( 201 ).json( { id : data.id, type : label, value : tag } );
        } )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.removeDocTag = function removeDocTag( req, res, next )
{
    const { docID, docTagID } = req.params;

    DocTag.removeDocTag( docID, docTagID )
        .then( () => res.status( 204 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};
