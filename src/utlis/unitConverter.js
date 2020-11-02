export function kmphTomph(kmphValue){
  return (kmphValue * 0.621371).toFixed(2);
}

export function celsiusToFahrenheit(celsiusValue){
  return ((celsiusValue * 9/5) + 32).toFixed(1)
}

// export function metersToFeet(metersValue){
//   const feetValue = 0;
//   return feetValue;
// }