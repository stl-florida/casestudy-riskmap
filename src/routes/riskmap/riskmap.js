import {inject} from 'aurelia-framework';
import mapboxgl from 'mapbox-gl';
import {Layers} from 'resources/layers';

//start-aurelia-decorators
@inject(Layers)
//end-aurelia-decorators
export class RiskMap {
  //Aurelia constructor hook
  constructor(Layers) {
    this.properties = Layers.properties;
  }

  //Aurelia activate hook
  activate(param) {
    this.risk = param.risk;
  }

  //Fetch & apply layer properties
  addLayerToMap(layer) {
    var self = this;
    return self.map.addLayer({
      id: layer.id,
      type: layer.type,
      source: layer.source,
      "source-layer": layer.id,
      layout: {
        visibility: 'visible'
      },
      paint: layer.paint
    });
  }

  //Aurelia attached hook
  attached() {
    var self = this;

    //Initiate map
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiJjajVvOGdpcmwzejNiMzJvODF2dGFqYWcxIn0.rAJZcytC7dbajv0wzWo8Kw';
    self.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'mapContainer',
      center: [-80.25, 26.15],
      zoom: 11,
      style: 'mapbox://styles/mapbox/light-v9',
      hash: false
    });

    //Add navigation controls
    self.map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    //Display layers according to query parameter
    self.map.on('load', () => {
      for (let group in self.properties) {
        if (group === self.risk) {
          for (let layer of self.properties[group]) {
            self.addLayerToMap(layer);
          }
        }
      }
    });
  }
}
