import React from 'react';

import Document     from './Document';
import Container    from '../layout/Container';
import Autocomplete from '../autocomplete/Autocomplete';


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
            .then( action => history.push( `/docs/${ action.payload.id }` ) );
    }


    handleAddTag = ( tag ) =>
    {
        this.props.addTag( { name : tag } );
    }


    render()
    {
        const { fragment, suggestions, doc } = this.props;
        const { setFragment, apiAutocomplete, removeTag, changeName } = this.props;

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
                        onSubmit={ this.handleAddTag }
                        getSuggestions={ apiAutocomplete } />

                    <Document
                        name={ doc.name }
                        tags={ doc.tags }
                        onRemoveTag={ removeTag } />

                </Container>

            </Container>

        );
    }
}
