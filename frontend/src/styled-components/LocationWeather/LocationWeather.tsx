import styled from 'styled-components';

export const StyledLocationWeather = styled.div`
  background: none;
  font-family: var(--font-family-primary);
  font-size: 1rem; /* Slightly smaller font for better readability */
  text-align: left;
  border: 1px solid none;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  display: inline-block;
  color: var(--widget-text-color-primary);
  box-sizing: border-box; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); 
  
  @media (max-width: 1600px) {
    font-size: 0.875rem; 
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;

export const StyledLocation = styled.p`
  margin: 0.5rem;
  padding: 0.5rem;
  margin-top: -1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  @media (max-width: 1600px) {
    margin-top: -1.5rem;
  }
`;
