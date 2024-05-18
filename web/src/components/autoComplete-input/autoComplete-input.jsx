import { useEffect, useRef } from "react";

const autoCompleteOptions = {
  componentRestrictions: { country: "ie" },
  types: ["movie_theater"],
};

function AutoCompleteInput({ className }) {
  const autoCompleteInputRef = useRef();

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autoCompleteInputRef.current,
      autoCompleteOptions
    );
  }, []);

  return (
    <div className={`form-floating mb-3 ${className}`}>
      
      <input
        type="text"
        className="form-control"
        id="autoComplete" 
        ref={autoCompleteInputRef} 
      />
      <label htmlFor="autoComplete">Find cine near ......</label>
    </div>
  );
}

AutoCompleteInput.defaultProps = {
  className: ""
};

export default AutoCompleteInput;
