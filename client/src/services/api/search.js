import qs from 'qs';

import callAPI from './callAPI';


export function searchDocs( query )
{
    const params = qs.stringify( { query } );

    return callAPI( `/search?${ params }` );
}

