import React, { useState } from 'react';
import { BackgroundSettingsContainer, RadioButtonContainer, ColorBoxContainer, ColorBox, TextInput } from '../../styled-components/Sidebar/BackgroundSettings';

const BackgroundSettings: React.FC = () => {
  const [selectedBackground, setSelectedBackground] = useState<string>('solid');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBackground(event.target.value);
  };

  return (
    <BackgroundSettingsContainer>
      <h3>Background</h3>
      <RadioButtonContainer>
        <label>
          <input
            type="radio"
            name="background"
            value="solid"
            checked={selectedBackground === 'solid'}
            onChange={handleRadioChange}
          />
          Solid
        </label>
        <label>
          <input
            type="radio"
            name="background"
            value="unsplash"
            checked={selectedBackground === 'unsplash'}
            onChange={handleRadioChange}
          />
          Unsplash
        </label>
      </RadioButtonContainer>
      {selectedBackground === 'solid' ? (
        <ColorBoxContainer>
          <ColorBox color="red" />
          <ColorBox color="blue" />
          <ColorBox color="green" />
        </ColorBoxContainer>
      ) : (
        <TextInput type="text" placeholder="Enter search query" />
      )}
    </BackgroundSettingsContainer>
  );
};

export default BackgroundSettings;
