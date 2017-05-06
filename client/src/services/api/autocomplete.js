import callAPI from './callAPI';


export function autocomplete( fragment )
{
    if ( !fragment )
    {
        return Promise.resolve( [] );
    }

    return callAPI( `/autocomplete/${ fragment }` );
}

