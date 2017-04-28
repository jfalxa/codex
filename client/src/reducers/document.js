import update from 'immutability-helper';


// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const LOAD_DOC     = 'app/LOAD_DOC';
const AUTOCOMPLETE = 'app/AUTOCOMPLETE';
const ADD_TAG      = 'app/ADD_TAG';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export function loadDoc( docID )
{
    return { type : LOAD_DOC };
}


export function autocomplete( input )
{
    return { type : AUTOCOMPLETE, input };
}


export function addTag( tag )
{
    return { type : ADD_TAG, tag };
}


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleLoadDoc( state, action )
{
    return state;
}


function handleAutocomplete( state, action )
{
    const change = {

        input : { $set : action.input }

    };

    return update( state, change );
}


function handleAddTag( state, action )
{
    const change = {

        input : { $set : '' },
        tags  : { $push : [action.tag] }

    };

    return update( state, change );
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState = {

    doc         : null, // currently edited document
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

        case ADD_TAG:
            return handleAddTag( state, action );

        default:
            return state;
    }
}
