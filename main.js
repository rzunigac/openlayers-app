import './style.css';
import {Map, View} from 'ol';
// Interactions
import {Draw, Select} from 'ol/interaction';
// layers
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// sources
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';



// default latitude to Santiago
const defaultLongitude = -7865172.184112017;
const defaultLatitude = -3954066.374903847;
const defaultZoom = 16;

// this may be a URL parameter
const params = {};

const latitude = params.latitude ? Number(params.latitude) : defaultLatitude;
const longitude = params.longitude ? Number(params.longitude) : defaultLongitude;
const zoom = params.zoom ? Number(params.zoom) : defaultZoom;

let draw;
let select = new Select();

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

const source =  new VectorSource ({wrapX: false});
const vector = new VectorLayer({
  source: source
});

map.addLayer(vector);

function enableDraw(type) {
  console.log("Enabling draw on " + type);
  // change classes of buttons active/inactive

  // we need to remove any select or any other draw interaction
  map.removeInteraction(select);

  if (draw) {
    map.removeInteraction(draw);
  }

  draw = new Draw({
    source: source,
    type: type
  })

  map.addInteraction(draw);
}

function enableSelect() {
  console.log("Enabling select");
  map.removeInteraction(draw);
  map.addInteraction(select);
}

function deleteSelected() {
  console.log("Deleting selected");
  let features = select.getFeatures();
  if (features.getLength() ==0) {
    console.log("No features selected");
    return;
  }
  // Iterate over all selected features, 
  // but currently only one can be selected.
  features.forEach(function(feature) {
    source.removeFeature(feature);
  });
  select.getFeatures().clear();
}

function deleteAll() {
  console.log("Deleting all");
  source.clear();
}

document.getElementById('add-point').addEventListener('click', function() {enableDraw.call(this, 'Point');})
document.getElementById('add-line').addEventListener('click', function() {enableDraw.call(this, 'LineString');})
document.getElementById('add-polygon').addEventListener('click', function() {enableDraw.call(this, 'Polygon');})
document.getElementById('select-feature').addEventListener('click', function() {enableSelect();})
document.getElementById('delete-feature').addEventListener('click', function() {deleteSelected();})
document.getElementById('delete-all-features').addEventListener('click', function() {deleteAll();})
