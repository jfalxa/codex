import React                    from 'react';
import { Provider }             from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { HotKeys }              from 'react-hotkeys';

import App    from '../../components/App';
import keyMap from '../../constants/keyMap';


export default function RootProd( { store } )
{
    return (

        <Provider store={ store }>
            <BrowserRouter>
                <HotKeys keyMap={ keyMap }>
                    <Route path="/" component={ App } />
                </HotKeys>
            </BrowserRouter>
        </Provider>

    );
}
