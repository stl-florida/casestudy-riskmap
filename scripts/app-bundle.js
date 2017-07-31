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
      config.options.root = '/';
      config.map([{ route: ':risk', name: 'map', moduleId: 'routes/riskmap/riskmap' }]);
      config.mapUnknownRoutes({ redirect: 'map' });
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
define('routes/flood/flood',['exports', 'aurelia-framework', '../riskmap/riskmap', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _riskmap, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Flood = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Flood = exports.Flood = (_dec = (0, _aureliaFramework.inject)(_riskmap.RiskMap, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Flood(RiskMap, EventAggregator) {
      _classCallCheck(this, Flood);

      this.riskmap = RiskMap;
      this.ea = EventAggregator;
    }

    Flood.prototype.attached = function attached() {
      var self = this;
      var map = self.riskmap.map;

      self.ea.subscribe('doneLoading', function () {
        for (var layer_key in self.riskmap.layers.flood) {
          map.addLayerToMap(flood[layer_key]);
        }
      });
    };

    Flood.prototype.detached = function detached() {
      var self = this;
      var map = self.riskmap.map;
      for (var layer_key in self.riskmap.layers.flood) {
        var id = self.riskmap.layers.flood[layer_key].id;
        if (map.getLayer(id)) {
          map.removeLayer(id);
          map.removeSource(id);
        }
      }
    };

    return Flood;
  }()) || _class);
});
define('routes/gw/gw',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Gw = exports.Gw = function () {
    function Gw() {
      _classCallCheck(this, Gw);
    }

    Gw.prototype.attached = function attached() {
      var self = this;
    };

    return Gw;
  }();
});
define('routes/riskmap/riskmap',["exports", "mapbox-gl"], function (exports, _mapboxGl) {
  "use strict";

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
        flood: {
          ve: {
            id: "FLDHVE",
            url: "b0mn3fbb",
            paint: {
              "fill-color": "#fccf23",
              "fill-opacity": 0.9
            }
          },
          ao: {
            id: 'FLDHAO',
            url: '1eqmjn9o',
            paint: {
              "fill-color": "#fc610b",
              "fill-opacity": 0.8
            }
          },
          ae: {
            id: 'FLDHAE',
            url: '4cou1y2j',
            paint: {
              "fill-color": "#c44d3f",
              "fill-opacity": 0.7
            }
          },
          ah: {
            id: 'FLDHAH',
            url: '758t0cbw',
            paint: {
              "fill-color": "#6576a5",
              "fill-opacity": 0.5
            }
          },
          x: {
            id: 'FLDHX',
            url: '44qg0o2f',
            paint: {
              "fill-color": "#368bd8",
              "fill-opacity": 0.25
            }
          }
        },
        stormsurge: {
          id: 'stormsurge',
          url: '41947bz4',
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
        },
        groundwater: {
          id: '',
          url: '',
          paint: {}
        }
      };
    }

    RiskMap.prototype.activate = function activate(param) {
      this.risk = param.risk;
    };

    RiskMap.prototype.addLayerToMap = function addLayerToMap(layer) {
      var self = this;
      return self.map.addLayer({
        id: layer.id,
        type: 'fill',
        source: {
          type: 'vector',
          url: 'mapbox://asbarve.' + layer.url
        },
        'source-layer': layer.id,
        layout: {
          visibility: 'visible'
        },
        paint: layer.paint
      });
    };

    RiskMap.prototype.attached = function attached() {
      var self = this;

      console.log('DOM ready');
      console.log(this.risk);

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
        if (self.risk === 'flood') {
          for (var layer_key in self.layers.flood) {
            self.addLayerToMap(self.layers.flood[layer_key]);
          }
        } else {
          self.addLayerToMap(self.layers[self.risk]);
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
define('routes/storm/storm',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Storm = exports.Storm = function () {
    function Storm() {
      _classCallCheck(this, Storm);
    }

    Storm.prototype.attached = function attached() {
      var self = this;
    };

    return Storm;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  \n  <router-view></router-view>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"; });
define('text!routes/flood/flood.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./flood.css\"></require>\n</template>\n"; });
define('text!resources/styles/themeGuide.css', ['module'], function(module) { module.exports = ""; });
define('text!routes/gw/gw.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./gw.css\"></require>\n</template>\n"; });
define('text!routes/riskmap/riskmap.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./riskmap.css\"></require>\n  <require from=\"mapbox-gl/mapbox-gl.css\"></require>\n\n  <div id=\"mapContainer\">\n  </div>\n</template>\n"; });
define('text!routes/flood/flood.css', ['module'], function(module) { module.exports = ""; });
define('text!routes/storm/storm.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./storm.css\"></require>\n</template>\n"; });
define('text!routes/gw/gw.css', ['module'], function(module) { module.exports = ""; });
define('text!routes/riskmap/riskmap.css', ['module'], function(module) { module.exports = "#mapContainer {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"; });
define('text!routes/storm/storm.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map