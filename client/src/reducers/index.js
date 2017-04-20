import { combineReducers } from 'redux';
import appReducer          from './app';


const reducers =
{
    app : appReducer
};


export default combineReducers( reducers );
