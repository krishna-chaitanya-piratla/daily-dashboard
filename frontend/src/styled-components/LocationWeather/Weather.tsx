import styled from 'styled-components';

export const WeatherContainer = styled.div`
  font-family: var(--font-family-primary);
  font-size: 14px;
  text-align: left;
  border: 1px solid none;
  border-radius: 10px;
  padding: 0px;
  margin: 0px;
  display: inline-block;
  color: var(--widget-text-color-secondary);
  box-sizing: border-box;
  z-index: 100; /* Ensure it has a higher z-index */
  position: relative; /* Ensure positioning context for the dropdown */
`;

export const TemperatureUnit = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  margin-left: 5px;
  color: ${(props) => (props.isSelected ? 'inherit' : 'gray')};
`;