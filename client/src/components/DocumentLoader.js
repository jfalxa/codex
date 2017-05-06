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


    render()
    {
        const { doc } = this.props;

        return (

            <Document
                name={ doc.name }
                tags={ doc.tags } />

        );
    }
}
