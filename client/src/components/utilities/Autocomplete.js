import React from 'react';

import { Suggestion, Suggestions } from './Suggestion';
import HotKeysContainer            from './HotKeysContainer';
import keyMap                      from '../../constants/keyMap';
import circleMotion                from '../../utils/circleMotion';


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
        esc   : () => this.closeSuggestions(),
        enter : () => this.handleSubmit()
    }


    resetHighlight()
    {
        this.setState( { highlighted : -1 } );
    }


    closeSuggestions = () =>
    {
        this.resetHighlight();
        this.props.getSuggestions( '' );
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

        const { suggestions, onAutocomplete } = this.props;

        // navigate through suggestions and go back to the first when the end is reached
        const highlighted = circleMotion( this.state.highlighted, suggestions.length, movement );

        onAutocomplete( suggestions[highlighted].name, true );
        this.setState( { highlighted } );
    }


    renderSuggestions()
    {
        if ( this.props.suggestions.length === 0 )
        {
            return null;
        }

        const { highlighted } = this.state;
        const { value, suggestions, renderSuggestion:Suggestion } = this.props;

        const suggestionEls = suggestions.map( ( suggestion, i ) =>
        (
            <Suggestion
                key={ i }
                highlighted={ ( highlighted === i ) }>
                { suggestion.name }
            </Suggestion>
        ) );

        return <Suggestions>{ suggestionEls }</Suggestions>;
    }


    render()
    {
        const { value, className, renderInput:Input, layout } = this.props;

        return (

            <HotKeysContainer
                className={ className }
                keyMap={ keyMap }
                handlers={ this.handlers }>

                <Input
                    value={ value }
                    onChange={ this.handleChange }
                    onBlur={ this.closeSuggestions } />

                { this.renderSuggestions() }

            </HotKeysContainer>

        );
    }
}
