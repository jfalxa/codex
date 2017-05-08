import React from 'react';

import Container from '../layout/Container';
import Document  from './Document';


export default class DocumentEditor extends React.Component
{
    componentDidMount()
    {
        const { id, apiLoadDoc } = this.props;
        apiLoadDoc( id );
    }


    componentDidUpdate( prevProps )
    {
        const { id, apiLoadDoc } = this.props;
        const { id:prevID }      = prevProps;

        if ( id !== prevID )
        {
            apiLoadDoc( id );
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


    handleSaveDoc = () =>
    {
        const { doc, apiUpdateDoc } = this.props;
        apiUpdateDoc( doc.id, { name : doc.name } );
    }


    render()
    {
        const { doc, fragment, suggestions } = this.props;
        const { setFragment, changeName, apiAutocomplete } = this.props;

        return (

            <Document
                doc={ doc }
                fragment={ fragment }
                suggestions={ suggestions }
                getSuggestions={ apiAutocomplete }
                onSetFragment={ setFragment }
                onAddTag={ this.handleAddTag }
                onRemoveTag={ this.handleRemoveTag }
                onChangeName={ changeName }
                onSaveDoc={ this.handleSaveDoc } />

        );

    }
}
