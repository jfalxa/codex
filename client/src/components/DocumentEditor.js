import React from 'react';

import Container    from './Container';
import Autocomplete from './Autocomplete';
import DocumentTags from './DocumentTags';


export default class DocumentEditor extends React.Component
{
    componentDidMount()
    {
        const { apiLoadDoc, match } = this.props;

        apiLoadDoc( match.params.docID );
    }


    componentDidUpdate( prevProps )
    {
        const { docID }           = this.props.match.params;
        const { docID:prevDocID } = prevProps.match.params;

        if ( docID !== prevDocID )
        {
            this.props.apiLoadDoc( docID )
        }
    }


    handleAddTag = ( tag ) =>
    {
        const { doc, apiAddTag } = this.props;
        apiAddTag( doc.id, { name : tag } );
    }


    handleRemoveTag = ( tag ) =>
    {
        const { doc, apiRemoveTag } = this.props;
        apiRemoveTag( doc.id, tag.id );
    }


    render()
    {
        const { fragment, suggestions, doc }   = this.props;
        const { setFragment, apiAutocomplete } = this.props;

        return (

            <Container rows>

                <h4>{ doc.name }</h4>

                <Container columns>

                    <Autocomplete
                        value={ fragment }
                        suggestions={ suggestions }
                        onChange={ setFragment }
                        onSubmit={ this.handleAddTag }
                        getSuggestions={ apiAutocomplete } />

                    <DocumentTags
                        tags={ doc.tags }
                        onDeleteTag={ this.handleRemoveTag } />

                </Container>

            </Container>

        );

    }
}
