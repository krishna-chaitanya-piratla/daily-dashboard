import React, { useState, useEffect, useRef } from 'react';
import { BackgroundSettingsContainer, RadioButtonContainer, ColorBoxContainer, ColorBox, StyledUnsplashInput, SaveButton, RefreshButton } from '../../styled-components/Sidebar/BackgroundSettings';
import RefreshIcon from '@mui/icons-material/Refresh';

interface BackgroundSettingsProps {
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
  setBackgroundType,
  setBackgroundValue,
  setRefreshTrigger,
  backgroundType,
  backgroundValue
}) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundType);
  const [solidValue, setSolidValue] = useState<string>(backgroundType === 'solid' ? backgroundValue : '#000000');
  const [unsplashValue, setUnsplashValue] = useState<string>(backgroundType === 'custom' ? backgroundValue : '');
  const [isUnsplashValueChanged, setIsUnsplashValueChanged] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('useEffect - backgroundType or backgroundValue changed');
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
    console.log('handleRadioChange', value);
    setSelectedBackground(value);
  };

  const handleSolidColorBoxClick = (color: string) => {
    console.log('handleSolidColorBoxClick', color);
    setSolidValue(color);
    setBackgroundType('solid');
    setBackgroundValue(color);
    console.log('Background value set to:', color);
  };

  const handleUnsplashInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleUnsplashInputChange', event.target.value);
    setUnsplashValue(event.target.value);
    setIsUnsplashValueChanged(event.target.value !== backgroundValue);
  };

  const handleUnsplashInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('handleUnsplashInputKeyDown - Enter pressed');
      setBackgroundType('custom');
      setBackgroundValue(unsplashValue);
      setIsUnsplashValueChanged(false);
      console.log('Background value set to:', unsplashValue);
    } else if (event.key === 'Escape') {
      console.log('handleUnsplashInputKeyDown - Escape pressed');
      setUnsplashValue(backgroundValue);
      setIsUnsplashValueChanged(false);
    }
  };

  const handleSaveButtonClick = () => {
    console.log('handleSaveButtonClick');
    setBackgroundType('custom');
    setBackgroundValue(unsplashValue);
    setIsUnsplashValueChanged(false);
    console.log('Background value set to:', unsplashValue);
  };

  const handleRefreshButtonClick = () => {
    console.log('handleRefreshButtonClick');
    setRefreshTrigger((prev: number) => {
      const newValue = prev + 1;
      console.log('setRefreshTrigger', newValue);
      return newValue;
    });
    console.log('Background refreshed with value:', unsplashValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      console.log('handleClickOutside');
      setUnsplashValue(backgroundValue);
      setIsUnsplashValueChanged(false);
    }
  };

  useEffect(() => {
    console.log('useEffect - add event listener for mousedown');
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      console.log('useEffect - remove event listener for mousedown');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledUnsplashInput 
            ref={inputRef}
            type="text" 
            placeholder="Enter search query" 
            value={unsplashValue} 
            onChange={handleUnsplashInputChange} 
            onKeyDown={handleUnsplashInputKeyDown}
          />
          {isUnsplashValueChanged ? (
            <SaveButton onClick={handleSaveButtonClick} />
          ) : unsplashValue && (
            <RefreshButton as={RefreshIcon} onClick={handleRefreshButtonClick} />
          )}
        </div>
      )}
    </BackgroundSettingsContainer>
  );
};

export default BackgroundSettings;
