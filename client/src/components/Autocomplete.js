import React       from 'react';
import { HotKeys } from 'react-hotkeys';

import Container from './Container';


export default class Autocomplete extends React.Component
{
    state =
    {
        highlighted : -1
    }


    handlers =
    {
        down  : () => this.handleHighlight( +1 ),
        up    : () => this.handleHighlight( -1 ),
        esc   : () => this.resetHighlight(),
        enter : () => this.handleSubmit()
    }


    resetHighlight()
    {
        this.setState( { highlighted : -1 } );
    }


    handleChange = ( e ) =>
    {
        const { onChange, getSuggestions } = this.props;

        const value = e.target.value;

        onChange( value );
        this.resetHighlight();

        if ( value.length > 2 )
        {
            getSuggestions( value );
        }
    }


    handleSubmit = () =>
    {
        if ( !this.props.value )
        {
            return;
        }

        const { value, onSubmit } = this.props;

        onSubmit( { name : value } );
        this.resetHighlight();
    }


    handleHighlight = ( movement ) =>
    {
        const { suggestions, onChange } = this.props;

        // navigate through suggestions and go back to the first when the end is reached
        const highlighted = ( this.state.highlighted + movement + suggestions.length ) % suggestions.length;

        onChange( suggestions[highlighted].name );
        this.setState( { highlighted } );
    }


    renderSuggestions()
    {
        const { suggestions } = this.props;
        const { highlighted } = this.state;

        return suggestions.map( ( suggestion, i ) =>
        (
            <li
                key={ i }
                style={ { fontWeight : ( i === highlighted ) ? 'bold' : 'normal' } }>
                { suggestion.name }
            </li>
        ) );
    }


    render()
    {
        const { value } = this.props;

        return (

            <HotKeys handlers={ this.handlers }>

                <Container rows>

                    <input
                        autoComplete="off"
                        name="tag"
                        placeholder="Enter a tag..."
                        value={ value }
                        onChange={ this.handleChange } />

                    { this.renderSuggestions() }

                </Container>

            </HotKeys>

        );
    }
}
