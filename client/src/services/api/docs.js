import callAPI from './callAPI';


export function loadAllDocs()
{
    return callAPI( '/docs' );
}


export function loadDoc( docID )
{
    return callAPI( `/docs/${ docID }` );
}


export function createDoc( doc )
{
    const options =
    {
        method : 'POST',
        body   : JSON.stringify( doc )
    };

    return callAPI( '/docs', options );
}


export function updateDoc( docID, doc )
{
    const options =
    {
        method : 'PUT',
        body   : JSON.stringify( doc )
    };

    return callAPI( `/docs/${ docID }`, options );
}


export function deleteDoc( docID )
{
    const options =
    {
        method : 'DELETE'
    };

    return callAPI( `/docs/${ docID }`, options );
}

