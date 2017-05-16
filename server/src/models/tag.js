const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


exports.createTag = function createTag( tag )
{
    if ( !tag )
    {
        return Promise.resolve();
    }

    const query = 'INSERT INTO tags ( name )'
        + ' VALUES ( $1 )'
        + ' ON CONFLICT( name ) DO NOTHING';

    return db.none( query, tag );
};


exports.createManyTags = function createManyTags( manyTags )
{
    if ( manyTags.length === 0 )
    {
        return Promise.resolve();
    }

    // batch all the tag insertion in one query
    const query = pgp.helpers.insert( manyTags, ['name'], 'tags' )
        + ' ON CONFLICT( name ) DO NOTHING';

    return db.none( query );
};


exports.getTag = function getTag( tagID )
{
    const query = 'SELECT * FROM tags'
        + ' WHERE id = $1';

    return db.one( query, tagID );
};


exports.updateTag = function updateTag( tagID, update )
{
    const query = 'UPDATE tags'
        + ' SET name = $1'
        + ' WHERE id = $2';

    return db.none( query, [update.name, tagID] );
};


exports.deleteTag = function deleteTag( tagID )
{
    const query = 'DELETE FROM tags'
        + ' WHERE id = $1';

    return db.none( query, tagID );
};


exports.findTag = function findTag( fragment )
{
    const query = 'SELECT * FROM tags'
        + ' WHERE length( name ) < 50'
        + ' AND word_similarity( $1, name ) >= 0.5'
        + ' ORDER BY similarity( $1, name ) DESC'
        + ' LIMIT 5';

    return db.any( query, fragment );
};

