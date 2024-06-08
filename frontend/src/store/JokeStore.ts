import { makeAutoObservable } from 'mobx';

class JokeStore {
  joke: string = '';
  showJokeWidget: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchJoke = async () => {
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();
      this.setJoke(data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  setJoke(joke: string) {
    this.joke = joke;
  }

  setShowJokeWidget(show: boolean) {
    this.showJokeWidget = show;
  }

  setShowJokeWidgetWrapper = (value: React.SetStateAction<boolean>) => {
    if (typeof value === 'function') {
      this.setShowJokeWidget(value(this.showJokeWidget));
    } else {
      this.setShowJokeWidget(value);
    }
  };
}

export default JokeStore;
