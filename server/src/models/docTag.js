const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


exports.getDocTags = function getDocTags( docID )
{
    const query = 'SELECT t.id, t.name FROM tags t'
        + ' INNER JOIN doc_tags dt ON t.id = dt.tag_id'
        + ' WHERE dt.document_id = $1';

    return db.any( query, docID );
};


exports.addDocTag = function addDocTag( docID, tag )
{
    const query = 'INSERT INTO doc_tags ( document_id, tag_id )'
        + ' SELECT $1, t.id FROM tags t'
        + ' WHERE t.name = $2'
        + ' ON CONFLICT ( document_id, tag_id ) DO NOTHING'
        + ' RETURNING tag_id';

    return db.oneOrNone( query, [docID, tag] );
};


exports.addManyDocTags = function addManyDocTags( docID, manyTags )
{
    if ( manyTags.length === 0 )
    {
        return Promise.resolve();
    }

    const tagNames = manyTags.map( tag => tag.name );

    const query = 'INSERT INTO doc_tags ( document_id, tag_id )'
        + ' SELECT $1, t.id FROM tags t'
        + ' WHERE t.name IN ( $2:csv )'
        + ' ON CONFLICT ( document_id, tag_id ) DO NOTHING';

    return db.none( query, [docID, tagNames] );
};


exports.updateDocTag = function updateDocTag( docID, oldTagID, newTagID )
{
    const query = 'UPDATE doc_tags'
        + ' SET tag_id = $1'
        + ' WHERE document_id = $2'
        + ' AND tag_id = $3';

    return db.none( query, [newTagID, docID, oldTagID] );
};


exports.removeDocTag = function removeDocTag( docID, tagID )
{
    const query = 'DELETE FROM doc_tags'
        + ' WHERE document_id = $1'
        + ' AND tag_id = $2';

    return db.none( query, [docID, tagID] );
};

