import styled from 'styled-components';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';


export const BackgroundSettingsContainer = styled.div`
  width: 100%;
`;

export const RadioButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const ColorBoxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const ColorBox = styled.div<{ color: string; isSelected: boolean }>`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: ${(props) => (props.isSelected ? '2px solid white' : 'none')};
  box-shadow: ${(props) => (props.isSelected ? '0 0 5px white' : 'none')};
`;

export const CustomColorBox = styled.div<{ color: string; isSelected: boolean }>`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color || 'transparent'};
  border: ${(props) => (props.isSelected ? '2px solid white' : '1px solid white')};
  box-shadow: ${(props) => (props.isSelected ? '0 0 5px white' : 'none')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledUnsplashInput = styled.input`
  font-size: 1.15rem;
  font-family: SriRacha;
  max-width: 35%;
  height: 2.5rem;
  background: none;
  border: none;
  border-radius: 10px;
  padding: 0 0.25rem;
  margin: 0.5rem 0;
  margin-left: 1rem;
  color: inherit;
  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.5px var(--input-focus-box-shadow-color);
    color: var(--input-focus-text-color);
  }
 
  &::placeholder {
    color: var(--input-placeholder-color);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const SaveButton = styled(SaveIcon)`
  font-size: 2rem;
  color: var(--widget-text-color-primary);
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    color: var(--widget-text-color-secondary);
  }
`;

export const RefreshButton = styled(RefreshIcon)`
  font-size: 2rem;
  color: var(--widget-text-color-primary);
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    color: var(--widget-text-color-secondary);
  }
`;
