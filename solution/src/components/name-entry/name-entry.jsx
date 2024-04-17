import { useEffect, useState, useCallback } from 'react';
import {
  isNameValid,
} from '../../mock-api/apis';

function NameEntry(props) {
  const {enteredName, setEnteredName} = props;

  const [nameIsValid, setNameIsValid] = useState(true);

  /**
   * Handles the change event for when the user enters a name.
   * @param e Event object from the dropdown when the selection is changed.
   */
  const onNameChange = useCallback((e) => {
    // set the name.
    setEnteredName(e.target.value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Introduce a slight timeout to avoid issues with fast typers getting 
    // a false positive (or false negative) on invalid name checking.
    const timeOutDelay = setTimeout(() => 
    isNameValid(enteredName).then((val) => {
      setNameIsValid(val);
    }), 500);
    return () => clearTimeout(timeOutDelay);
  }, [enteredName]);
  
  // for the input, capture onChange (i.e. if user pastes a name in via right click and paste,
  // or when the user types in the name).
  // This will also trigger when the form fields are reset.
  return (
    <div className="col-12 col-md-6 my-2">
      <label className="col-3 text-end px-2" htmlFor={"name"}>{"Name"}</label>
      <input className="col-9" name="name" id="name" onChange={onNameChange} value={enteredName}></input>
      {!nameIsValid && (
        <div className="col-9 offset-3 text-danger text-start">{"This name has already been taken."}</div>
      )}      
    </div>
  )
}

export default NameEntry;
