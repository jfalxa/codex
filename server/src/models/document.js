const db = require( '../services/db' );


exports.createDocument = function createDocument( name )
{
    const query = 'INSERT INTO documents ( name, creation_date )'
        + ' VALUES ( $1, now() )'
        + ' RETURNING id';

    return db.one( query, name );
};


exports.getAllDocuments = function getAllDocuments()
{
    const query = 'SELECT * FROM documents';

    return db.any( query );
};


exports.getDocument = function getDocument( docID )
{
    const query = 'SELECT * FROM documents'
        + ' WHERE id = $1';

    return db.one( query, docID );
};


exports.getDocumentTags = function getDocumentTags( docID )
{
    const query = 'SELECT t.id, t.name FROM tags t'
        + ' INNER JOIN doc_tags dt ON t.id = dt.tag_id'
        + ' WHERE dt.document_id = $1';

    return db.any( query, docID );
};


exports.updateDocument = function updateDocument( docID, update )
{
    const query = 'UPDATE documents'
        + ' SET name = $1'
        + ' WHERE id = $2';

    return db.none( query, [update.name, docID] );
};


exports.deleteDocument = function deleteDocument( docID )
{
    const query = 'DELETE FROM documents'
        + ' WHERE id = $1';

    return db.none( query, docID );
};

