import React       from 'react';
import { Link }    from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';

import Container               from '../Container';
import ConnectedDocumentLoader from '../connectors/ConnectedDocumentLoader';


function DocumentLink( { id, name, highlighted, onHighlight } )
{
    return (

        <li
            style={ { fontWeight : highlighted ? 'bold' : 'normal' } }
            onClick={ onHighlight }>

            <Link to={ `/docs/${ id }` }>E</Link>
            { ' ' }
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
                id={ doc.id }
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

            <Container fill columns>

                <Container fill>
                    { this.renderDocuments() }
                </Container>

                <Container fill={ 2 }>
                    { docID && <ConnectedDocumentLoader id={ docID } /> }
                </Container>

            </Container>

        );
    }
}
