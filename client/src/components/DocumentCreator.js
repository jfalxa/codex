import React from 'react';

import Container    from './Container';
import Autocomplete from './Autocomplete';
import DocumentTags from './DocumentTags';


export default class DocumentCreator extends React.Component
{
    componentDidMount()
    {
        this.props.resetDoc();
    }


    handleChangeName = ( e ) =>
    {
        const { changeName } = this.props;
        const name = e.target.value;
        changeName( name );
    }


    handleSaveDoc = () =>
    {
        if ( !this.props.doc.name )
        {
            return;
        }

        const { apiCreateDoc, doc, history } = this.props;

        apiCreateDoc( doc )
            .then( action => history.push( `/doc/${ action.payload.id }` ) );
    }


    render()
    {
        const { fragment, suggestions, doc } = this.props;
        const { setFragment, apiAutocomplete, addTag, removeTag, changeName } = this.props;

        return (

            <Container rows>

                <Container columns>

                    <input
                        value={ doc.name }
                        onChange={ this.handleChangeName } />

                    <button onClick={ this.handleSaveDoc }>Save</button>

                </Container>

                <Container columns>

                    <Autocomplete
                        value={ fragment }
                        suggestions={ suggestions }
                        onChange={ setFragment }
                        onSubmit={ addTag }
                        getSuggestions={ apiAutocomplete } />

                    <DocumentTags
                        tags={ doc.tags }
                        onDeleteTag={ removeTag } />

                </Container>

            </Container>

        );
    }
}
