import styled from 'styled-components';

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

export const ColorBox = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color};
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  box-sizing: border-box;
`;
