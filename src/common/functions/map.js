import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

// window.onload = initMap;
function initMap() {
  var map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }) ],
    target: 'js-map',
    view: new View({
      center: [13454317.235104525,1670737.1963349718],
      zoom: 17,
    }),

  });
  map.on('click', function(e){
    console.log(e.coordinate);
  })
  
  // document.getElementById('zoom-out').onclick = function () {
  //   var view = map.getView();
  //   var zoom = view.getZoom();
  //   view.setZoom(zoom - 1);
  // };
  
  // document.getElementById('zoom-in').onclick = function () {
  //   var view = map.getView();
  //   var zoom = view.getZoom();
  //   view.setZoom(zoom + 1);
  // };
}

export default initMap;