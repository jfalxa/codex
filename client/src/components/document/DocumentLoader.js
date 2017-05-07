import React from 'react';

import Document  from './Document';
import Container from '../layout/Container';


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
        const { doc, apiRemoveTag, layout } = this.props;

        return (

            <Document
                layout={ layout }
                name={ doc.name }
                tags={ doc.tags }
                onRemoveTag={ this.handleRemoveTag } />

        );
    }
}
