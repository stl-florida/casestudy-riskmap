define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'RiskMap';
      config.options.pushState = true;

      config.map([{ route: '/:risk', moduleId: 'routes/riskmap/riskmap' }]);
      config.mapUnknownRoutes({ redirect: '/' });
      this.router = router;
    };

    App.prototype.attached = function attached() {
      var self = this;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('routes/riskmap/riskmap',['exports', 'mapbox-gl'], function (exports, _mapboxGl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RiskMap = undefined;

  var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var RiskMap = exports.RiskMap = function () {
    function RiskMap(EventAggregator) {
      _classCallCheck(this, RiskMap);

      this.ea = EventAggregator;

      this.layers = {
        flood: [{
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
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        }],
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
              "stops": [["1", "#c1272d"], ["2", "#cd5257"], ["3", "#d97d81"], ["4", "#e6a8ab"], ["5", "#f2d3d5"]]
            },
            "fill-opacity": {
              "property": "CAT",
              "type": "categorical",
              "stops": [["1", 0.7], ["2", 0.6], ["3", 0.5], ["4", 0.4], ["5", 0.3]]
            }
          }
        }],
        groundwater: [{
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
              stops: [[44, '#d7191c'], [60, '#e24631'], [76, '#ee7446'], [92, '#faa25v'], [108, '#fdc076'], [124, '#fed993'], [140, '#fef2b0'], [156, '#f2f9c5'], [172, '#d8edd2'], [188, '#bee1df'], [204, '#a1d1e5'], [220, '#7ab4d5'], [236, '#5397c5'], [256, '#2c7bb6']]
            },
            "fill-opacity": 0.8
          }
        }, {
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
        }]
      };
    }

    RiskMap.prototype.activate = function activate(param) {
      this.risk = param.risk;
    };

    RiskMap.prototype.addLayerToMap = function addLayerToMap(layer) {
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
    };

    RiskMap.prototype.attached = function attached() {
      var self = this;

      _mapboxGl2.default.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiJjajVvOGdpcmwzejNiMzJvODF2dGFqYWcxIn0.rAJZcytC7dbajv0wzWo8Kw';
      self.map = new _mapboxGl2.default.Map({
        attributionControl: false,
        container: 'mapContainer',
        center: [-80.25, 26.15],
        zoom: 11,
        style: 'mapbox://styles/mapbox/light-v9',
        hash: false
      });

      self.map.addControl(new _mapboxGl2.default.NavigationControl({}));

      self.map.on('load', function () {
        for (var group in self.layers) {
          console.log('checking group: ' + group);
          if (group === self.risk) {
            console.log('group ' + group + ' is active');
            for (var _iterator = self.layers[group], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var layer = _ref;

              console.log(layer.id);
              self.addLayerToMap(layer);
            }
          }
        }
      });
    };

    RiskMap.prototype.detached = function detached() {
      var self = this;
      for (var layer_key in self.layers) {
        if (layer_key === 'flood') {
          for (var flood_key in self.layers.flood) {
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
    };

    return RiskMap;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  \n  <router-view></router-view>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"; });
define('text!resources/styles/themeGuide.css', ['module'], function(module) { module.exports = ""; });
define('text!routes/riskmap/riskmap.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./riskmap.css\"></require>\n  <require from=\"mapbox-gl/mapbox-gl.css\"></require>\n\n  <div id=\"mapContainer\">\n  </div>\n</template>\n"; });
define('text!routes/riskmap/riskmap.css', ['module'], function(module) { module.exports = "#mapContainer {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map