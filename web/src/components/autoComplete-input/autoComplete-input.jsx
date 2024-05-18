import { useEffect, useRef } from "react";

const autoCompleteOptions = {
  componentRestrictions: { country: "ie" },
  types: ["address"],
};

function AutoCompleteInput({ className, onPlaceChange }) {
  const autoCompleteInputRef = useRef();

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteInputRef.current,autoCompleteOptions);
    window.google.maps.event.addListener(autocomplete, "place_changed", ()=>{
      const place = autocomplete.getPlace()
     if (place && place.geometry?.location) {
      const location  = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: place.formatted_address}
      onPlaceChange(location)
     }
    })
    return() => {
      window.google.maps.event.clearListeners(autocomplete, "place_changed")
    }
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
  className: "",
  onPlaceChange: (location) => console.info(location)
};

export default AutoCompleteInput;
