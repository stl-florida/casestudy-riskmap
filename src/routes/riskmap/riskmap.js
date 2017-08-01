import mapboxgl from 'mapbox-gl';

export class RiskMap {

  constructor(EventAggregator) {
    this.ea = EventAggregator;

    this.layers = {
      flood: [
        {
          id: "FLDHVE",
          type: 'fill',
          source: {
            url: 'mapbox://asbarve.b0mn3fbb',
            type: 'vector'
          },
          paint: {
            "fill-color": "#fccf23",
            "fill-opacity": 0.9
          }
        },
        {
          id: 'FLDHAO',
          type: 'fill',
          source: {
            url: 'mapbox://asbarve.1eqmjn9o',
            type: 'vector'
          },
          paint: {
            "fill-color": "#fc610b",
            "fill-opacity": 0.8
          }
        },
        {
          id: 'FLDHAE',
          type: 'fill',
          source: {
            url: 'mapbox://asbarve.4cou1y2j',
            type: 'vector'
          },
          paint: {
            "fill-color": "#c44d3f",
            "fill-opacity": 0.7
          }
        },
        {
          id: 'FLDHAH',
          type: 'fill',
          source: {
            url: 'mapbox://asbarve.758t0cbw',
            type: 'vector'
          },
          paint: {
            "fill-color": "#6576a5",
            "fill-opacity": 0.5
          }
        },
        {
          id: 'FLDHX',
          type: 'fill',
          source: {
            url: 'mapbox://asbarve.44qg0o2f',
            type: 'vector'
          },
          paint: {
            "fill-color": "#368bd8",
            "fill-opacity": 0.25
          }
        }
      ],
      stormsurge: [{
        id: 'stormsurge',
        type: 'fill',
        source: {
          url: 'mapbox://asbarve.41947bz4',
          type: 'vector'
        },
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
      }],
      groundwater: [
        {
          id: 'groundwater',
          type: 'fill',
          source: {
            url: 'mapbox://asbarve.5wvk9kun',
            type: 'vector'
          },
          paint: {
            "fill-color": {
              property: "DN",
              type: "exponential",
              stops: [
                [44, '#d7191c'],
                [60, '#e24631'],
                [76, '#ee7446'],
                [92, '#faa25v'],
                [108, '#fdc076'],
                [124, '#fed993'],
                [140, '#fef2b0'],
                [156, '#f2f9c5'],
                [172, '#d8edd2'],
                [188, '#bee1df'],
                [204, '#a1d1e5'],
                [220, '#7ab4d5'],
                [236, '#5397c5'],
                [256, '#2c7bb6']
              ]
            },
            "fill-opacity": 0.8
          }
        },
        {
          id: 'salt_water',
          type: 'line',
          source: {
            url: 'mapbox://asbarve.87xhq483',
            type: 'vector'
          },
          paint: {
            'line-color': '#f05022',
            'line-width': 3
          }
        }
      ]
    };
  }

  activate(param) {
    this.risk = param.risk;
    console.log(this.risk);
  }

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
      for (let group in self.layers) {
        console.log('checking group: ' + group);
        if (group === self.risk) {
          console.log('group ' + group + ' is active');
          for (let layer of self.layers[group]) {
            console.log(layer.id);
            self.addLayerToMap(layer);
          }
        }
      }
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
