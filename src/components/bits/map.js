import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
//const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet;
import LocateControl from './LocateControl';

const Map = (props) => {
  const getPosition = () => {
    return [
      props.locations[0].gps_coordinates.split(',')[0],
      props.locations[0].gps_coordinates.split(',')[1]
    ];
  }

  const locateOptions = {
      position: 'topleft',
      strings: {
          title: 'Show me where I am, yo!'
      },
      onActivate: () => {} // callback before engine starts retrieving locations
  }

  return(
    <div className="map">
      <div className="map__container">
        { props.locations[0] ?
          <LeafletMap
            center={getPosition()}
            zoom={10}>
            <TileLayer
              //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <LocateControl options={locateOptions}/>
            {props.locations[0] && props.locations.map((location, key) => {
              const pos = [
                location.gps_coordinates.split(',')[0],
                location.gps_coordinates.split(',')[1]
              ];
              return (
                <div key={key}>
                  <Marker position={pos}>
                    <Popup>
                      <h3>{location.polling_place_name}</h3>
                      {location.address_line}<br/>
                      {location.info_text}
                    </Popup>
                  </Marker>
                </div>
              )
            })}
          </LeafletMap>
        : null }
      </div>
    </div>
  );
}

export default Map;
