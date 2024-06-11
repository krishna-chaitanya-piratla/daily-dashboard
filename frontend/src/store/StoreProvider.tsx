import React, { createContext, useContext } from 'react';
import JokeStore from './JokeStore';
import BackgroundStore from './BackgroundStore';
import LocationWeatherStore from './LocationWeatherStore';
import FocusCenterStore from './FocusCenterStore';
import TodoStore from './TodoStore';

class RootStore {
  jokeStore: JokeStore;
  backgroundStore: BackgroundStore;
  locationWeatherStore: LocationWeatherStore;
  focusCenterStore: FocusCenterStore;
  todoStore: TodoStore;

  constructor() {
    this.jokeStore = new JokeStore();
    this.backgroundStore = new BackgroundStore();
    this.locationWeatherStore = new LocationWeatherStore();
    this.focusCenterStore = new FocusCenterStore();
    this.todoStore = new TodoStore();
  }
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = new RootStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
