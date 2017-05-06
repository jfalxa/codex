import React     from 'react';
import { Route } from 'react-router-dom';

import Container                from './Container';
import Topbar                   from './Topbar';
import ConnectedSearch          from './ConnectedSearch';
import ConnectedDocumentCreator from './ConnectedDocumentCreator';
import ConnectedDocumentEditor  from './ConnectedDocumentEditor';


export default class App extends React.Component
{
    render()
    {
        return (

            <Container fill rows>

                <Topbar />

                <Route exact path="/" component={ ConnectedSearch } />
                <Route path="/add" component={ ConnectedDocumentCreator } />
                <Route path="/docs/:docID" component={ ConnectedDocumentEditor } />

            </Container>

        );
    }
}

