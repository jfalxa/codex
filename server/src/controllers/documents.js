const Document = require( '../models/document' );
const Tag      = require( '../models/tag' );
const DocTag   = require( '../models/docTag' );


exports.createDocument = function createDocument( req, res, next )
{
    let docID;
    let tagIDs;

    const { name, tags } = req.body;

    Document.createDocument( name )
        .then( data => ( docID = data.id ) )
        .then( () => Tag.createManyMissingTags( tags ) )
        .then( data => ( tagIDs = data.map( tag => tag.id ) ) )
        .then( () => DocTag.addManyDocTags( docID, tagIDs ) )
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
        .then( () => res.status( 200 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.deleteDocument = function deleteDocument( req, res, next )
{
    Document.deleteDocument( req.params.docID )
        .then( () => res.status( 200 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.addDocumentTag = function addDocumentTag( req, res, next )
{
    let tag;

    const { docID } = req.params.docID;

    Tag.createMissingTag( req.body )
        .then( data => ( tag = data ) )
        .then( () => DocTag.addDocumentTag( docID, tag.id ) )
        .then( () => res.status( 200 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.updateDocumentTag = function updateDocumentTag( req, res, next )
{
    const { docID, tagID } = req.params;

    DocTag.updateDocTag( docID, tagID, req.body.id )
        .then( () => res.status( 200 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};


exports.deleteDocumentTag = function deleteDocumentTag( req, res, next )
{
    const { docID, tagID } = req.params;

    DocTag.deleteDocTag( docID, tagID )
        .then( () => res.status( 200 ).end() )
        .catch( error => res.status( 500 ).json( { error } ) );
};
