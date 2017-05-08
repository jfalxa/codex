import React from 'react';

import DocumentListItem      from './DocumentListItem';
import DocumentListContainer from '../layout/DocumentListContainer';


export default class DocumentList extends React.Component
{
    renderDocuments()
    {
        const { documents, highlighted, setHighlight } = this.props;

        return documents.map( ( doc, i ) =>
        (
            <DocumentListItem
                key={ i }
                highlighted={ highlighted === i }
                onClick={ () => setHighlight( i ) }>
                { doc.name }
            </DocumentListItem>
        ) );
    }


    render()
    {
        if ( this.props.documents.length === 0 )
        {
            return null;
        }

        const { highlighted, documents } = this.props;

        return (

            <DocumentListContainer>
                <ul>
                    { this.renderDocuments() }
                </ul>
            </DocumentListContainer>

        );
    }
}
