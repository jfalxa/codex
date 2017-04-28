import callAPI from './callAPI';


export function saveDoc( name )
{
    const options = 
    {
        method : 'POST',
        body   : JSON.stringify( { name } )
    };

    return callAPI( '/docs', options );
}

