import React from 'react';

import Document  from './Document';
import Container from '../utilities/Container';


export default class DocumentCreator extends React.Component
{
    componentDidMount()
    {
        this.props.resetDoc();
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
        const { setFragment, removeTag, changeName, apiAutocomplete } = this.props;

        return (

            <Document edit
                doc={ doc }
                fragment={ fragment }
                suggestions={ suggestions }
                getSuggestions={ apiAutocomplete }
                onSetFragment={ setFragment }
                onAddTag={ this.handleAddTag }
                onRemoveTag={ removeTag }
                onChangeName={ changeName }
                onSaveDoc={ this.handleSaveDoc } />

        );
    }
}
