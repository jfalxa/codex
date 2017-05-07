import styled from 'styled-components';


const Suggestion = styled.li`

    font-weight: ${ p => p.highlighted ? 'bold' : 'normal' };

`;


export default Suggestion;
