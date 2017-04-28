import React from 'react';

import Container from './Container';


export default class DocumentForm extends React.Component
{
    handleAutocompleteChange = ( e ) =>
    {
        const { autocomplete } = this.props;
        const input = e.target.value;
        autocomplete( input );
    }


    handleAutocompleteSubmit = ( e ) =>
    {
        e.preventDefault();
        const { input, addTag } = this.props;
        addTag( input );
    }


    render()
    {
        const { tags, input, suggestions } = this.props;

        return (

            <Container columns>

                <Container rows>

                    <form
                        id="document-form"
                        onChange={ this.handleAutocompleteChange }
                        onSubmit={ this.handleAutocompleteSubmit }>

                        <input name="tag" value={ input  } />

                    </form>

                    <ul>
                        { suggestions.map( suggestion => <li>{ suggestion }</li> ) }
                    </ul>

                </Container>

                <Container rows>

                    <ul>
                        { tags.map( tag => <li>{ tag }</li> ) }
                    </ul>

                </Container>

            </Container>

        );
    }
}
