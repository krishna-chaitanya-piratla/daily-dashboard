import styled from 'styled-components';

export const WeatherContainer = styled.div`
  border: 1px solid none;
  border-radius: 10px;
  padding: 1rem;
  margin: 0;
  margin-bottom: -0.5rem;
  display: inline-block;
  color: var(--widget-text-color-primary);
  box-sizing: border-box;
  z-index: 100; /* Ensure it has a higher z-index */
  position: relative; /* Ensure positioning context for the dropdown */

  @media (max-width: 1600px) {
    font-size: 0.875rem; 
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;

export const TemperatureUnit = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  margin-left: 0.5rem;
  color: ${(props) => (props.isSelected ? 'var(--widget-text-color-primary)' : 'gray')};

  @media (min-width: 1025px) {
    margin-left: 1rem;
  }
`;
