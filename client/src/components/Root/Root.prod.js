import React                    from 'react';
import { Provider }             from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../../components/App';


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
