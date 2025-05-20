import * as Location from 'expo-location';

export const getLocation = async (API_KEY) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return null;
    }

    const gps = await Location.getCurrentPositionAsync({});
    const latitude = gps.coords.latitude;
    const longitude = gps.coords.longitude;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const data = await response.json();

    return {
      main: data.weather[0].main,
      lon: data.coord.lon,
      lat: data.coord.lat,
      des: data.weather[0].description,
      temp: data.main.temp,
      country: data.sys.country
    };
  } catch (err) {
    console.error('Error fetching location weather data:', err);
    return null;
  }
};
