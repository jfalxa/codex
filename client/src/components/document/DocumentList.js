import React from 'react';

import DocumentListItem        from './DocumentListItem';
import DocumentListContainer   from '../layout/DocumentListContainer';
import ScrollableListContainer from '../layout/ScrollableListContainer';


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
            return <span>No results found.</span>;
        }

        const { highlighted, documents } = this.props;

        return (

            <DocumentListContainer>
                <ScrollableListContainer>
                    { this.renderDocuments() }
                </ScrollableListContainer>
            </DocumentListContainer>

        );
    }
}
