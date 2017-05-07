import { css } from 'styled-components';


function flex( props )
{
    if ( props.fill === true )
    {
        return 1;
    }
    else if ( props.fill > 0 )
    {
        return props.fill;
    }

    return 'initial';
}


function justifyContent( props )
{
    if ( props.mainStart )        return 'flex-start';
    if ( props.mainEnd )          return 'flex-end';
    if ( props.mainCenter )       return 'center';
    if ( props.mainSpaceBetween ) return 'space-between';
    if ( props.mainSpaceAround )  return 'space-around';
}


function alignItems( props )
{
    if ( props.crossCenter )   return 'center';
    if ( props.crossStart )    return 'flex-start';
    if ( props.crossEnd )      return 'flex-end';
    if ( props.crossStretch )  return 'stretch';
    if ( props.crossBaseline ) return 'baseline';
}


// Flexbox container for quick layouting.
// Configurable with props and extendable with custom styles.
const container = css`

    display:            ${ p => p.inline ? 'inline-flex' : 'flex' };
    box-sizing:         border-box;
    flex:               ${ flex };
    flex-direction:     ${ p => p.columns ? 'row' : 'column' };
    justify-content:    ${ justifyContent };
    align-items:        ${ alignItems };

`;


export default container;
