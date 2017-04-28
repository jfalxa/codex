import thunkMiddleware                  from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


const middlewares =
[
    thunkMiddleware
];


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


export default function createStoreWithMiddlewares( reducers )
{
    const composedMiddlewares = applyMiddleware( ...middlewares );
    return createStore( reducers, devTools, composedMiddlewares );
}
