const BASE_URL = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities?offset=0&radius=100';
// const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?offset=0&radius=100';
// const API_KEY = 'cea68b59f5msh9e7d984c4613111p13cbcbjsnd5fd9732d822'

function cityMapper(city){
    return {
      id: city.id,
      city: city.city,
      countryCode: city.countryCode,
      longitude: city.longitude,
      latitude: city.latitude
    }
}

export const getCitiesWithPrefixName = async (cityPrefixName)=>{
  const url = `${BASE_URL}&limit=5&namePrefix=${cityPrefixName}`
  const response = await (await fetch(url)).json();
  // const response = await (await fetch(url, {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  //     "x-rapidapi-key": "805ceb14a1mshb8c2a5c728cc82cp17eb02jsn1d5277c37c31"
  //   }
  // })).json()
  return response.data.map(cityMapper);

}


export const getCitiesNearLocation = async (longitude, latitude)=>{
  // get 1 least distance city - show weather of that city instead of current location
  const url = `${BASE_URL}&limit=1&${new URLSearchParams({ location: `${latitude > 0 ? '+' + latitude : '-' + latitude*-1}${longitude > 0 ? '+' + longitude : '-' + longitude*-1}`})}`
  const response = await(await fetch(url)).json();
  return response.data.map(cityMapper)
}