import { makeAutoObservable } from 'mobx';

class FocusCenterStore {
  time: string = '';
  greeting: string = '';
  displaySeconds: boolean = false;
  displayAMPM: boolean = false;
  display24Hour: boolean = false;
  userName: string = 'Stranger';

  constructor() {
    makeAutoObservable(this);
    this.setTime();
    this.setGreeting();
    setInterval(this.setTime, 1000);
    setInterval(this.setGreeting, 60000);
  }

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

  setGreeting = () => {
    const currentHour = new Date().getHours();
    const welcomeName = this.userName === '' ? 'Stranger' : this.userName;

    if (currentHour >= 22 || currentHour < 4) {
      this.greeting = `Time to Sleep, ${welcomeName}`;
    } else if (currentHour >= 4 && currentHour < 12) {
      this.greeting = `Good Morning, ${welcomeName}`;
    } else {
      this.greeting = `Good Evening, ${welcomeName}`;
    }
  };

  setUserName = (userName: string) => {
    this.userName = userName && userName !== '' ? userName : 'Stranger';
    this.setGreeting();
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
}

export default FocusCenterStore;
