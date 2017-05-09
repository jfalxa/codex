import React     from 'react';
import { Route } from 'react-router-dom';

import Topbar                   from './layout/Topbar';
import Container                from './layout/Container';
import MainContainer            from './layout/MainContainer';
import DocumentPreview          from './document/DocumentPreview';
import ConnectedDocumentCreator from './connectors/ConnectedDocumentCreator';
import ConnectedDocumentEditor  from './connectors/ConnectedDocumentEditor';

import '../style/global';


export default class App extends React.Component
{
    render()
    {
        return (

            <Container fill rows crossCenter>

                <Topbar />

                <MainContainer fill>
                    <Route exact path="/" component={ DocumentPreview } />
                    <Route path="/add" component={ ConnectedDocumentCreator } />
                    <Route path="/docs/:docID" component={ ConnectedDocumentEditor } />
                </MainContainer>

            </Container>

        );
    }
}

