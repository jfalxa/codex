const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


exports.createTag = function createTag( name )
{
    const query = 'INSERT INTO tags ( name )'
        + ' VALUES ( $1 )'
        + ' RETURNING id';

    return db.one( query, name );
};


exports.createManyTags = function createManyTags( manyTags )
{
    // batch all the tag insertion in one query
    const query = pgp.helpers.insert( manyTags, ['name'], 'tags' )
        + ' RETURNING id';

    return db.any( query );
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
