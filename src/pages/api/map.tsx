import React, { useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapComponent = () => {
    useEffect(() => {
        // Initialize the map
        const map = new Map({
            target: 'map-container',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        return () => {
            // Clean up map on component unmount
            map.setTarget("");
        };
    }, []);

    return <div id="map-container" style={{ width: '100%', height: '95vh' }}></div>;
};

export default MapComponent;
