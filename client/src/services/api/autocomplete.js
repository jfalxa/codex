import callAPI from './callAPI';


export function autocomplete( fragment )
{
    return callAPI( `/autocomplete/${ fragment }` );
}

