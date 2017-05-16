// @TODO find a more reliable way of writing tag and label in one string
export default function parseTag( tag )
{
    if ( !tag.includes( ':' ) )
    {
       return { type : null, value : tag };
    }

    const [type, value] = tag.split( ':' );

    return { type, value };
}
