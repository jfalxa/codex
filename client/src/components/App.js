import React     from 'react';
import { Route } from 'react-router-dom';

import Container             from './Container';
import ConnectedDocumentForm from './ConnectedDocumentForm';


export default class App extends React.Component
{
    render()
    {
        return (

            <Container rows>

                <Route path="/doc/:docID?" component={ ConnectedDocumentForm } />

            </Container>

        );
    }
}

