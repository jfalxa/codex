import React from 'react';

import Container from './Container';


export default class DocumentTags extends React.Component
{
    handleChangeName = ( e ) =>
    {
        const { onChangeName } = this.props;
        const name = e.target.value;
        onChangeName( name );
    }


    render()
    {
        const { name, tags } = this.props;

        return (

            <Container rows>

                <input
                    name="doc"
                    placeholder="Enter a title..."
                    value={ name || '' }
                    onChange={ this.handleChangeName } />

                <ul>
                    { tags.map( ( tag, i ) => <li key={ tag.id || i }>{ tag.name }</li> ) }
                </ul>

            </Container>

        );
    }
}
