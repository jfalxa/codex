import React from 'react';

import DocumentForm from './DocumentForm';


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

        const { createDoc, doc, history } = this.props;

        createDoc( doc )
            .then( action => history.push( `/doc/${ action.payload.id }` ) );
    }


    render()
    {
        return (

            <DocumentForm { ...this.props }
                onSave={ this.handleSaveDoc } />

        );
    }
}
