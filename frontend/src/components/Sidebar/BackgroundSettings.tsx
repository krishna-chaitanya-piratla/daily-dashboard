import React, { useState } from 'react';
import { BackgroundSettingsContainer, RadioButtonContainer, ColorBoxContainer, ColorBox, TextInput } from '../../styled-components/Sidebar/BackgroundSettings';

interface BackgroundSettingsProps {
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ setBackgroundType, setBackgroundValue }) => {
  const [selectedBackground, setSelectedBackground] = useState<string>('solid');
  const [inputValue, setInputValue] = useState<string>('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedBackground(value);
    setBackgroundType(value as 'custom' | 'solid');
    if (value === 'solid') {
      setBackgroundValue('#000000');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setBackgroundType('custom');
      setBackgroundValue(inputValue);
      console.log('Background value set to:', inputValue);
    }
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
            value="custom"
            checked={selectedBackground === 'custom'}
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
        <TextInput 
          type="text" 
          placeholder="Enter search query" 
          value={inputValue} 
          onChange={handleInputChange} 
          onKeyDown={handleInputKeyDown}
        />
      )}
    </BackgroundSettingsContainer>
  );
};

export default BackgroundSettings;
