import React       from 'react';
import { Link }    from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';

import Container               from '../layout/Container';
import MainContainer           from '../layout/MainContainer';
import ConnectedDocumentEditor from '../connectors/ConnectedDocumentEditor';


function DocumentLink( { id, name, highlighted, onHighlight } )
{
    return (

        <li
            style={ { fontWeight : highlighted ? 'bold' : 'normal' } }
            onClick={ onHighlight }>

            <span>{ name }</span>

        </li>

    );
}


export default class DocumentList extends React.Component
{
    renderDocuments()
    {
        const { documents, highlighted, setHighlight } = this.props;

        return documents.map( ( doc, i ) =>
        (
            <DocumentLink
                key={ i }
                name={ doc.name }
                highlighted={ highlighted === i }
                onHighlight={ () => setHighlight( i ) } />
        ) );
    }


    render()
    {
        const { highlighted, documents } = this.props;

        const docID = documents[highlighted] && documents[highlighted].id;

        return (

            <MainContainer fill columns>

                <Container fill>
                    { this.renderDocuments() }
                </Container>

                <Container fill>
                    { docID && <ConnectedDocumentEditor id={ docID } /> }
                </Container>

            </MainContainer>

        );
    }
}
