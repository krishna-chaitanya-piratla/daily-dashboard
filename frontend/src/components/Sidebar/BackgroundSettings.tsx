import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { BackgroundSettingsContainer, RadioButtonContainer, ColorBoxContainer, ColorBox, StyledUnsplashInput, SaveButton, RefreshButton, CustomColorBox, RowContainer, RowLabel, StyledSaveColorButton, AddIconWrapper, ColorSelectionDiv } from '../../styled-components/Sidebar/BackgroundSettings';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  presetColors,
  handleRadioChange,
  handleSolidColorBoxClick,
  handleUnsplashInputChange,
  handleUnsplashInputKeyDown,
  handleSaveButtonClick,
  handleRefreshButtonClick,
  handleClickOutside,
  handleCustomColorBoxClick,
  handleColorChangeComplete,
  handleSaveCustomColor,
  isCustomColorSelected
} from '../../utils/sidebarFunctions';

interface BackgroundSettingsProps {
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
  customBackgroundColors: string[];
  setCustomBackgroundColors: (colors: string[]) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
  setBackgroundType,
  setBackgroundValue,
  setRefreshTrigger,
  backgroundType,
  backgroundValue,
  customBackgroundColors,
  setCustomBackgroundColors
}) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundType);
  const [solidValue, setSolidValue] = useState<string>(backgroundType === 'solid' ? backgroundValue : '#000000');
  const [unsplashValue, setUnsplashValue] = useState<string>(backgroundType === 'custom' ? backgroundValue : '');
  const [isUnsplashValueChanged, setIsUnsplashValueChanged] = useState<boolean>(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('useEffect - backgroundType or backgroundValue changed');
    setSelectedBackground(backgroundType);
    if (backgroundType === 'solid') {
      setSolidValue(backgroundValue);
    } else if (backgroundType === 'custom') {
      setUnsplashValue(backgroundValue);
    }
  }, [backgroundType, backgroundValue]);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event, colorPickerRef, inputRef, setIsColorPickerOpen));
    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutside(event, colorPickerRef, inputRef, setIsColorPickerOpen));
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
            onChange={(event) => handleRadioChange(event, setSelectedBackground)}
          />
          Solid
        </label>
        <label>
          <input
            type="radio"
            name="background"
            value="custom"
            checked={selectedBackground === 'custom'}
            onChange={(event) => handleRadioChange(event, setSelectedBackground)}
          />
          Unsplash
        </label>
      </RadioButtonContainer>
      {selectedBackground === 'solid' ? (
        <ColorSelectionDiv>
          <RowContainer>
            <RowLabel>Presets</RowLabel>
            <ColorBoxContainer>
              {Object.values(presetColors).map((color, index) => (
                <ColorBox 
                  key={index}
                  color={color}
                  isSelected={solidValue === color}
                  onClick={() => handleSolidColorBoxClick(color, setSolidValue, setBackgroundType, setBackgroundValue)}
                />
              ))}
            </ColorBoxContainer>
          </RowContainer>
          <RowContainer>
            <RowLabel>Custom</RowLabel>
            <ColorBoxContainer>
              {customBackgroundColors.map((color, index) => (
                <ColorBox 
                  key={index}
                  color={color}
                  isSelected={solidValue === color}
                  onClick={() => handleSolidColorBoxClick(color, setSolidValue, setBackgroundType, setBackgroundValue)}
                />
              ))}
              <AddIconWrapper>
                <AddCircleOutlineIcon onClick={() => handleCustomColorBoxClick(isColorPickerOpen, setIsColorPickerOpen)} />
              </AddIconWrapper>
            </ColorBoxContainer>
          </RowContainer>
        </ColorSelectionDiv>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledUnsplashInput 
            ref={inputRef}
            type="text" 
            placeholder="Enter search query" 
            value={unsplashValue} 
            onChange={(event) => handleUnsplashInputChange(event, setUnsplashValue, setIsUnsplashValueChanged, backgroundValue)} 
            onKeyDown={(event) => handleUnsplashInputKeyDown(event, unsplashValue, backgroundValue, setUnsplashValue, setIsUnsplashValueChanged, setBackgroundType, setBackgroundValue)}
          />
          {isUnsplashValueChanged ? (
            <SaveButton onClick={() => handleSaveButtonClick(unsplashValue, setBackgroundType, setBackgroundValue, setIsUnsplashValueChanged)} />
          ) : unsplashValue && (
            <RefreshButton as={RefreshIcon} onClick={() => handleRefreshButtonClick(unsplashValue, setRefreshTrigger)} />
          )}
        </div>
      )}
      {isColorPickerOpen && (
        <div ref={colorPickerRef}>
          <SketchPicker
            color={customColor}
            onChangeComplete={(color) => handleColorChangeComplete(color, setCustomColor)}
          />
          <StyledSaveColorButton onClick={() => handleSaveCustomColor(customColor, customBackgroundColors, setCustomBackgroundColors, setIsColorPickerOpen)}>Save Color</StyledSaveColorButton>
        </div>
      )}
    </BackgroundSettingsContainer>
  );
};

export default BackgroundSettings;
