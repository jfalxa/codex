const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


exports.addTagToDoc = function addTagToDoc( docID, tagID )
{
    const query = 'INSERT INTO doc_tags ( document_id, tag_id )'
        + ' VALUES ( $1, $2 )';

    return db.one( query, [docID, tagID] );
};


exports.addManyTagsToDoc = function addManyTagsToDoc( docID, manyTagIDs )
{
    // prepare each row that will be added to the table
    const values = manyTagIDs.map( tagID => ( { document_id : docID, tag_id : tagID } ) );

    // batch all the doc tag insertion in one query
    const query = pgp.helpers.insert( values, ['document_id', 'tag_id'], 'doc_tags' );

    return db.any( query );
};


exports.updateDocTag = function updateDocTag( docID, oldTagID, newTagID )
{
    const query = 'UPDATE doc_tags'
        + ' SET tag_id = $1'
        + ' WHERE document_id = $2'
        + ' AND tag_id = $3';

    return db.none( query, [newTagID, docID, oldTagID] );
};


exports.deleteDocTag = function deleteDocTag( docID, tagID )
{
    const query = 'DELETE FROM doc_tags'
        + ' WHERE document_id = $1'
        + ' AND tag_id = $2';

    return db.none( query, [docID, tagID] );
};

