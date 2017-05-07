import React from 'react';

import Layout                  from '../layout/Layout';
import Container               from '../layout/Container';
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

                <Layout fill>
                    <Autocomplete
                        value={ fragment }
                        suggestions={ suggestions }
                        onChange={ setFragment }
                        onSubmit={ this.handleAddTag }
                        getSuggestions={ apiAutocomplete } />
                </Layout>

                <Layout fill={ 2 }>
                    <ConnectedDocumentLoader id={ match.params.docID } />
                </Layout>

            </Container>

        );

    }
}
