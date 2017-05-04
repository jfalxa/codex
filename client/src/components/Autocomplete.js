import React       from 'react';
import { HotKeys } from 'react-hotkeys';

import Container from './Container';


function Suggestion( { text, highlighted } )
{
    return (

        <li style={ { fontWeight : ( highlighted ? 'bold' : 'normal' ) } }>
            { text }
        </li>

    );
}


export default class Autocomplete extends React.Component
{
    static defaultProps =
    {
        renderInput      : 'input',
        renderSuggestion : Suggestion
    }


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

        if ( value.length > 1 )
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
        const { highlighted } = this.state;
        const { suggestions, renderSuggestion:Suggestion } = this.props;

        return suggestions.map( ( suggestion, i ) =>
        (
            <Suggestion
                key={ i }
                text={ suggestion.name }
                highlighted={ ( highlighted === i ) } />
        ) );
    }


    render()
    {
        const { value, renderInput:Input } = this.props;

        return (

            <HotKeys handlers={ this.handlers }>

                <Container rows>

                    <Input
                        value={ value }
                        onChange={ this.handleChange } />

                    { this.renderSuggestions() }

                </Container>

            </HotKeys>

        );
    }
}
