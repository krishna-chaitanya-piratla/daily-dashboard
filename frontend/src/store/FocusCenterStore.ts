import { makeAutoObservable } from 'mobx';
import axios from 'axios';

interface GreetingConfig {
  startHour: number;
  startMinute: number;
  message: string;
}

class FocusCenterStore {
  time: string = '';
  displaySeconds: boolean = false;
  displayAMPM: boolean = false;
  display24Hour: boolean = false;
  userName: string = 'Stranger';
  greetingConfigs: GreetingConfig[] = [
    { startHour: 6, startMinute: 0, message: 'Good Morning' },
    { startHour: 12, startMinute: 0, message: 'Good Afternoon' },
    { startHour: 18, startMinute: 0, message: 'Good Evening' },
    { startHour: 22, startMinute: 0, message: 'Time to Sleep' },
  ];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.setTime();
    setInterval(this.updateTime, 1000);
  }

  updateTime = () => {
    this.setTime();
  };

  setTime = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: this.displaySeconds ? 'numeric' : undefined,
      hour12: !this.display24Hour,
    };

    let timeString = date.toLocaleTimeString(undefined, options);

    if (!this.displayAMPM && !this.display24Hour) {
      timeString = timeString.replace(/ AM| PM/, '');
    }

    this.time = timeString;
  };

  getGreeting = (): string => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const welcomeName = this.userName === '' ? 'Stranger' : this.userName;

    let selectedGreeting = this.greetingConfigs[this.greetingConfigs.length - 1].message;

    for (let i = 0; i < this.greetingConfigs.length; i++) {
      const { startHour, startMinute, message } = this.greetingConfigs[i];
      if (
        currentHour > startHour ||
        (currentHour === startHour && currentMinute >= startMinute)
      ) {
        selectedGreeting = message;
      } else {
        break;
      }
    }

    // If the current time is before the first start time, use the last configuration's message
    if (
      currentHour < this.greetingConfigs[0].startHour ||
      (currentHour === this.greetingConfigs[0].startHour && currentMinute < this.greetingConfigs[0].startMinute)
    ) {
      selectedGreeting = this.greetingConfigs[this.greetingConfigs.length - 1].message;
    }

    return `${selectedGreeting}`;
  };

  setUserName = (userName: string) => {
    this.userName = userName && userName !== '' ? userName : 'Stranger';
  };

  updateUserName = async (userName: string) => {
    this.setUserName(userName);
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/username`, { userName });
      console.log('Username updated successfully:', userName);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  setUserNameWrapper = (value: React.SetStateAction<string>) => {
    if (typeof value === 'function') {
      this.setUserName(value(this.userName));
    } else {
      this.setUserName(value);
    }
  };

  setDisplaySeconds = (display: boolean) => {
    this.displaySeconds = display;
    this.setTime();
  };

  setDisplayAMPM = (display: boolean) => {
    this.displayAMPM = display;
    this.setTime();
  };

  setDisplay24Hour = (display: boolean) => {
    this.display24Hour = display;
    this.setTime();
  };

  setGreetingConfigs = (configs: GreetingConfig[]) => {
    this.greetingConfigs = configs;
  };
}

export default FocusCenterStore;
