import React            from 'react';
import { AppContainer } from 'react-hot-loader';

import Root from './Root.prod';


export default function RootDev( { store } )
{
    return (

        <AppContainer>
            <Root store={ store } />
        </AppContainer>

    );
}
