import qs from 'qs';

import callAPI from './callAPI';


export function autocomplete( fragment )
{
    if ( !fragment )
    {
        return Promise.resolve( [] );
    }

    const params = qs.stringify( { fragment } );

    return callAPI( `/autocomplete?${ params }` );
}

