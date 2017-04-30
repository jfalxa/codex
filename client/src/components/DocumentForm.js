import React from 'react';

import Container    from './Container';
import Autocomplete from './Autocomplete';
import DocumentTags from './DocumentTags';


export default class DocumentForm extends React.Component
{
    render()
    {
        const { doc, input, suggestions }                  = this.props;
        const { autocomplete, addTag, changeName, onSave } = this.props;

        return (

            <Container columns>

                <button onClick={ onSave }>Save!</button>

                <Autocomplete
                    value={ input }
                    suggestions={ suggestions }
                    onChange={ autocomplete }
                    onSubmit={ addTag } />

                <DocumentTags
                    name={ doc.name }
                    tags={ doc.tags }
                    onChangeName={ changeName } />

            </Container>

        );
    }
}
