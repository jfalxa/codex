import React           from 'react';
import { findDOMNode } from 'react-dom';

import SearchInput        from './SearchInput';
import SearchAutocomplete from './SearchAutocomplete';


const LEFT_RX  = /^((?:[^"\s]|"[^"]+"|\s)*?)([^"\s]+|"[^"]*"?)$/;
const RIGHT_RX = /^([^"\s]+|[^"]*")((?:[^"\s]|"[^"]+"|\s)*?)$/;


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
        const finalSuggestion = suggestion.includes( ' ' )
            ? `"${ suggestion }"`
            : suggestion;

        const cursor           = this.getInput().selectionStart;
        const [left, _, right] = this.isolateEdited( this.props.search, cursor );

        this.cursor = ( left + finalSuggestion ).length;
        this.searchDocs( left + finalSuggestion + right );
    }


    handleSubmit = () =>
    {
        this.props.apiAutocomplete( '' );
        this.props.history.push( '/' );
    }


    getSuggestions = ( value ) =>
    {
        const cursor = this.getInput().selectionStart;
        const edited = this.isolateEdited( value, cursor );

        this.props.apiAutocomplete( edited[1] );
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

