import qs from 'qs';

import callAPI from './callAPI';


export function searchDocs( query )
{
    if ( !query )
    {
        return Promise.resolve( [] );
    }

    const params = qs.stringify( { query } );

    return callAPI( `/search?${ params }` );
}

