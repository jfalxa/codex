import React    from 'react';
import { Link } from 'react-router-dom';

import Container from './Container';


export default class DocumentList extends React.Component
{
    componentDidMount()
    {
        this.props.loadAllDocs();
    }


    render()
    {
        const { documents } = this.props;

        return (

            <Container>

                { documents.map( ( doc, i ) => <li key={ i }><Link to={ `/doc/${ doc.id }` }>{ doc.name }</Link></li> ) }

            </Container>

        );
    }
}
