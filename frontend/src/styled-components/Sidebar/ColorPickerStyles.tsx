import styled from 'styled-components';
import { SketchPicker } from 'react-color';

export const ColorPickerContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto; /* Adjust this as necessary */
`;

export const ColorPickerAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%; /* Takes up 90% of the width */
`;

export const SaveandRevertButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* Takes up the remaining 10% of the width */
`;

export const RightSpace = styled.div`
  width: 10%; /* Takes up the remaining 10% of the width */
  position: relative;
`;

export const StyledColorPicker = styled(SketchPicker)`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1 !important; /* Make the color picker take up the remaining space */
  width: auto !important; /* Allow the width to be auto */
  max-width: 100%; /* Ensure it fits within the parent div */

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

export const StyledColorButton = styled.button`
  font-family: 'Wotfard', sans-serif;
  background-color: var(--widget-background-color);
  color: white;
  border: 0.5px dotted gray;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.15rem;
  cursor: pointer;
  margin: 0.5rem;

  &:hover {
    border: none;
    background-color: deeppink;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

export const StyledCloseIconButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }

  &:focus {
    outline: none;
  }
`;
