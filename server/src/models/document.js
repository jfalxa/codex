const db = require( '../services/db' );


const DOCUMENT =
{
    TABLE         : 'documents',
    NAME          : 'name',
    CREATION_DATE : 'creation_date'
};


exports.createDocument = function createDocument( name )
{
    const query = `INSERT INTO ${ DOCUMENT.TABLE }
        ( ${ DOCUMENT.NAME }, ${ DOCUMENT.CREATION_DATE } )
        VALUES ( '${ name }', now() )`;

    return db.none( query );
};


exports.getAllDocuments = function getAllDocuments()
{
    const query = `SELECT * FROM ${ DOCUMENT.TABLE }`;

    return db.any( query );
}


exports.getDocument = function getDocument( docID )
{
    const query = `SELECT * FROM ${ DOCUMENT.TABLE }
        WHERE id = ${ docID }`;

    return db.one( query );
}


exports.updateDocument = function updateDocument( docID, update )
{
    const query = `UPDATE ${ DOCUMENT.TABLE }
        SET ${ DOCUMENT.NAME } = '${ update.name }'
        WHERE id = ${ docID }`;

    return db.none( query );
}


exports.deleteDocument = function deleteDocument( docID )
{
    const query = `DELETE FROM ${ DOCUMENT.TABLE }
        WHERE id = ${ docID }`;

    return db.none( query );
}
