import styled from 'styled-components';

export const StyledDateTimeLocation = styled.div`
  font-size: 14px;
  text-align: right;
  border: 1px solid none;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  display: inline-block;
  background-color: var(--widget-background-color);
  color: var(--widget-text-color-secondary);
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--widget-box-shadow);
`;

export const StyledTime = styled.p`
  font-size: 3em;
  margin: 0;
`;

export const StyledDate = styled.p`
  font-size: 1em;
  margin: 0;
`;

export const StyledLocation = styled.p`
  font-size: 1em;
  margin: 0;
`;
