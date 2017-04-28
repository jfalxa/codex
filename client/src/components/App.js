import React     from 'react';
import { Route } from 'react-router-dom';

import Container             from './Container';
import Topbar                from './Topbar';
import ConnectedDocumentForm from './ConnectedDocumentForm';


export default class App extends React.Component
{
    render()
    {
        return (

            <Container rows>

                <Topbar />

                <Route path="/" component={ ConnectedDocumentForm }/>

            </Container>

        );
    }
}

