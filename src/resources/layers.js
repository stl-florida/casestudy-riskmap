export class Layers {
  constructor() {
    this.properties = {
      flood: [
        {
          id: "FLDHVE",
          type: 'fill',
          source: {
            url: 'mapbox://asbarve.b0mn3fbb',
            type: 'vector'
          },
          'source-layer': 'FLDHVE',
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
          'source-layer': 'FLDHAO',
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
          'source-layer': 'FLDHAE',
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
          'source-layer': 'FLDHAH',
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
          'source-layer': 'FLDHX',
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
        'source-layer': 'stormsurge',
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
          'source-layer': 'groundwater',
          paint: {
            "fill-color": {
              property: "DN",
              type: "exponential",
              stops: [
                [40, '#d7191c'],
                [70, '#e24631'],
                [100, '#ee7446'],
                [120, '#faa25b'],
                [140, '#fdc076'],
                [160, '#fed993'],
                [180, '#fef2b0'],

                [196, '#f2f9c5'],
                [208, '#d8edd2'],
                [220, '#bee1df'],
                [230, '#a1d1e5'],
                [238, '#7ab4d5'],
                [246, '#5397c5'],
                [252, '#2c7bb6']
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
          'source-layer': 'salt_water',
          paint: {
            'line-color': '#f05022',
            'line-width': 2
          }
        }
      ],
      default: [
        {
          id: 'golfcourse_base',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {
                    name: 'Sunset golfcourse'
                  },
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [-80.16687564286083, 26.022109333950482],
                      [-80.16233181725012, 26.022188276452326],
                      [-80.16225579269295, 26.018577702075035],
                      [-80.16679999185034, 26.018499925562182],
                      [-80.16687564286083, 26.022109333950482]
                    ]
                  }
                }
              ]
            }
          },
          paint: {
            'line-color': '#f2ffe6',
            'line-width': 2
          }
        }/*,
        {
          id: 'golfcourse',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {
                    name: 'Sunset golfcourse'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      -80.165,
                      26.0197
                    ]
                  }
                }
              ]
            }
          },
          layout: {
            'icon-image': 'golf-15'
          }
        }*/
      ]
    };
  }
}
