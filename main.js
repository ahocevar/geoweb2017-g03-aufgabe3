import 'ol/ol.css';
import 'ol3-layerswitcher/src/ol3-layerswitcher.css';
import proj from 'ol/proj';
import GeoJSON from 'ol/format/geojson';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import {
  apply
} from 'ol-mapbox-style';
import Overlay from 'ol/overlay';
import {LayerSwitcher} from 'ol3-layerswitcher/src/ol3-layerswitcher';

var map = apply(
  'map',
  'data/style.json'
);
map.getLayers().on('add', function(e) {
  var layer = e.element;
  // zIndex changes when configuration in data/style.json changes
  if (layer.getZIndex() == 5) {
    layer.set('title', 'Radwege');
  }
});

function fit() {
  map.getView().fit(source.getExtent(), {
    maxZoom: 19,
    duration: 250
  });
}
var overlay = new Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10]
});
map.addOverlay(overlay);
map.on('click', function(e) {
  overlay.setPosition();
  var features = map.getFeaturesAtPixel(e.pixel);
  if (features) {
    var coords = features[0].getGeometry().getCoordinates();
    var hdms = coordinate.toStringHDMS(proj.toLonLat(coords));
    overlay.getElement().innerHTML = hdms;
    overlay.setPosition(coords);
  }
});
map.addControl(new LayerSwitcher());
