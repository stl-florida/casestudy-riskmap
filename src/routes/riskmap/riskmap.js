import mapboxgl from 'mapbox-gl';

export class RiskMap {

  constructor(EventAggregator) {
    this.ea = EventAggregator;

    this.layers = {
      flood: {
        ve: {
          id: "FLDHVE",
          url: "b0mn3fbb",
          type: 'fill',
          paint: {
            "fill-color": "#fccf23",
            "fill-opacity": 0.9
          }
        },
        ao: {
          id: 'FLDHAO',
          url: '1eqmjn9o',
          type: 'fill',
          paint: {
            "fill-color": "#fc610b",
            "fill-opacity": 0.8
          }
        },
        ae: {
          id: 'FLDHAE',
          url: '4cou1y2j',
          type: 'fill',
          paint: {
            "fill-color": "#c44d3f",
            "fill-opacity": 0.7
          }
        },
        ah: {
          id: 'FLDHAH',
          url: '758t0cbw',
          type: 'fill',
          paint: {
            "fill-color": "#6576a5",
            "fill-opacity": 0.5
          }
        },
        x: {
          id: 'FLDHX',
          url: '44qg0o2f',
          type: 'fill',
          paint: {
            "fill-color": "#368bd8",
            "fill-opacity": 0.25
          }
        }
      },
      stormsurge: {
        id: 'stormsurge',
        url: '41947bz4',
        type: 'fill',
        paint: {
          "fill-color": {
            "property": "CAT",
            "type": "categorical",
            "stops": [
              [
                "1",
                "#c1272d"
              ],
              [
                "2",
                "#cd5257"
              ],
              [
                "3",
                "#d97d81"
              ],
              [
                "4",
                "#e6a8ab"
              ],
              [
                "5",
                "#f2d3d5"
              ]
            ]
          },
          "fill-opacity": {
            "property": "CAT",
            "type": "categorical",
            "stops": [
              [
                "1",
                0.7
              ],
              [
                "2",
                0.6
              ],
              [
                "3",
                0.5
              ],
              [
                "4",
                0.4
              ],
              [
                "5",
                0.3
              ]
            ]
          }
        }
      },
      groundwater: {
        id: 'ground_water',
        url: 'aor4wycf',
        type: 'raster',
        paint: {

        }
      }
    };
  }

  activate(param) {
    this.risk = param.risk;
  }

  addLayerToMap(layer) {
    var self = this;
    var source = {url: 'mapbox://asbarve.' + layer.url};
    switch (layer.type) {
      case 'fill':
        source.type = 'vector';
        break;
      case 'raster':
        source.type = 'raster';
    }
    if (this.risk !== 'groundwater') {
      return self.map.addLayer({
        id: layer.id,
        type: layer.type,
        source: source,
        'source-layer': layer.id,
        layout: {
          visibility: 'visible'
        },
        paint: layer.paint
      });
    } else {
      return self.map.setStyle({
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            url: 'mapbox://light-v9',
            tilesize: 256
          },
          'overlay': {
            type: 'image',
            url: 'https://raw.githubusercontent.com/stl-florida/casestudy-riskmap/master/assets/groundwater.tif',
            coordinates: [
              [-80.8,26.5],
              [-80.0,26.5],
              [-80.0,25.9],
              [-80.8,25.9]
            ]
          }
        }
      });
    }
  }

  attached() {
    var self = this;

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiJjajVvOGdpcmwzejNiMzJvODF2dGFqYWcxIn0.rAJZcytC7dbajv0wzWo8Kw';
    self.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'mapContainer',
      center: [-80.25, 26.15],
      zoom: 11,
      style: 'mapbox://styles/mapbox/light-v9',
      hash: false
    });

    self.map.addControl(new mapboxgl.NavigationControl({
      // TODO: position NOT top-right
    }));

    self.map.on('load', () => {
      if (self.risk === 'flood') {
        for (let layer_key in self.layers.flood) {
          self.addLayerToMap(self.layers.flood[layer_key]);
        }
      } else {
        self.addLayerToMap(self.layers[self.risk]);
      }
    });

    self.map.on('zoom', () => {
      console.log(self.map.getZoom());
    });
  }

  detached() {
    var self = this;
    for (let layer_key in self.layers) {
      if (layer_key === 'flood') {
        for (let flood_key in self.layers.flood) {
          var id = self.layers.flood[flood_key].id;
          if (self.map.getLayer(id)) {
            self.map.removeLayer(id);
            self.map.removeSource(id);
          }
        }
      } else {
        if (self.map.getLayer(self.layers[layer_key].id)) {
          self.map.removeLayer(self.layers[layer_key].id);
          self.map.removeSource(self.layers[layer_key].id);
        }
      }
    }
  }
}
