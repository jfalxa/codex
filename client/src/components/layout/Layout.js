import React from 'react';


// @TODO Make sure the passed props are only layout props
export default function Layout( { children, ...layout } )
{
    const child = React.Children.only( children );
    return React.cloneElement( child, { layout } );
}
