import React       from 'react';
import { HotKeys } from 'react-hotkeys';

import Container    from './Container';
import keyMap       from '../constants/keyMap';
import circleMotion from '../utils/circleMotion';


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
        next  : e => this.handleHighlight( +1, e ),
        prev  : e => this.handleHighlight( -1, e ),
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
        getSuggestions( value );
        this.resetHighlight();
    }


    handleSubmit = () =>
    {
        const { value, onSubmit } = this.props;

        onSubmit( value );
        this.resetHighlight();
    }


    handleHighlight = ( movement, e ) =>
    {
        e.preventDefault()

        if ( this.props.suggestions.length === 0 )
        {
            return;
        }

        const { suggestions, onChange } = this.props;

        // navigate through suggestions and go back to the first when the end is reached
        const highlighted = circleMotion( this.state.highlighted, suggestions.length, movement );

        onChange( suggestions[highlighted].name, true );
        this.setState( { highlighted } );
    }


    renderSuggestions()
    {
        const { highlighted } = this.state;
        const { value, suggestions, renderSuggestion:Suggestion } = this.props;

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

            <HotKeys keyMap={ keyMap } handlers={ this.handlers }>

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
