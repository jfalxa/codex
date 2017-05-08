import React from 'react';

import Container               from '../layout/Container';
import ConnectedDocumentList   from '../connectors/ConnectedDocumentList';
import ConnectedDocumentEditor from '../connectors/ConnectedDocumentEditor';


export default function DocumentPreview( props )
{
    return (

        <Container fill columns>
            <ConnectedDocumentList />
            <ConnectedDocumentEditor />
        </Container>

    );
}
