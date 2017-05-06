import update           from 'immutability-helper';
import { createAction } from 'redux-actions';

import * as api from '../services/api';


// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const SEARCH_DOCS  = 'codex/SEARCH_DOCS ';
const SET_SEARCH   = 'codex/SET_SEARCH';
const SET_FRAGMENT = 'codex/SET_FRAGMENT';
const AUTOCOMPLETE = 'codex/AUTOCOMPLETE';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export const apiSearchDocs   = createAction( SEARCH_DOCS, api.searchDocs );
export const apiAutocomplete = createAction( AUTOCOMPLETE, api.autocomplete );
export const setSearch       = createAction( SET_SEARCH );
export const setFragment     = createAction( SET_FRAGMENT );


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleSearchDocs( state, action )
{
    const search = state.search + state.fragment;

    if ( search && action.error )
    {
        return state;
    }

    const change =
    {
        documents : search
            ? { $set : action.payload }
            : { $set : [] }
    };

    return update( state, change );
}


function handleAutocomplete( state, action )
{
    if ( !state.fragment )
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
        search      : { $set : action.payload },
        fragment    : { $set : '' },
        suggestions : { $set : [] }
    };

    return update( state, change );
}



function handleSetFragment( state, action )
{
    const change =
    {
        fragment : { $set : action.payload },

        suggestions : ( action.payload.length === 0 )
            ? { $set : [] }
            : {}
    };

    return update( state, change );
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState =
{
    search      : '',
    fragment    : '',
    suggestions : [],
    documents   : []
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

        case SET_FRAGMENT:
            return handleSetFragment( state, action );

        default:
            return state;
    }
}
