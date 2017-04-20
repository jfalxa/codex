import test        from 'ava';
import React       from 'react';
import { shallow } from 'enzyme';

import App from 'src/components/App';


test( 'App component', t =>
{
    const wrapper = shallow( <App /> );
    t.true( wrapper.contains( <h1>Salut</h1> ) );
} );
