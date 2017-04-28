import update           from 'immutability-helper';
import { createAction } from 'redux-actions';

import * as docs from '../services/api/docs';


// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const CREATE_DOC   = 'app/CREATE_DOC';
const LOAD_DOC     = 'app/LOAD_DOC';
const UPDATE_DOC   = 'app/UPDATE_DOC';
const DELETE_DOC   = 'app/DELETE_DOC';
const AUTOCOMPLETE = 'app/AUTOCOMPLETE';
const CHANGE_NAME  = 'app/CHANGE_NAME';
const ADD_TAG      = 'app/ADD_TAG';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export const createDoc    = createAction( CREATE_DOC, docs.createDoc );
export const loadDoc      = createAction( LOAD_DOC, docs.loadDoc );
export const updateDoc    = createAction( UPDATE_DOC, docs.updateDoc );
export const deleteDoc    = createAction( DELETE_DOC, docs.deleteDoc );
export const autocomplete = createAction( AUTOCOMPLETE );
export const changeName   = createAction( CHANGE_NAME );
export const addTag       = createAction( ADD_TAG );


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleLoadDoc( state, action )
{
    const change =
    {
        doc : { $set : action.payload }
    };

    return update( state, change );
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
        doc : { name : { $set : action.payload } }
    };

    return update( state, change );
}


function handleAddTag( state, action )
{
    const change =
    {
        input : { $set : '' },
        tags  : { $push : [action.payload] }
    };

    return update( state, change );
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState = {

    doc         : {}, // currently edited document
    tags        : [], // list of tags for this document
    input       : '', // contents of the tag input
    suggestions : [], // list of suggestions for the current input

};

export default function documentReducer( state=defaultState, action )
{
    switch ( action.type )
    {
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
