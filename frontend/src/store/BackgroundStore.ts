import { makeAutoObservable } from 'mobx';

class BackgroundStore {
  type: 'custom' | 'solid' = 'solid';
  value: string = '#2f2c5c';
  originalValue: string = '#2f2c5c'; // Add originalValue to store the original color
  customBackgroundColors: string[] = [];
  refreshTrigger: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setType(type: 'custom' | 'solid') {
    this.type = type;
  }

  setValue(value: string) {
    this.value = value;
  }

  setOriginalValue(value: string) {
    this.originalValue = value;
  }

  setCustomBackgroundColors(colors: string[]) {
    this.customBackgroundColors = colors;
  }

  setRefreshTrigger(trigger: number) {
    this.refreshTrigger = trigger;
  }

  // Wrapper functions for compatibility with Dispatch<SetStateAction<T>>
  setTypeWrapper = (value: React.SetStateAction<'custom' | 'solid'>) => {
    if (typeof value === 'function') {
      this.setType(value(this.type));
    } else {
      this.setType(value);
    }
  };

  setValueWrapper = (value: React.SetStateAction<string>) => {
    if (typeof value === 'function') {
      this.setValue(value(this.value));
    } else {
      this.setValue(value);
    }
  };

  setOriginalValueWrapper = (value: React.SetStateAction<string>) => {
    if (typeof value === 'function') {
      this.setOriginalValue(value(this.originalValue));
    } else {
      this.setOriginalValue(value);
    }
  };

  setCustomBackgroundColorsWrapper = (value: React.SetStateAction<string[]>) => {
    if (typeof value === 'function') {
      this.setCustomBackgroundColors(value(this.customBackgroundColors));
    } else {
      this.setCustomBackgroundColors(value);
    }
  };

  setRefreshTriggerWrapper = (value: React.SetStateAction<number>) => {
    if (typeof value === 'function') {
      this.setRefreshTrigger(value(this.refreshTrigger));
    } else {
      this.setRefreshTrigger(value);
    }
  };
}

export default BackgroundStore;
