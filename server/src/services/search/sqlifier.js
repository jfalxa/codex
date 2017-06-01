const pgp = require( 'pg-promise' )();


// @TODO: make it a bit more complex to use EXCEPT instead of NOT IN when
// there's an AND NOT case.
function toSQL( operation )
{
    if ( !Array.isArray( operation ) )
    {
        const query = 'SELECT document_id FROM doc_tags'
            + ' WHERE tag_id IN ( SELECT id FROM tags WHERE name = $1 )';

        return pgp.as.format( query, operation );
    }
    else if ( operation[0] === 'not' )
    {
        return 'SELECT id FROM documents'
            + ' WHERE id NOT IN ( ' + toSQL( operation[1] ) + ' )';
    }
    else if ( operation.length === 2 )
    {
        const query = 'SELECT document_id FROM doc_tags'
            + ' WHERE label_id IN ( SELECT id FROM labels WHERE name = $1 )'
            + ' AND tag_id IN ( SELECT id FROM tags WHERE name = $2 )';

        return pgp.as.format( query, operation );
    }

    const [operator, firstMember, ...otherMembers] = operation;

    const sqlOperator = ( operator === 'and' ) ? 'INTERSECT' : 'UNION';

    return '('
        + ' ' + toSQL( firstMember )
        + ' ' + otherMembers.map( member => sqlOperator + ' ' + toSQL( member ) ).join( ' ' )
        + ' )';
}


module.exports = function sqlifier( query )
{
    return 'SELECT * FROM documents WHERE id IN (' + toSQL( query ) + ' )';
};
