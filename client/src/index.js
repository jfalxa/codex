import React      from 'react';
import { render } from 'react-dom';

import reducers    from './reducers';
import createStore from './services/store';
import Root        from './components/Root';


// -------------------------------------------------------------------------- //
// Main                                                                       //
// -------------------------------------------------------------------------- //

function initApp()
{
    const store     = createStore( reducers );
    const container = document.getElementById( 'main' );

    return { store, container };
}


export default function main( app=initApp() )
{
    // render  the Root element it in its container
    render( <Root store={ app.store } />, app.container );

    // return the current config in order to reuse it when there's a hot reload
    return app;
}


// -------------------------------------------------------------------------- //
// Start app + hot reloading                                                  //
// -------------------------------------------------------------------------- //

// exec main
const app = main();

// hot reload
if ( module.hot )
{
    module.hot.accept( 'src/components/Root/Root.dev', () => main( app ) );
}
