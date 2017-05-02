function isJSON( response )
{
    const contentType = response.headers.get( 'content-type' );
    return ( contentType && contentType.indexOf( 'application/json' ) !== -1 );
}


export default function callAPI( url, options )
{
    const finalOptions =
    {
        ...options,

        headers :
        {
            'Accept'       : 'application/json',
            'Content-Type' : 'application/json'
        }
    };

    return fetch( `/api${ url }`, finalOptions )
        .then( response =>
        {
            if ( isJSON( response ) )
            {
                return response.json();
            }

            return response;
        } );
}

