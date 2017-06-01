import React           from 'react';
import { findDOMNode } from 'react-dom';

import SearchInput        from './SearchInput';
import SearchAutocomplete from './SearchAutocomplete';


const WHITESPACE_RX = /\s/;
const LEFT_RX       = /^((?:[^"\s]|"[^"]+"|\s)*?)([^"\s]+|"[^"]*"?)$/;
const RIGHT_RX      = /^([^"\s]+|[^"]*")((?:[^"\s]|"[^"]+"|\s)*?)$/;



function formatSuggestion( suggestion, isLabel )
{
    let formattedSuggestion = suggestion;

    if ( WHITESPACE_RX.test( suggestion ) )
    {
        formattedSuggestion = `"${ formattedSuggestion }"`;
    }

    if ( isLabel )
    {
        formattedSuggestion = `~${ formattedSuggestion }`;
    }

    return formattedSuggestion;
}


export default class Search extends React.Component
{
    componentDidUpdate()
    {
        this.getInput().setSelectionRange( this.cursor, this.cursor );
    }


    getInput()
    {
        return findDOMNode( this ).querySelector( 'input' );
    }


    isolateEdited( value, cursor )
    {
        const left  = value.slice( 0, cursor );
        const right = value.slice( cursor );

        const leftMatch  = left.match( LEFT_RX );
        const rightMatch = right.match( RIGHT_RX );

        const leftStart  = leftMatch ? leftMatch[1] : left;
        const rightStart = rightMatch ? rightMatch[1] : '';
        const leftEnd    = leftMatch ? leftMatch[2] : '';
        const rightEnd   = rightMatch ? rightMatch[2] : right;

        return [leftStart, leftEnd + rightStart, rightEnd];
    }


    getSuggestions = ( value ) =>
    {
        const cursor = this.getInput().selectionStart;
        const edited = this.isolateEdited( value, cursor )[1];

        const category = ( edited[0] === '~' ) ? 'label' : 'tag';

        this.props.apiAutocomplete( category, edited );
    }


    searchDocs( search )
    {
        const { setSearch, apiSearchDocs } = this.props;

        setSearch( search );
        apiSearchDocs( search );
    }


    handleChange = ( value ) =>
    {
        this.cursor = this.getInput().selectionStart;
        this.searchDocs( value );
    }


    handleAutocomplete = ( suggestion ) =>
    {
        const cursor              = this.getInput().selectionStart;
        const [left, prev, right] = this.isolateEdited( this.props.search, cursor );

        const isLabel             = ( prev[0] === '~' )
        const formattedSuggestion = formatSuggestion( suggestion, isLabel );

        this.cursor = ( left + formattedSuggestion ).length;
        this.searchDocs( left + formattedSuggestion + right );
    }


    handleSubmit = () =>
    {
        this.props.apiAutocomplete( '' );
        this.props.history.push( '/' );
    }



    render()
    {
        const { search, suggestions } = this.props;

        return (

            <SearchAutocomplete
                value={ search }
                suggestions={ suggestions }
                onAutocomplete={ this.handleAutocomplete }
                onChange={ this.handleChange }
                onSubmit={ this.handleSubmit }
                getSuggestions={ this.getSuggestions }
                renderInput={ SearchInput } />

        );
    }

}

