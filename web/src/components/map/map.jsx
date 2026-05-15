
import { useEffect, useRef, useContext } from 'react'
import AuthContext from '../../contexts/auth.context'

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

function Map() {
  const { user } = useContext(AuthContext)
  const mapRef = useRef()
  useEffect(() => {
    const coordinates = user?.location?.coordinates;
    const googleMaps = window.google?.maps;

    if (!user || !googleMaps || !Array.isArray(coordinates) || coordinates.length < 2) {
      return
    }

    const [lat, lng] = coordinates;
    const googleMap = new googleMaps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 13

    })
    new googleMaps.Marker({
      position: { lat, lng },
      map: googleMap,
      title: "movie_theater"
    })
    const request = {
      location : { lat, lng },
      radius: "3000",
      type: ["movie_theater"]
    };
    const service = new googleMaps.places.PlacesService(googleMap);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == googleMaps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          new googleMaps.Marker({
            position: results[i].geometry.location,
            map: googleMap,
            title: "movie theater"
          })
        }
      }
    }
    

  }, [user])

  if (!Array.isArray(user?.location?.coordinates)) {
    return (
      <MapEmptyState
        title="Add a location to unlock nearby cinemas."
        description="Update your profile with coordinates and CineHub will surface theaters around you."
      />
    );
  }

  if (!window.google?.maps) {
    return (
      <MapEmptyState
        title="Map is unavailable right now."
        description="The Google Maps client is not configured in this environment, so nearby cinemas cannot be rendered yet."
      />
    );
  }

  return (
    <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
  )

}

export default Map;
