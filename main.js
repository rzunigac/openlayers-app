import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// default latitude to Santiago
const defaultLongitude = -7865172.184112017;
const defaultLatitude = -3954066.374903847;
const defaultZoom = 16;

// this may be a URL parameter
const params = {};

const latitude = params.latitude ? Number(params.latitude) : defaultLatitude;
const longitude = params.longitude ? Number(params.longitude) : defaultLongitude;
const zoom = params.zoom ? Number(params.zoom) : defaultZoom;

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [longitude, latitude],
    zoom: zoom
  })
});
