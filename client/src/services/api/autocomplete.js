import qs from 'qs';

import callAPI from './callAPI';


export function autocomplete( category, fragment )
{
    if ( !fragment )
    {
        return Promise.resolve( [] );
    }

    const params = qs.stringify( { fragment } );

    return callAPI( `/autocomplete/${ category }?${ params }` );
}

