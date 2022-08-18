import axios from 'axios';

const API_KEY = 'd335b09d64009b2b51a999f413b71b1b';

export const getWeather = async (location) => {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);

  return res.data;
};

export default getWeather;
