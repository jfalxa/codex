import { combineReducers } from 'redux';

import appReducer      from './app';
import documentReducer from './document';


const reducers =
{
    app      : appReducer,
    document : documentReducer
};


export default combineReducers( reducers );
