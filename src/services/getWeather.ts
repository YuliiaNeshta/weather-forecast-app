import axios from 'axios';

const API_KEY = 'd335b09d64009b2b51a999f413b71b1b';

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface CityWeather {
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const getWeather = async (location): Promise<CityWeather> => {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);

  return res.data;
};

export default getWeather;
