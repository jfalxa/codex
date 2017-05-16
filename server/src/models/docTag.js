const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


function setDefaultLabels( tags )
{
    // give default values to undefined labels
    return tags.map( tag => Object.assign( {}, tag, { type : tag.type || '_' } ) );
}


function removeDefaultLabels( tags )
{
    // replace labels with default value with null
    return tags.map( tag => Object.assign( {}, tag, { type : ( tag.type === '_' ) ? null : tag.type } ) );
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


exports.removeDocTag = function removeDocTag( docID, docTagID )
{
    const query = 'DELETE FROM doc_tags'
        + ' WHERE id = $2'
        + ' AND document_id = $1';

    return db.none( query, [docID, docTagID] );
};

