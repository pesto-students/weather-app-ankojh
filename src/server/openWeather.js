const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall?appid=154a6bc00054a3dec93d5e565367c5b7&units=metric'


export const getWeatherDetailsOfLocation = async (longitude, latitude)=>{
  const url = `${BASE_URL}&lon=${longitude}&lat=${latitude}`
  const response = await (await fetch(url)).json()
  return response;
}