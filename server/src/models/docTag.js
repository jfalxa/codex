const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


function setDefaultLabels( tags )
{
    // give default values to undefined labels
    return tags.map( tag => ( {
        type  : tag.type || '_',
        value : tag.value
    } ) );
}


function removeDefaultLabels( tags )
{
    // replace labels with default value with null
    return tags.map( tag => ( {
        type  : ( tag.type === '_' ) ? null : tag.type,
        value : tag.value
    } ) );
}


exports.getDocTags = function getDocTags( docID )
{
    const query = 'SELECT dt.id, l.name as type, t.name as value'
        + ' FROM doc_tags dt'
        + ' LEFT JOIN labels l ON l.id = dt.label_id'
        + ' INNER JOIN tags t ON t.id = dt.tag_id'
        + ' WHERE dt.document_id = $1';

    return db.any( query, docID )
        .then( removeDefaultLabels );
};


exports.addDocTag = function addDocTag( docID, optionalLabel, tag )
{
    const label = optionalLabel || '_';

    const query = 'INSERT INTO doc_tags ( document_id, label_id, tag_id )'
        + ' SELECT $1, l.id, t.id'
        + ' FROM labels l, tags t'
        + ' WHERE ( l.name, t.name ) = ( $2, $3 )'
        + ' ON CONFLICT ( document_id, label_id, tag_id ) DO NOTHING'
        + ' RETURNING id';

    return db.oneOrNone( query, [docID, label, tag] );
};


exports.addManyDocTags = function addManyDocTags( docID, manyTags )
{
    if ( manyTags.length === 0 )
    {
        return Promise.resolve();
    }

    // replace null labels with the default name
    const tags = setDefaultLabels( manyTags );

    // prepare label/tag pairs to grab for insertion
    const tagValues = pgp.helpers.values( tags, ['type', 'value'] );

    const query = 'INSERT INTO doc_tags ( document_id, label_id, tag_id )'
        + ' SELECT $1, l.id, t.id'
        + ' FROM labels l, tags t'
        + ' WHERE ( l.name, t.name ) IN ( ' + tagValues + ' )'
        + ' ON CONFLICT ( document_id, label_id, tag_id ) DO NOTHING';

    return db.none( query, docID );
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

