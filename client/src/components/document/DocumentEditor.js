import React from 'react';

import Container               from '../Container';
import Document                from './Document';
import Autocomplete            from '../autocomplete/Autocomplete';
import ConnectedDocumentLoader from '../connectors/ConnectedDocumentLoader';


export default class DocumentEditor extends React.Component
{
    handleAddTag = ( tag ) =>
    {
        const { doc, apiAddTag } = this.props;
        apiAddTag( doc.id, { name : tag } );
    }


    render()
    {
        const { fragment, suggestions, match } = this.props;
        const { setFragment, apiAutocomplete } = this.props;

        return (

            <Container columns>

                <Autocomplete
                    value={ fragment }
                    suggestions={ suggestions }
                    onChange={ setFragment }
                    onSubmit={ this.handleAddTag }
                    getSuggestions={ apiAutocomplete } />

                <ConnectedDocumentLoader id={ match.params.docID } />

            </Container>

        );

    }
}
