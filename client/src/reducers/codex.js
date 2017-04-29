import update           from 'immutability-helper';
import { createAction } from 'redux-actions';

import * as docs from '../services/api/docs';


// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const LOAD_ALL_DOCS = 'codex/LOAD_ALL_DOCS';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export const loadAllDocs = createAction( LOAD_ALL_DOCS, docs.loadAllDocs );


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleLoadAllDocs( state, action )
{
    const change =
    {
        documents : { $set : action.payload }
    };

    return update( state, change );
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState =
{
    documents : []
};

export default function codexReducer( state=defaultState, action )
{
    switch ( action.type )
    {
        case LOAD_ALL_DOCS:
            return handleLoadAllDocs( state, action );

        default:
            return state;
    }
}
