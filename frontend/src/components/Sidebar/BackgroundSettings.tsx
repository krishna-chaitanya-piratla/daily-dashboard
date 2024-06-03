import React from 'react';
import { BackgroundSettingsContainer, RadioButtonContainer } from '../../styled-components/Sidebar/BackgroundSettings';

const BackgroundSettings: React.FC = () => {
  return (
    <BackgroundSettingsContainer>
      <h3>Background</h3>
      <RadioButtonContainer>
        <label>
          <input type="radio" name="background" value="solid" />
          Solid
        </label>
        <label>
          <input type="radio" name="background" value="unsplash" />
          Unsplash
        </label>
      </RadioButtonContainer>
    </BackgroundSettingsContainer>
  );
};

export default BackgroundSettings;
