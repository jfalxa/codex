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
        .then( response => response.json() );
}


