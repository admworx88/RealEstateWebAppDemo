import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ELG from 'esri-leaflet-geocoder';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function GeoCoderMarker({ address }) {
  const map = useMap();
  const [position, setPosition] = React.useState([60, 19]);

  useEffect(() => {
    ELG.geocode()
      .address(address)
      .run(function (err, results, response) {
        if (err) {
          return;
        }

        const { lat, lng } = results.results[0].latlng;
        setPosition([lat, lng]);
        map.flyTo([lat, lng], 13);
      });
  }, []);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
}
