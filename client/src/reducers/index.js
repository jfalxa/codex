import { combineReducers } from 'redux';

import codexReducer    from './codex';
import documentReducer from './document';


const reducers =
{
    codex    : codexReducer,
    document : documentReducer
};


export default combineReducers( reducers );
