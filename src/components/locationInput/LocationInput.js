import React, { useContext, useEffect, useState } from 'react';
import { ResizeContext } from '../../contexts/resizeContext';
import { getCitiesWithPrefixName } from '../../server/geodb';
import debounce from '../../utlis/debounce';
import './LocationInput.css'


const debouncedGetCities = debounce(getCitiesWithPrefixName, 500);

const LocationInput = (props) => {

  const [state, setState] = useState({
    // suggestions: [{ "id": 659, "city": "Abu Dhabi", "countryCode": "AE", "longitude": 54.368611111, "latitude": 24.478055555 }, { "id": 466804, "city": "Abu Dhabi Municipality", "countryCode": "AE", "longitude": 54.43295, "latitude": 24.41361 }, { "id": 638, "city": "Ajman", "countryCode": "AE", "longitude": 55.479722222, "latitude": 25.399444444 }, { "id": 644, "city": "Al Ain", "countryCode": "AE", "longitude": 55.744722222, "latitude": 24.2075 }, { "id": 466805, "city": "Al Ain Municipality", "countryCode": "AE", "longitude": 55.8204, "latitude": 24.15223 }, { "id": 466806, "city": "Al Dhafra", "countryCode": "AE", "longitude": 53.72225, "latitude": 23.65745 }, { "id": 606, "city": "Al Fujairah City", "countryCode": "AE", "longitude": 56.34141, "latitude": 25.11641 }]
    suggestions:[]
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false);

  const { isWideScreen } = useContext(ResizeContext);


  useEffect(() => {
    getSuggestions(searchQuery)
    // eslint-disable-next-line
  }, [searchQuery])


  async function getSuggestions() {
    setSearching(true)
    const response = await debouncedGetCities(searchQuery);
    setState({ ...state, suggestions: response })
    setSearching(false)
  }


  function suggestionClicked(cityDetail){
    typeof props.onLocationSelect === 'function' && props.onLocationSelect(cityDetail);
  }



  return (
    <div className={`App-LocationInput ${isWideScreen ? 'wide-screen' : ''} ${state.suggestions.length ? 'suggestions-showing': ''}`}>
      <input
        className="location-input"
        placeholder="Type Here..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)} />
      { searchQuery && state.suggestions.length && <div className="location-suggestions">
        {state.suggestions.map(suggestion => <div key={suggestion.id} onClick={e=>suggestionClicked(suggestion)} className="location-suggestion">{`${suggestion.city}, ${suggestion.countryCode}`}</div>)}
      </div>}

      {searchQuery && !state.suggestions.length && searching && <div className="location-searching">Searching</div>}
  {searchQuery && !state.suggestions.length && !searching && <div className="location-not-found"> Oppsie.. {searchQuery} is not an Awesome city</div>}
    </div>
  );
};

export default LocationInput;