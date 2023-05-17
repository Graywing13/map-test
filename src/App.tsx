import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Map, { MapRef, Marker } from "react-map-gl";

interface LocationEntry {
  label: string;
  imgUrl: string;
  coordinates: [number, number];
}

function App() {
  const mapRef = useRef<MapRef>(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
    transitionDuration: 100,
    initDone: false,
  });

  const markerLocations: LocationEntry[] = [
    {
      label: "home",
      imgUrl: "https://cdn-icons-png.flaticon.com/512/1670/1670080.png",
      coordinates: [viewport.latitude, viewport.longitude],
    },
    {
      label: "school",
      imgUrl: "https://cdn-icons-png.flaticon.com/512/2602/2602414.png",
      coordinates: [49.2667, -123.25],
    },
    {
      label: "mall",
      imgUrl: "https://cdn-icons-png.flaticon.com/512/2971/2971975.png",
      coordinates: [49.1671, -123.1383],
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
        zoom: 9,
        initDone: true,
      });
    });
  }, [viewport]);

  const generateMarker = useCallback(
    ({ imgUrl, coordinates, label }: LocationEntry) => {
      const [latitude, longitude] = coordinates;
      return (
        <Marker latitude={latitude} longitude={longitude}>
          <div className="relative w-12 h-12">
            <img
              alt={"pin"}
              className={"absolute w-12 h-12 top-0 left-0"}
              src={"https://pngimg.com/d/google_maps_pin_PNG56.png"}
            />
            <img
              className={"absolute w-6 h-6 top-1 left-3"}
              alt={label}
              src={imgUrl}
            />
          </div>
        </Marker>
      );
    },
    []
  );

  return (
    <div className="App">
      <a
        className="text-3xl font-bold underline"
        href="https://blog.logrocket.com/using-mapbox-gl-js-react/"
      >
        Following Tutorial
      </a>
      <div className="map-container h-80">
        {viewport.initDone && (
          <Map
            ref={mapRef}
            initialViewState={viewport}
            mapStyle={"mapbox://styles/mapbox/streets-v12"}
            mapboxAccessToken="pk.eyJ1IjoiZ3JheXdpbmcxMyIsImEiOiJjbGhyOXI5ZTMwNmhrM21vMGlubXdndjZ6In0.HXvEp1m2iWACvpHDkl_tWQ"
          >
            {markerLocations.map((info) => generateMarker(info))}
          </Map>
        )}
      </div>
    </div>
  );
}

export default App;
