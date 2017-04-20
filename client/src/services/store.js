import thunkMiddleware                  from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


const middlewares =
[
    thunkMiddleware
];


export default function createStoreWithMiddlewares( reducers )
{
    const composedMiddlewares = applyMiddleware( ...middlewares );
    return createStore( reducers, composedMiddlewares );
}
