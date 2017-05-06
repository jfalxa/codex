import React from 'react';

import Container from './Container';
import Document  from './Document';


export default class DocumentLoader extends React.Component
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


    handleRemoveTag = ( tag ) =>
    {
        const { doc, apiRemoveTag } = this.props;

        apiRemoveTag( doc.id, tag.id );
    }


    render()
    {
        const { doc, apiRemoveTag } = this.props;

        return (

            <Document
                name={ doc.name }
                tags={ doc.tags }
                onRemoveTag={ this.handleRemoveTag } />

        );
    }
}
