import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class LocationWeatherStore {
  location: string = '';
  coords: string = '';
  temperature: number | null = null;
  humidity: number | null = null;
  units: string = 'imperial';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchLocation() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ip`);
      const { data } = response.data;
      this.location = `${data.city}, ${data.region}`;
      this.coords = `${data.latitude},${data.longitude}`;
    } catch (error) {
      this.location = 'Location not found';
    }
  }

  async fetchWeather() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/weather/current?units=${this.units}`
      );
      const weatherData = response.data.values;
      this.temperature = weatherData.temperature;
      this.humidity = weatherData.humidity;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  setUnits(units: string) {
    this.units = units;
    this.fetchWeather(); // Fetch weather again with the new units
  }
}

export default LocationWeatherStore;
