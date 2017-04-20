// -------------------------------------------------------------------------- //
// ACTION NAMES                                                               //
// -------------------------------------------------------------------------- //

const ACTION = 'app/ACTION';


// -------------------------------------------------------------------------- //
// ACTION CREATORS                                                            //
// -------------------------------------------------------------------------- //

export function action()
{
    return { type : ACTION };
}


// -------------------------------------------------------------------------- //
// STATE MANAGEMENT HELPERS                                                   //
// -------------------------------------------------------------------------- //

function handleAction( state, action )
{
    return state;
}


// -------------------------------------------------------------------------- //
// REDUCER                                                                    //
// -------------------------------------------------------------------------- //

const defaultState = {};

export default function appReducer( state=defaultState, action )
{
    switch ( action.type )
    {
        case ACTION:
            return handleAction( state, action );

        default:
            return state;
    }
}
