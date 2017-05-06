import React                    from 'react';
import { Provider }             from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { injectGlobal }         from 'styled-components';

import App    from '../../components/App';
import keyMap from '../../constants/keyMap';


injectGlobal`

    html, body, #main
    {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    #main
    {
        display: flex;
    }

    div[tabindex="-1"]:focus
    {
        outline: 0;
    }

`;


export default function RootProd( { store } )
{
    return (

        <Provider store={ store }>
            <BrowserRouter>
                <Route path="/" component={ App } />
            </BrowserRouter>
        </Provider>

    );
}
