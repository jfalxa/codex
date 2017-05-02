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


    handleEditTag = ( index ) =>
    {

    }


    render()
    {
        const { input, suggestions, doc }                     = this.props;
        const { autocomplete, addTag, removeTag, changeName } = this.props;

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
                        value={ input }
                        suggestions={ suggestions }
                        onChange={ autocomplete }
                        onSubmit={ addTag } />

                    <DocumentTags
                        tags={ doc.tags }
                        onEditTag={ this.handleEditTag }
                        onDeleteTag={ removeTag } />

                </Container>

            </Container>

        );
    }
}
