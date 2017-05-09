import React from 'react';

import Container               from '../layout/Container';
import ConnectedDocumentList   from '../connectors/ConnectedDocumentList';
import ConnectedDocumentEditor from '../connectors/ConnectedDocumentEditor';


export default function DocumentPreview()
{
    return (

        <Container columns>

            <Container rows fill>
                <b>Search results</b>
                <ConnectedDocumentList />
            </Container>

            <Container rows fill="2">
                <b>Document preview</b>
                <ConnectedDocumentEditor />
            </Container>

        </Container>

    );
}
