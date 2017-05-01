import React from 'react';

import Container from './Container';


export default class Autocomplete extends React.Component
{
    handleChangeAutocomplete = ( e ) =>
    {
        const { onChange } = this.props;
        const value = e.target.value;
        onChange( value );
    }


    handleSubmitAutocomplete = ( e ) =>
    {
        e.preventDefault();

        if ( !this.props.value )
        {
            return;
        }

        const { value, onSubmit } = this.props;
        onSubmit( value );
    }


    render()
    {
        const { value, suggestions } = this.props;

        return (

            <Container rows>

                <form
                    id="document-form"
                    onChange={ this.handleChangeAutocomplete }
                    onSubmit={ this.handleSubmitAutocomplete }>

                    <input
                        name="tag"
                        placeholder="Enter a tag..."
                        value={ value } />

                </form>

                <ul>
                    { suggestions.map( ( suggestion, i ) => <li key={ i }>{ suggestion }</li> ) }
                </ul>

            </Container>


        );
    }
}
