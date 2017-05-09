import React from 'react';

import Header                  from '../utilities/Header';
import Container               from '../layout/Container';
import ConnectedDocumentList   from '../connectors/ConnectedDocumentList';
import ConnectedDocumentEditor from '../connectors/ConnectedDocumentEditor';


export default function DocumentPreview()
{
    return (

        <Container columns>

            <Container rows fill>
                <Header>Search results</Header>
                <ConnectedDocumentList />
            </Container>

            <Container rows fill="2">
                <Header>Document preview</Header>
                <ConnectedDocumentEditor />
            </Container>

        </Container>

    );
}
