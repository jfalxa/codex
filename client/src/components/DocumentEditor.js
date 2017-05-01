import React from 'react';

import Container    from './Container';
import Autocomplete from './Autocomplete';
import DocumentTags from './DocumentTags';


export default class DocumentEditor extends React.Component
{
    componentDidMount()
    {
        const { loadDoc, match } = this.props;

        loadDoc( match.params.docID );
    }


    componentDidUpdate( prevProps )
    {
        const { docID }           = this.props.match.params;
        const { docID:prevDocID } = prevProps.match.params;

        if ( docID !== prevDocID )
        {
            this.props.loadDoc( docID )
        }
    }

    render()
    {
        const { input, suggestions, doc } = this.props;
        const { autocomplete, addTag }    = this.props;

        return (

            <Container rows>

                <h4>{ doc.name }</h4>

                <Container columns>

                    <Autocomplete
                        value={ input }
                        suggestions={ suggestions }
                        onChange={ autocomplete }
                        onSubmit={ addTag } />

                    <DocumentTags
                        tags={ doc.tags } />

                </Container>

            </Container>

        );

    }
}
