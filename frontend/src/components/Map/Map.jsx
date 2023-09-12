import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker';

export default function Map({ address, city, country }) {
  return (
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        height: '40vh',
        width: '100%',
        marginTop: '20px',
        zIndex: 0,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
      {/* <Marker>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
}
