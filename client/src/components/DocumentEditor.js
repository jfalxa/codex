import React from 'react';

import DocumentForm from './DocumentForm';


export default class DocumentEditor extends React.Component
{
    componentDidMount()
    {
        const { loadDoc, match } = this.props;

        loadDoc( match.params.docID );
    }


    componentDidUpdate( prevProps )
    {
        const { docID }           = this.props.match.params;
        const { docID:prevDocID } = prevProps.match.params;

        if ( docID !== prevDocID )
        {
            this.props.loadDoc( docID )
        }
    }


    handleSaveDoc = () =>
    {
        if ( !this.props.doc.name )
        {
            return;
        }

        const { updateDoc, doc } = this.props;

        updateDoc( doc.id, doc );
    }


    render()
    {
        return (

            <DocumentForm { ...this.props }
                onSave={ this.handleSaveDoc } />

        );
    }
}
