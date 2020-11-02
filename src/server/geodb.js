const BASE_URL = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities?offset=0&radius=100';


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
  return response.data.map(cityMapper);

}


export const getCitiesNearLocation = async (longitude, latitude)=>{
  // get 1 least distance city - show weather of that city instead of current location
  const url = `${BASE_URL}&limit=1&${new URLSearchParams({ location: `${latitude > 0 ? '+' + latitude : '-' + latitude*-1}${longitude > 0 ? '+' + longitude : '-' + longitude*-1}`})}`
  const response = await(await fetch(url)).json();
  return response.data.map(cityMapper)
}