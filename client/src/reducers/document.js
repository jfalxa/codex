import update           from 'immutability-helper';
import _some            from 'lodash/some';
import _reject          from 'lodash/reject';
import { createAction } from 'redux-actions';

import * as api from '../services/api';


// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const CREATE_DOC   = 'doc/CREATE_DOC';
const LOAD_DOC     = 'doc/LOAD_DOC';
const UPDATE_DOC   = 'doc/UPDATE_DOC';
const DELETE_DOC   = 'doc/DELETE_DOC';
const ADD_TAG      = 'doc/ADD_TAG';
const REMOVE_TAG   = 'doc/REMOVE_TAG';
const RESET_DOC    = 'doc/RESET_DOC';
const CHANGE_NAME  = 'doc/CHANGE_NAME';
const AUTOCOMPLETE = 'doc/AUTOCOMPLETE';
const SET_FRAGMENT = 'doc/SET_FRAGMENT';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export const apiCreateDoc    = createAction( CREATE_DOC, api.createDoc );
export const apiLoadDoc      = createAction( LOAD_DOC, api.loadDoc );
export const apiUpdateDoc    = createAction( UPDATE_DOC, api.updateDoc );
export const apiRemoveDoc    = createAction( DELETE_DOC, api.deleteDoc );
export const resetDoc        = createAction( RESET_DOC );
export const changeName      = createAction( CHANGE_NAME );
export const addTag          = createAction( ADD_TAG );
export const removeTag       = createAction( REMOVE_TAG );
export const setFragment     = createAction( SET_FRAGMENT );
export const apiAutocomplete = createAction( AUTOCOMPLETE, api.autocomplete );
export const apiAddTag       = createAction( ADD_TAG, api.addDocTag );

export const apiRemoveTag = createAction( REMOVE_TAG, ( docID, tagID ) =>
    api.removeDocTag( docID, tagID ).then( () => ( { id : tagID } ) ) );


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleResetDoc()
{
    return { ...defaultState };
}


function handleLoadDoc( state, action )
{
    if ( action.error )
    {
        return state;
    }

    const change =
    {
        doc : { $set : action.payload }
    };

    return update( defaultState, change );
}


function handleSetFragment( state, action )
{
    const change =
    {
        fragment : { $set : action.payload },
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
    if ( action.error )
    {
        return state;
    }

    // make sure we add tags only if they're not already added
    const tag    = action.payload;
    const hasTag = _some( state.doc.tags, tag );

    const change =
    {
        fragment    : { $set : '' },
        suggestions : { $set : [] },

        doc :
        {
            tags : !hasTag
                ? { $push : [tag] }
                : {}
        }
    };

    return update( state, change );
}


function handleRemoveTag( state, action )
{
    if ( action.error )
    {
        return state;
    }

    // remove all tags matching what's specified in the action
    const tags = _reject( state.doc.tags, action.payload );

    const change =
    {
        doc :
        {
            tags : { $set : tags }
        }
    };

    return update( state, change );
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState =
{
    fragment    : '', // contents of the tag input
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

        case SET_FRAGMENT:
            return handleSetFragment( state, action );

        case AUTOCOMPLETE:
            return handleAutocomplete( state, action );

        case CHANGE_NAME:
            return handleChangeName( state, action );

        case ADD_TAG:
            return handleAddTag( state, action );

        case REMOVE_TAG:
            return handleRemoveTag( state, action );

        default:
            return state;
    }
}
