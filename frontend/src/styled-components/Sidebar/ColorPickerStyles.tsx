import styled from 'styled-components';
import { SketchPicker } from 'react-color';

export const StyledColorPicker = styled(SketchPicker)`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  height: 20rem;

  &:hover {
    cursor: crosshair;
  }

  .flexbox-fix {
    display: flex;
  }

  input {
    background-color: ${(props) => props.theme.inputBackgroundColor};
    color: ${(props) => props.theme.inputColor};
  }

  .flexbox-fix div {
    border-radius: 5px;
  }

  .flexbox-fix div div {
    border-radius: 5px;
  }
`;

export const StyledSaveColorButton = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: var(--widget-background-color);
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

export const StyledRevertColorButton = styled.button`
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;

  &:hover {
    background-color: var(--widget-background-color);
    color: white;
  }

  &:focus {
    outline: none;
  }
`;
