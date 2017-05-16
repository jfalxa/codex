import React from 'react';

import Document  from './Document';
import Container from '../utilities/Container';
import parseTag  from '../../utils/parseTag';


export default class DocumentEditor extends React.Component
{
    componentDidMount()
    {
        if ( !this.props.id )
        {
            return this.props.resetDoc();
        }

        this.props.apiLoadDoc( this.props.id );
    }


    componentDidUpdate( prevProps )
    {
        if ( !this.props.id )
        {
            return this.props.resetDoc();
        }

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
        apiAddTag( doc.id, parseTag( tag ) );
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
        if ( !this.props.doc.id )
        {
            return <span>No document to edit.</span>
        }

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
