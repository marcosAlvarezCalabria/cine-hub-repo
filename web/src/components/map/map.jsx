import { useContext, useEffect, useMemo, useRef, useState } from "react";
import AuthContext from "../../contexts/auth.context";

const GOOGLE_MAPS_SCRIPT_ID = "google-maps-script";
const GOOGLE_MAPS_CALLBACK_NAME = "__cineHubGoogleMapsReady";

function MapEmptyState({ title, description }) {
  return (
    <div className="profile-map__empty">
      <div className="profile-map__empty-icon">+</div>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}

function loadGoogleMaps(apiKey) {
  if (!apiKey) {
    return Promise.reject(new Error("Missing Google Maps API key"));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(window.google?.maps));
      existingScript.addEventListener("error", () => reject(new Error("Google Maps failed to load")));
    });
  }

  return new Promise((resolve, reject) => {
    window[GOOGLE_MAPS_CALLBACK_NAME] = () => {
      resolve(window.google?.maps);
      delete window[GOOGLE_MAPS_CALLBACK_NAME];
    };

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      reject(new Error("Google Maps failed to load"));
      delete window[GOOGLE_MAPS_CALLBACK_NAME];
    };
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=${GOOGLE_MAPS_CALLBACK_NAME}`;
    document.body.appendChild(script);
  });
}

function Map() {
  const { user } = useContext(AuthContext);
  const mapRef = useRef(null);
  const [mapsReady, setMapsReady] = useState(Boolean(window.google?.maps));
  const [mapsError, setMapsError] = useState(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const coordinates = useMemo(() => user?.location?.coordinates, [user?.location?.coordinates]);

  useEffect(() => {
    if (!googleMapsApiKey) {
      return;
    }

    let isMounted = true;

    loadGoogleMaps(googleMapsApiKey)
      .then(() => {
        if (isMounted) {
          setMapsReady(true);
          setMapsError(null);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setMapsError(error.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [googleMapsApiKey]);

  useEffect(() => {
    if (!mapsReady || !Array.isArray(coordinates) || coordinates.length < 2 || !mapRef.current) {
      return;
    }

    const googleMaps = window.google?.maps;

    if (!googleMaps) {
      return;
    }

    const [lat, lng] = coordinates;
    const googleMap = new googleMaps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 13,
    });

    new googleMaps.Marker({
      position: { lat, lng },
      map: googleMap,
      title: "movie theater",
    });

    const service = new googleMaps.places.PlacesService(googleMap);
    service.nearbySearch(
      {
        location: { lat, lng },
        radius: "3000",
        type: ["movie_theater"],
      },
      (results, status) => {
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          results.forEach((result) => {
            new googleMaps.Marker({
              position: result.geometry.location,
              map: googleMap,
              title: result.name || "movie theater",
            });
          });
        }
      }
    );
  }, [coordinates, mapsReady]);

  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    return (
      <MapEmptyState
        title="Add a location to unlock nearby cinemas."
        description="Update your profile with coordinates and CineHub will surface theaters around you."
      />
    );
  }

  if (!googleMapsApiKey) {
    return (
      <MapEmptyState
        title="Map is waiting for a Google Maps key."
        description="Add VITE_GOOGLE_API_KEY to the frontend environment and the cinema map will load automatically."
      />
    );
  }

  if (mapsError) {
    return (
      <MapEmptyState
        title="Map could not be loaded."
        description={mapsError}
      />
    );
  }

  if (!mapsReady) {
    return (
      <MapEmptyState
        title="Loading nearby cinemas."
        description="Google Maps is being initialized for this profile."
      />
    );
  }

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
}

export default Map;
