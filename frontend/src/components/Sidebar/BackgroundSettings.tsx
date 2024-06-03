import React, { useState, useEffect } from 'react';
import { BackgroundSettingsContainer, RadioButtonContainer, ColorBoxContainer, ColorBox, TextInput } from '../../styled-components/Sidebar/BackgroundSettings';

interface BackgroundSettingsProps {
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
  setBackgroundType,
  setBackgroundValue,
  backgroundType,
  backgroundValue
}) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundType);
  const [solidValue, setSolidValue] = useState<string>(backgroundType === 'solid' ? backgroundValue : '#000000');
  const [unsplashValue, setUnsplashValue] = useState<string>(backgroundType === 'custom' ? backgroundValue : '');

  useEffect(() => {
    setSelectedBackground(backgroundType);
    if (backgroundType === 'solid') {
      setSolidValue(backgroundValue);
    } else if (backgroundType === 'custom') {
      setUnsplashValue(backgroundValue);
    }
  }, [backgroundType, backgroundValue]);

  const presetColors = {
    color1: '#7C0902',
    color2: '#2F2C5C',
    color3: '#3E4125',
    color4: '#121010',
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedBackground(value);
  };

  const handleSolidColorBoxClick = (color: string) => {
    setSolidValue(color);
    setBackgroundType('solid');
    setBackgroundValue(color);
    console.log('Background value set to:', color);
  };

  const handleUnsplashInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnsplashValue(event.target.value);
  };

  const handleUnsplashInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setBackgroundType('custom');
      setBackgroundValue(unsplashValue);
      console.log('Background value set to:', unsplashValue);
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
          <ColorBox color={presetColors.color1} onClick={() => handleSolidColorBoxClick(presetColors.color1)} />
          <ColorBox color={presetColors.color2} onClick={() => handleSolidColorBoxClick(presetColors.color2)} />
          <ColorBox color={presetColors.color3} onClick={() => handleSolidColorBoxClick(presetColors.color3)} />
          <ColorBox color={presetColors.color4} onClick={() => handleSolidColorBoxClick(presetColors.color4)} />
        </ColorBoxContainer>
      ) : (
        <TextInput 
          type="text" 
          placeholder="Enter search query" 
          value={unsplashValue} 
          onChange={handleUnsplashInputChange} 
          onKeyDown={handleUnsplashInputKeyDown}
        />
      )}
    </BackgroundSettingsContainer>
  );
};

export default BackgroundSettings;
