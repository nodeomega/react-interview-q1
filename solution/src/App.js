// including Bootstrap to accomodate responsive layout.
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import { useState, useEffect } from 'react';
import { isNameValid } from './mock-api/apis';

// Component imports
import LocationSelector from './components/location-selector/location-selector';
import NameEntry from './components/name-entry/name-entry';
import ListingTable from "./components/listing-table/listing-table";

// Class import for the name/location items listing.
import { ListingItem } from "./models/listing-item";

function App() {
  // state variables.
  const [enteredName, setEnteredName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [itemListing, setItemListing] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);

  /**
   * Clears the data entry fields.
   */
  const clearFields = () => {
    setEnteredName("");
    setSelectedLocation("");
  }

  /**
   * Adds an item to the list.
   * 
   * The item must have a valid name and location selection.
   */
  const addItem = async () => {
    // Add the item to the list if values are valid.
    if ((await isNameValid(enteredName)) && selectedLocation !== "") {
      setItemListing([...itemListing, new ListingItem(enteredName, selectedLocation)]);
      
      // Clear the form for the next entry.
      clearFields();
    }
  }

  useEffect(() => {
    /**
     * Checks whether the Add button should be disabled based on entered data validation.
     */
    const checkSubmitDisabled = async () => {
      isNameValid(enteredName).then((val) => {
        setCanSubmit(val && enteredName.length > 0 && selectedLocation !== "");
      })
    }

    checkSubmitDisabled();
  }, [enteredName, selectedLocation]);

  return (
    <div className="App">
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <NameEntry enteredName={enteredName} setEnteredName={setEnteredName} />
            <LocationSelector selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />          
          </div>
          <div className="row justify-content-end">
            <button className="col-3 col-sm-1 btn btn-warning m-2" onClick={clearFields}>{"Clear"}</button>
            <button className={`col-3 col-sm-1 btn ${!canSubmit ? "btn-outline-secondary" : "btn-primary"} m-2`} onClick={addItem} disabled={!canSubmit}>{"Add"}</button>
          </div>
          <div className="row">
            <ListingTable itemListing={itemListing} />
          </div>
        </div>
      </div>         
    </div>
  );
}

export default App;
