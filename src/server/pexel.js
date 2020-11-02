const PEXEL_APIKEY = '563492ad6f917000010000012b138b81fbf34b60aabce1c9ab6e05e8';


const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/839462/pexels-photo-839462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  
]



// function photoObjToURL(photoObj){
//   return photoObj['src']['large2x'];
// }

export const fetchImageFromPexel = async (query, landscape) => {

  // return FALLBACK_IMAGES;

  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`
  const response = await (await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': PEXEL_APIKEY,
      'Content-Type': 'application/json'
    }
  })).json()


  if(response.photos.length){
    return response.photos.map(photo=>{
      if(!landscape){
        return photo['src']['potrait'];
      }
      return photo['src']['landscape'];
    })
  }
  else{
    return FALLBACK_IMAGES;
  }
}

