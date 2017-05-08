import React from 'react';

import Document  from './Document';
import Container from '../layout/Container';


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
        const { doc, fragment, suggestions } = this.props;
        const { setFragment, apiAutocomplete, removeTag, changeName } = this.props;

        return (

            <Container rows>

                <Container columns>

                    <input
                        value={ doc.name }
                        onChange={ this.handleChangeName } />

                    <button onClick={ this.handleSaveDoc }>Save</button>

                </Container>

                <Document
                    doc={ doc }
                    fragment={ fragment }
                    suggestions={ suggestions }
                    getSuggestions={ apiAutocomplete }
                    onSetFragment={ setFragment }
                    onAddTag={ this.handleAddTag }
                    onRemoveTag={ removeTag } />

            </Container>

        );
    }
}
