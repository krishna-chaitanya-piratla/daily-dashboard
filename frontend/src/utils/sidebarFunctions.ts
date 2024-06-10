import axios from 'axios';
import BackgroundStore from '../store/BackgroundStore'; // Import the BackgroundStore

export const presetColors = {
  color2: '#2F2C5C',
  color1: '#7C0902',
  color3: '#3E4125',
  color4: '#121010',
};

// BackgroundSettings related functions
export const handleRadioChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedBackground: React.Dispatch<React.SetStateAction<string>>,
  setUnsplashValue: React.Dispatch<React.SetStateAction<string>>,
  backgroundStore: BackgroundStore
) => {
  const { value } = event.target;
  console.log('handleRadioChange', value);
  setSelectedBackground(value);

  if (value === 'custom') {
    if (backgroundStore.type === 'custom') {
      setUnsplashValue(backgroundStore.value); // Set Unsplash input field to current custom background value
    } else {
      setUnsplashValue(''); // Clear Unsplash input field if switching from solid background
    }
  }
};

export const handleSolidColorBoxClick = (
  color: string,
  setSolidValue: React.Dispatch<React.SetStateAction<string>>,
  setBackgroundType: (type: 'custom' | 'solid') => void,
  setBackgroundValue: (value: string) => void,
  setUnsplashValue: React.Dispatch<React.SetStateAction<string>> // Add this parameter
) => {
  console.log('handleSolidColorBoxClick', color);
  setSolidValue(color);
  setBackgroundType('solid');
  setBackgroundValue(color);
  setUnsplashValue(''); // Reset Unsplash query when a solid background is rendered

  // Call backend to save the background preference
  axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/background`, {
    type: 'solid',
    value: color
  })
  .then(response => {
    console.log('Background preference updated:', response.data);
  })
  .catch(error => {
    console.error('Error updating background preference:', error);
  });
};

export const handleUnsplashInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setUnsplashValue: React.Dispatch<React.SetStateAction<string>>,
  setIsUnsplashValueChanged: React.Dispatch<React.SetStateAction<boolean>>,
  backgroundValue: string
) => {
  console.log('handleUnsplashInputChange', event.target.value);
  setUnsplashValue(event.target.value);
  setIsUnsplashValueChanged(event.target.value !== backgroundValue);
};

export const handleUnsplashInputKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  unsplashValue: string,
  backgroundValue: string,
  setUnsplashValue: React.Dispatch<React.SetStateAction<string>>,
  setIsUnsplashValueChanged: React.Dispatch<React.SetStateAction<boolean>>,
  setBackgroundType: (type: 'custom' | 'solid') => void,
  setBackgroundValue: (value: string) => void
) => {
  if (event.key === 'Enter') {
    console.log('handleUnsplashInputKeyDown - Enter pressed');
    setBackgroundType('custom');
    setBackgroundValue(unsplashValue);
    setIsUnsplashValueChanged(false);

    // Call backend to save the background preference
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/background`, {
      type: 'custom',
      value: unsplashValue
    })
    .then(response => {
      console.log('Background preference updated:', response.data);
    })
    .catch(error => {
      console.error('Error updating background preference:', error);
    });
  } else if (event.key === 'Escape') {
    console.log('handleUnsplashInputKeyDown - Escape pressed');
    setUnsplashValue(backgroundValue);
    setIsUnsplashValueChanged(false);
  }
};

export const handleSaveButtonClick = (
  unsplashValue: string,
  setBackgroundType: (type: 'custom' | 'solid') => void,
  setBackgroundValue: (value: string) => void,
  setIsUnsplashValueChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log('handleSaveButtonClick');
  setBackgroundType('custom');
  setBackgroundValue(unsplashValue);
  setIsUnsplashValueChanged(false);

  // Call backend to save the background preference
  axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/background`, {
    type: 'custom',
    value: unsplashValue
  })
  .then(response => {
    console.log('Background preference updated:', response.data);
  })
  .catch(error => {
    console.error('Error updating background preference:', error);
  });
};

export const handleRefreshButtonClick = (
  unsplashValue: string,
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>
) => {
  console.log('handleRefreshButtonClick');
  setRefreshTrigger((prev: number) => {
    const newValue = prev + 1;
    console.log('setRefreshTrigger', newValue);
    return newValue;
  });
  console.log('Background refreshed with value:', unsplashValue);
};

export const handleClickOutside = (
  event: MouseEvent,
  colorPickerRef: React.RefObject<HTMLDivElement>,
  inputRef: React.RefObject<HTMLInputElement>,
  setIsColorPickerOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    colorPickerRef.current &&
    !colorPickerRef.current.contains(event.target as Node) &&
    (!inputRef.current || !inputRef.current.contains(event.target as Node))
  ) {
    console.log('handleClickOutside');
    setIsColorPickerOpen(false);
  }
};

export const handleCustomColorBoxClick = (
  isColorPickerOpen: boolean,
  setIsColorPickerOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsColorPickerOpen(!isColorPickerOpen);
};

export const handleColorChangeComplete = (
  color: any,
  setCustomColor: React.Dispatch<React.SetStateAction<string>>
) => {
  const selectedColor = color.hex;
  setCustomColor(selectedColor);
  console.log('Custom color selected:', selectedColor);
};

export const handleSaveCustomColor = (
  customColor: string,
  customBackgroundColors: string[],
  setCustomBackgroundColors: (colors: string[]) => void,
  setIsColorPickerOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const updatedCustomColors = [...customBackgroundColors, customColor];
  setCustomBackgroundColors(updatedCustomColors);
  setIsColorPickerOpen(false);

  // Call backend to save the custom background colors
  axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/custombackgroundcolors`, {
    customBackgroundColors: updatedCustomColors
  })
  .then(response => {
    console.log('Custom background colors updated:', response.data);
  })
  .catch(error => {
    console.error('Error updating custom background colors:', error);
  });
};

export const isCustomColorSelected = (
  backgroundType: 'custom' | 'solid',
  backgroundValue: string
): boolean => {
  return backgroundType === 'solid' && !Object.values(presetColors).includes(backgroundValue);
};

// UserName related functions
export const handleUsernameChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setTempUsername: React.Dispatch<React.SetStateAction<string>>
) => {
  setTempUsername(event.target.value);
};

export const handleEditClick = (
  username: string,
  setTempUsername: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setTempUsername(username);
  setIsEditing(true);
};

export const handleSaveClick = async (
  tempUsername: string,
  setUsername: (username: string) => void,
  setIsEditing: (isEditing: boolean) => void
) => {
  console.log('Saving username:', tempUsername);
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/username`, { userName: tempUsername })
    .then(response => {
      console.log('Username updated successfully through click:', response.data);
    })
    .catch(error => {
      console.error('There was an error updating the username through click:', error);
    });
    setUsername(tempUsername);
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating username:', error);
  }
};

export const handleKeyPress = (
  event: React.KeyboardEvent<HTMLInputElement>,
  tempUsername: string,
  setUsername: (username: string) => void,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (event.key === 'Enter') {
    setUsername(tempUsername);
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/username`, { userName: tempUsername })
      .then(response => {
        console.log('Username updated successfully through enter key press:', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the username through enter key press:', error);
      });
    setIsEditing(false);
  }
};


export const handleClearClick = (
  username: string,
  setTempUsername: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setTempUsername(username);
  setIsEditing(false);
};



export const handleDoubleClick = (
  username: string,
  setTempUsername: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setTempUsername(username);
  setIsEditing(true);
};
