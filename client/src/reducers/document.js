import update           from 'immutability-helper';
import { createAction } from 'redux-actions';

import * as docs from '../services/api/docs';


// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const CREATE_DOC   = 'doc/CREATE_DOC';
const LOAD_DOC     = 'doc/LOAD_DOC';
const UPDATE_DOC   = 'doc/UPDATE_DOC';
const DELETE_DOC   = 'doc/DELETE_DOC';
const RESET_DOC    = 'doc/RESET_DOC';
const AUTOCOMPLETE = 'doc/AUTOCOMPLETE';
const CHANGE_NAME  = 'doc/CHANGE_NAME';
const ADD_TAG      = 'doc/ADD_TAG';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export const createDoc    = createAction( CREATE_DOC, docs.createDoc );
export const loadDoc      = createAction( LOAD_DOC, docs.loadDoc );
export const updateDoc    = createAction( UPDATE_DOC, docs.updateDoc );
export const deleteDoc    = createAction( DELETE_DOC, docs.deleteDoc );
export const resetDoc     = createAction( RESET_DOC );
export const autocomplete = createAction( AUTOCOMPLETE );
export const changeName   = createAction( CHANGE_NAME );
export const addTag       = createAction( ADD_TAG );


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleResetDoc()
{
    return { ...defaultState };
}


function handleLoadDoc( state, action )
{
    const change =
    {
        doc : { $set : action.payload }
    };

    return update( defaultState, change );
}


function handleAutocomplete( state, action )
{
    const change =
    {
        input : { $set : action.payload }
    };

    return update( state, change );
}


function handleChangeName( state, action )
{
    const change =
    {
        doc :
        {
            name : { $set : action.payload }
        }
    };

    return update( state, change );
}


function handleAddTag( state, action )
{
    const change =
    {
        input : { $set : '' },

        doc :
        {
            tags : { $push : [{ name : action.payload }] }
        }
    };

    return update( state, change );
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState = {

    input       : '', // contents of the tag input
    suggestions : [], // list of suggestions for the current input

    doc : // currently edited document
    {
        name : '',
        tags : []
    }
};

export default function documentReducer( state=defaultState, action )
{
    switch ( action.type )
    {
        case RESET_DOC:
            return handleResetDoc( state );

        case LOAD_DOC:
            return handleLoadDoc( state, action );

        case AUTOCOMPLETE:
            return handleAutocomplete( state, action );

        case CHANGE_NAME:
            return handleChangeName( state, action );

        case ADD_TAG:
            return handleAddTag( state, action );

        default:
            return state;
    }
}
