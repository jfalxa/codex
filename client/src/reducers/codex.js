import update           from 'immutability-helper';
import { createAction } from 'redux-actions';

import * as api from '../services/api';


// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const SEARCH_DOCS   = 'codex/SEARCH_DOCS ';
const SET_SEARCH    = 'codex/SET_SEARCH';
const AUTOCOMPLETE  = 'codex/AUTOCOMPLETE';
const SET_HIGHLIGHT = 'codex/SET_HIGHLIGHT';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export const apiSearchDocs   = createAction( SEARCH_DOCS, api.searchDocs );
export const apiAutocomplete = createAction( AUTOCOMPLETE, api.autocomplete );
export const setSearch       = createAction( SET_SEARCH );
export const setHighlight    = createAction( SET_HIGHLIGHT );


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleSearchDocs( state, action )
{
    // ignore badly formatted search query results
    if ( action.error )
    {
        return state;
    }

    const change =
    {
        highlighted : { $set : 0 },
        documents   : { $set : action.payload }
    };

    return update( state, change );
}


function handleAutocomplete( state, action )
{
    if ( action.error )
    {
        return state;
    }

    const change =
    {
        suggestions : { $set : action.payload }
    };

    return update( state, change );
}


function handleSetSearch( state, action )
{
    const change =
    {
        search : { $set : action.payload },
    };

    return update( state, change );
}


function handleSetHighlight( state, action )
{
    const change =
    {
        highlighted : { $set : action.payload }
    };

    return update( state, change );
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState =
{
    search      : '',
    suggestions : [],
    documents   : [],
    highlighted : 0
};

export default function codexReducer( state=defaultState, action )
{
    switch ( action.type )
    {
        case SEARCH_DOCS:
            return handleSearchDocs( state, action );

        case AUTOCOMPLETE:
            return handleAutocomplete( state, action );

        case SET_SEARCH:
            return handleSetSearch( state, action );

        case SET_HIGHLIGHT:
            return handleSetHighlight( state, action );

        default:
            return state;
    }
}
