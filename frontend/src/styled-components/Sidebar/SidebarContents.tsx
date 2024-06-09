import styled from 'styled-components';
import { Switch } from '@mui/material';

export const SidebarContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--separator-color); /* Adjust color as needed */
  margin: 10px 0; /* Adjust spacing as needed */
`;

export const AccordionContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export const AccordionHeader = styled.div`
  font-family: var(--font-family-primary);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  color: var(--widget-text-color-primary);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: var(--widget-hover-background-color);
  }
`;

export const AccordionContent = styled.div`
  padding: 10px;
  background-color: var(--widget-background-color);
  border-radius: 5px;
  margin-top: 5px;
  animation: slide-down 0.3s ease-out;

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledSwitch = styled(Switch)`
  && {
    .MuiSwitch-switchBase.Mui-checked {
      color: deeppink;
    }

    .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
      background-color: deeppink;
    }

    .MuiSwitch-thumb {
      position: relative;
    }

    .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb:before {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px; /* Adjust the size as needed */
      color: white;
    }
  }
`;


export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;
