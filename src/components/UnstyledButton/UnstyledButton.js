import styled from 'styled-components/macro';

export default styled.button`
  display: ${(props) => props.display || 'block'};
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: center;
  font: inherit;
  color: inherit;

  &:focus {
    outline-offset: 2px;
  }
  /* Focusing the button with a mouse, touch, or stylus */
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
