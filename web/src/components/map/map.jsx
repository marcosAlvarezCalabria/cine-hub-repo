
import { useEffect, useRef, useContext } from 'react'
import AuthContext from '../../contexts/auth.context'


function Map() {
  const { user } = useContext(AuthContext)
  const mapRef = useRef()
  useEffect(() => {
    if (!user) {
      return
    }

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: user.location?.coordinates[0], lng: user.location?.coordinates[1] },
      zoom: 15

    })
    new window.google.maps.Marker({
      position: {lat: user.location?.coordinates[0], lng: user.location?.coordinates[1]},
      map: googleMap,
      title: "movie_theater"
    })
    const request = {
      location : {lat: user.location?.coordinates[0], lng: user.location.coordinates[1]},
      radius: "2000",
      type: ["movie_theater"]
    };
    const service = new google.maps.places.PlacesService(googleMap);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          new window.google.maps.Marker({
            position: results[i].geometry.location,
            map: googleMap,
            title: "movie theater"
          })
        }
      }
    }
    

  }, [user])

  return (
    <div ref={mapRef} style={{ width: "80%", height: "400px" }}></div>
  )

}

export default Map;