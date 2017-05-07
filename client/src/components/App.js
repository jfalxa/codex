import React     from 'react';
import { Route } from 'react-router-dom';

import Container                from './Container';
import Topbar                   from './Topbar';
import ConnectedDocumentCreator from './connectors/ConnectedDocumentCreator';
import ConnectedDocumentEditor  from './connectors/ConnectedDocumentEditor';
import ConnectedDocumentList    from './connectors/ConnectedDocumentList';

import '../style/global';


export default class App extends React.Component
{
    render()
    {
        return (

            <Container fill rows>

                <Topbar />

                <Route exact path="/" component={ ConnectedDocumentList } />
                <Route path="/add" component={ ConnectedDocumentCreator } />
                <Route path="/docs/:docID" component={ ConnectedDocumentEditor } />

            </Container>

        );
    }
}

