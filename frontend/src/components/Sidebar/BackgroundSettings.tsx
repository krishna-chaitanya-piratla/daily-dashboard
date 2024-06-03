import React, { useState } from 'react';
import { BackgroundSettingsContainer, RadioButtonContainer, ColorBoxContainer, ColorBox, TextInput } from '../../styled-components/Sidebar/BackgroundSettings';

interface BackgroundSettingsProps {
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ setBackgroundType, setBackgroundValue }) => {
  const [selectedBackground, setSelectedBackground] = useState<string>('solid');
  const [inputValue, setInputValue] = useState<string>('');
  const [tempBackgroundType, setTempBackgroundType] = useState<string>('solid');

  const presetColors = {
    color1: '#7C0902',
    color2: '#2F2C5C',
    color3: '#3E4125',
    color4: '#121010',
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTempBackgroundType(value);
    setSelectedBackground(value);
    if (value === 'solid') {
      setBackgroundType('solid');
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

  const handleColorBoxClick = (color: string) => {
    setBackgroundType('solid');
    setBackgroundValue(color);
    console.log('Background value set to:', color);
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
      {tempBackgroundType === 'solid' ? (
        <ColorBoxContainer>
          <ColorBox color={presetColors.color1} onClick={() => handleColorBoxClick(presetColors.color1)} />
          <ColorBox color={presetColors.color2} onClick={() => handleColorBoxClick(presetColors.color2)} />
          <ColorBox color={presetColors.color3} onClick={() => handleColorBoxClick(presetColors.color3)} />
          <ColorBox color={presetColors.color4} onClick={() => handleColorBoxClick(presetColors.color4)} />
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
