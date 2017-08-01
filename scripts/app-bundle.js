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
      config.options.root = '';
      config.map([{ route: '', name: 'map', moduleId: 'routes/riskmap/riskmap' }]);
      config.mapUnknownRoutes({ redirect: '' });
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
define('resources/layers',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Layers = exports.Layers = function Layers() {
    _classCallCheck(this, Layers);

    this.properties = {
      flood: [{
        id: "FLDHVE",
        type: 'fill',
        source: {
          url: 'mapbox://asbarve.b0mn3fbb',
          type: 'vector'
        },
        paint: {
          "fill-color": "#fccf23",
          "fill-opacity": 0.6
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
          "fill-color": "#52d6dd",
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
          "fill-opacity": 0.5
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
            "stops": [["1", "#f05124"], ["2", "#c6502b"], ["3", "#a44e30"], ["4", "#844933"], ["5", "#664335"]]
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
            stops: [[44, '#d7191c'], [60, '#e24631'], [76, '#ee7446'], [92, '#faa25B'], [108, '#fdc076'], [124, '#fed993'], [140, '#fef2b0'], [156, '#f2f9c5'], [172, '#d8edd2'], [188, '#bee1df'], [204, '#a1d1e5'], [220, '#7ab4d5'], [236, '#5397c5'], [256, '#2c7bb6']]
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
          'line-width': 2
        }
      }]
    };
  };
});
define('routes/riskmap/riskmap',['exports', 'aurelia-framework', 'mapbox-gl', 'resources/layers'], function (exports, _aureliaFramework, _mapboxGl, _layers) {
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

  var _dec, _class;

  var RiskMap = exports.RiskMap = (_dec = (0, _aureliaFramework.inject)(_layers.Layers), _dec(_class = function () {
    function RiskMap(Layers) {
      _classCallCheck(this, RiskMap);

      this.properties = Layers.properties;
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
        style: 'mapbox://styles/mapbox/dark-v9',
        hash: false
      });

      self.map.addControl(new _mapboxGl2.default.NavigationControl(), 'top-left');

      self.map.on('load', function () {
        for (var group in self.properties) {
          if (group === self.risk) {
            for (var _iterator = self.properties[group], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

              self.addLayerToMap(layer);
            }
          }
        }
      });
    };

    return RiskMap;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <router-view></router-view>\n</template>\n"; });
define('text!routes/riskmap/riskmap.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./riskmap.css\"></require>\n  <require from=\"mapbox-gl/mapbox-gl.css\"></require>\n\n  <div id=\"mapContainer\">\n  </div>\n\n  <div id=\"legendWrapper\">\n\n    <div if.bind=\"risk==='flood'\" id=\"floodLegend\" class=\"legend\">\n      <h4>FEMA Flood Hazzard Areas</h4>\n      <div><span style=\"background-color: #e5bd21\"></span>VE</div>\n      <div><span style=\"background-color: #d55a27\"></span>AO</div>\n      <div><span style=\"background-color: #c44d3f\"></span>AE</div>\n      <div><span style=\"background-color: #52d6dd\"></span>AH</div>\n      <div><span style=\"background-color: #4a7491\"></span>X</div>\n    </div>\n\n    <div if.bind=\"risk==='stormsurge'\" id=\"stormLegend\" class=\"legend\">\n      <h4>Flood Extents during Storm Surge for Hurricane</h4>\n      <div><span style=\"background-color: #f05124\"></span>Category 1</div>\n      <div><span style=\"background-color: #c6502b\"></span>Category 2</div>\n      <div><span style=\"background-color: #a44e30\"></span>Category 3</div>\n      <div><span style=\"background-color: #844933\"></span>Category 4</div>\n      <div><span style=\"background-color: #664335\"></span>Category 5</div>\n    </div>\n\n    <div if.bind=\"risk==='groundwater'\" id=\"gwLegend\" class=\"legend\">\n      <h4>Ground Water</h4>\n      <div>Change in depth (ft)<span id=\"groundwaterLegend\"></span>\n        <table>\n          <tr>\n            <td class=\"legendText\">-0.5</td>\n            <td class=\"legendText\">0.5</td>\n            <td class=\"legendText\">1.5</td>\n            <td class=\"legendText\">2.5</td>\n          </tr>\n        </table>\n      </div>\n      <div><span id=\"saltwaterLine\"></span></div>\n    </div>\n\n  </div>\n\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"; });
define('text!resources/styles/themeGuide.css', ['module'], function(module) { module.exports = ""; });
define('text!routes/riskmap/riskmap.css', ['module'], function(module) { module.exports = "#mapContainer {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n.legend {\n  background-color: #fff;\n  border-radius: 3px;\n  bottom: 20px;\n  width: 120px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  font-size: 12px;\n  font-family: 'Helvetica Neue', Arial, sans-serif;\n  padding: 10px;\n  position: absolute;\n  right: 20px;\n  z-index: 1;\n  line-height: 1.5;\n}\n.legend h4 {\n  padding: 0 0 2px 0;\n  margin: 0 0 10px 0;\n  border-bottom: solid 1px black;\n}\n.legend div span {\n  display: inline-block;\n  height: 10px;\n  margin-right: 5px;\n  width: 10px;\n}\n.legend #groundwaterLegend {\n  margin-top: 5px;\n  height: 10px;\n  width: 100%;\n  background: red;\n  /* For browsers that do not support gradients */\n  /* For Safari 5.1 to 6.0 */\n  background: -webkit-linear-gradient(left, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n  /* For Opera 11.1 to 12.0 */\n  background: -o-linear-gradient(left, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n  /* For Fx 3.6 to 15 */\n  background: -moz-linear-gradient(left, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n  /* Standard syntax */\n  background: linear-gradient(to right, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n}\n.legend .legendText {\n  width: 40px;\n  text-align: center;\n}\n.legend .legendText:first-child {\n  text-align: left;\n}\n.legend .legendText:last-child {\n  text-align: right;\n}\n.legend #saltwaterLine {\n  border-bottom: solid red 3px;\n  width: 100%;\n  margin-top: 5px;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map