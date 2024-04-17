import { 
  useEffect,
  useState,
  useCallback
} from 'react';

import { getLocations } from '../../mock-api/apis';

function LocationSelector(props) {
  const { selectedLocation, setSelectedLocation } = props;

  // State variables for the list of locations.
  const [locations, setLocations] = useState([]);
  
  /**
   *  Sets the location options for the drop down list.
   * 
   * @param locations The list of locations as a string array to fill the dropdown with.
  */
  const setLocationOptions = useCallback((locations) => {
    const options = [];
    
    // Set a default placeholder.
    // Also set -1 for a key to satisfy React's unique key recommendation.
    options.push(<option key={-1} value="">{"Select a location..."}</option>);

    // Populate the locations drop down with values from the API.
    for (const [idx, loc] of locations.entries()) {
      options.push(
        <option key={idx} value={loc}>{loc}</option>
      );
    }

    return options;
  }, []);

  // Get the locations from the API.
  // I set an empty dependency list to ensure this only executes when the control first loads.
  useEffect(() => {
    getLocations().then((locationItems) => {
      setLocations(locationItems);      
    });
  
    setLocationOptions(locations);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handles the change event for when the user selects a location from the dropdown.
   * @param e Event object from the dropdown when the selection is changed.
   */
  const onChange = (e) => {
    setSelectedLocation(e.target.value);    
  }
  
  return (
    <div className="col-12 col-md-6 my-2">
      <label className="col-3 text-end px-2" htmlFor={"locations"}>{"Locations"}</label>
      <select className="col-9" name="locations" id="locations" onChange={onChange} value={selectedLocation}>
        {setLocationOptions(locations)}
      </select>
    </div>
  );
}

export default LocationSelector;