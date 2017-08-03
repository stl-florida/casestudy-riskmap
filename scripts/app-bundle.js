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
        'source-layer': 'FLDHVE',
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
        'source-layer': 'FLDHAO',
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
        'source-layer': 'FLDHAE',
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
        'source-layer': 'FLDHAH',
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
        'source-layer': 'FLDHX',
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
        'source-layer': 'stormsurge',
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
        'source-layer': 'groundwater',
        paint: {
          "fill-color": {
            property: "DN",
            type: "exponential",
            stops: [[40, '#d7191c'], [70, '#e24631'], [100, '#ee7446'], [120, '#faa25b'], [140, '#fdc076'], [160, '#fed993'], [180, '#fef2b0'], [196, '#f2f9c5'], [208, '#d8edd2'], [220, '#bee1df'], [230, '#a1d1e5'], [238, '#7ab4d5'], [246, '#5397c5'], [252, '#2c7bb6']]
          },
          "fill-opacity": 0.7
        }
      }, {
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
      }],
      default: [{
        id: 'golfcourse_base',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {
                name: 'Sunset golfcourse'
              },
              geometry: {
                type: 'LineString',
                coordinates: [[-80.16687564286083, 26.022109333950482], [-80.16233181725012, 26.022188276452326], [-80.16225579269295, 26.018577702075035], [-80.16679999185034, 26.018499925562182], [-80.16687564286083, 26.022109333950482]]
              }
            }]
          }
        },
        paint: {
          'line-color': '#f2ffe6',
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
      this.tooltip = {
        floodtitle: 'The SFHA is the area where the National Flood Insurance Programs NFIP floodplain management regulations must be enforced and the area where the mandatory purchase of flood insurance applies.',
        ve: 'High Risk Coastal Area: Coastal areas with a 1% or greater chance of flooding and an additional hazard associated with storm waves.',
        ao: 'River or stream flood hazard areas, and areas with a 1% or greater chance of shallow flooding each year, usually in the form of sheet flow, with an average depth ranging from 1 to 3 feet.',
        ae: 'The base floodplain where base flood elevation in relation to NGVD is provided.',
        ah: 'Areas with a 1% annual chance of shallow flooding, usually in the form of a pond, with an average depth ranging from 1 to 3 feet. These areas have a 26% chance of flooding over the life of a 30‐year mortgage.',
        x: 'Area of moderate flood hazard, usually the area between the limits of the 100‐ year and 500‐year floods.',
        stormsurgeTitle: 'featureset depicting Surge Zones, was created using a Surge Modeling application created for the Florida Statewide Regional Evacuation Update Study for each category of storm (1-5). Data courtesy- Florida Division of Emergency Management',
        groundwaterTitle: 'Change in the level of groundwater for projected 2060 sea level rise',
        waterdepth: 'Change in the level of ground water - Base Case ground water data for 1990-1999 with NRC 3 Sea Level Rise projections',
        saltwater: 'Extent of saltwater intrusion in ground water.',
        cat1: 'Surge Zone based on Hurricaine Categories 1',
        cat2: 'Surge Zone based on Hurricaine Categories 2',
        cat3: 'Surge Zone based on Hurricaine Categories 3',
        cat4: 'Surge Zone based on Hurricaine Categories 4',
        cat5: 'Surge Zone based on Hurricaine Categories 5'

      };
    }

    RiskMap.prototype.activate = function activate(param) {
      this.risk = param.risk;
    };

    RiskMap.prototype.addLayerToMap = function addLayerToMap(layer) {
      var self = this;
      return self.map.addLayer(layer, 'waterway-label');
    };

    RiskMap.prototype.attached = function attached() {
      var self = this;

      _mapboxGl2.default.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiJjajVvOGdpcmwzejNiMzJvODF2dGFqYWcxIn0.rAJZcytC7dbajv0wzWo8Kw';
      self.map = new _mapboxGl2.default.Map({
        attributionControl: false,
        container: 'mapContainer',
        center: [-80.165, 26.0197],
        zoom: 15,
        style: 'mapbox://styles/mapbox/dark-v9',
        hash: false
      });

      self.map.addControl(new _mapboxGl2.default.NavigationControl(), 'bottom-left');

      self.popup = new _mapboxGl2.default.Popup({
        closeButton: false,
        closeOnClick: true
      });
      self.popup.setLngLat([-80.1646, 26.02005]).setHTML('Sunset golfcourse').addTo(self.map);

      self.map.on('load', function () {
        for (var group in self.properties) {
          if (group === self.risk || group === 'default') {
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

      self.map.on('zoom', function () {
        if (self.map.getZoom() > 14) {
          self.popup.addTo(self.map);
        } else {
          self.popup.remove();
        }
      });
    };

    RiskMap.prototype.showTooltip = function showTooltip(string) {
      this.hover = true;
      this.hoverstring = this.tooltip[string];
    };

    RiskMap.prototype.hideTooltip = function hideTooltip() {
      this.hover = null;
    };

    return RiskMap;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <router-view></router-view>\n</template>\n"; });
define('text!routes/riskmap/riskmap.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./riskmap.css\"></require>\n  <require from=\"mapbox-gl/mapbox-gl.css\"></require>\n\n  <div id=\"mapContainer\">\n  </div>\n\n  <div id=\"tooltipWrapper\" if.bind=\"hover\">\n    <b>Layer Information</b>\n    <p>${hoverstring}</p>\n  </div>\n\n  <div id=\"legendWrapper\">\n    <div if.bind=\"risk==='flood'\" id=\"floodLegend\" class=\"legend\">\n      <h4 mouseover.delegate=\"showTooltip('floodtitle')\" mouseout.delegate=\"hideTooltip()\">FEMA Special Flood Hazard Areas</h4>\n      <div mouseover.delegate=\"showTooltip('ve')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #e5bd21\"></span>VE</div>\n      <div mouseover.delegate=\"showTooltip('ao')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #d55a27\"></span>AO</div>\n      <div mouseover.delegate=\"showTooltip('ae')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #c44d3f\"></span>AE</div>\n      <div mouseover.delegate=\"showTooltip('ah')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #52d6dd\"></span>AH</div>\n      <div mouseover.delegate=\"showTooltip('x')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #4a7491\"></span>X</div>\n\n    </div>\n\n    <div if.bind=\"risk==='stormsurge'\" id=\"stormLegend\" class=\"legend\">\n      <h4 mouseover.delegate=\"showTooltip('stormsurgeTitle')\" mouseout.delegate=\"hideTooltip()\">Storm Surge Extents</h4>\n      <div mouseover.delegate=\"showTooltip('cat1')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #f05124\"></span>Cat 1</div>\n      <div mouseover.delegate=\"showTooltip('cat2')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #c6502b\"></span>Cat 2</div>\n      <div mouseover.delegate=\"showTooltip('cat3')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #a44e30\"></span>Cat 3</div>\n      <div mouseover.delegate=\"showTooltip('cat4')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #844933\"></span>Cat 4</div>\n      <div mouseover.delegate=\"showTooltip('cat5')\" mouseout.delegate=\"hideTooltip()\"><span style=\"background-color: #664335\"></span>Cat 5</div>\n    </div>\n\n    <div if.bind=\"risk==='groundwater'\" id=\"gwLegend\" class=\"legend\">\n      <h4 mouseover.delegate=\"showTooltip('groundwaterTitle')\" mouseout.delegate=\"hideTooltip()\">Ground Water</h4>\n      <div mouseover.delegate=\"showTooltip('waterdepth')\" mouseout.delegate=\"hideTooltip()\">Change in depth (ft)\n        <span id=\"groundwaterLegend\"></span>\n        <table>\n          <tr>\n            <td class=\"legendText bar\">2.5'</td>\n            <td class=\"legendText bar\">1.5'</td>\n            <td class=\"legendText bar\">0.5'</td>\n            <td class=\"legendText bar\">-0.5'</td>\n          </tr>\n        </table>\n      </div>\n      <div mouseover.delegate=\"showTooltip('saltwater')\" mouseout.delegate=\"hideTooltip()\">\n        <span id=\"saltwaterLine\" ></span>\n        saltwater intrusion\n      </div>\n    </div>\n\n  </div>\n\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"; });
define('text!resources/styles/themeGuide.css', ['module'], function(module) { module.exports = ""; });
define('text!routes/riskmap/riskmap.css', ['module'], function(module) { module.exports = "#mapContainer {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n.mapboxgl-popup div {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n}\ndiv.mapboxgl-popup-content {\n  background-color: #f2ffe6;\n  margin: 0px;\n  padding: 4px;\n  color: #202020;\n}\n#tooltipWrapper {\n  background-color: rgba(255, 255, 255, 0.7);\n  border-radius: 3px;\n  bottom: 20px;\n  max-width: 250px;\n  height: 150px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  font-size: 12px;\n  font-family: 'Helvetica Neue', Arial, sans-serif;\n  color: black;\n  padding: 10px;\n  position: absolute;\n  right: 170px;\n  z-index: 1;\n}\n.legend {\n  background-color: #fff;\n  border-radius: 3px;\n  bottom: 20px;\n  width: 120px;\n  height: 150px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  font-size: 12px;\n  font-family: 'Helvetica Neue', Arial, sans-serif;\n  padding: 10px;\n  position: absolute;\n  right: 20px;\n  z-index: 1;\n  line-height: 1.5;\n}\n.legend h4 {\n  padding: 0 0 2px 0;\n  margin: 0 0 10px 0;\n  border-bottom: solid 1px black;\n}\n.legend div {\n  width: 100%;\n}\n.legend div:hover {\n  background-color: #e8e8e8;\n}\n.legend div span {\n  display: inline-block;\n  height: 10px;\n  margin-right: 5px;\n  width: 10px;\n}\n.legend div table tr td {\n  margin: 0px;\n}\n.legend #groundwaterLegend {\n  margin-top: 5px;\n  height: 10px;\n  width: 100%;\n  background: red;\n  /* For browsers that do not support gradients */\n  /* For Safari 5.1 to 6.0 */\n  background: -webkit-linear-gradient(left, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n  /* For Opera 11.1 to 12.0 */\n  background: -o-linear-gradient(left, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n  /* For Fx 3.6 to 15 */\n  background: -moz-linear-gradient(left, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n  /* Standard syntax */\n  background: linear-gradient(to right, #D7191C, #e24631, #ee7446, #faa25b, #fdc076, #fed993, #fef2b0, #f2f9c5, #d8edd2, #bee1df, #a1d1e5, #7ab4d5, #5397c5, #2c7bb6);\n}\n.legend .legendText {\n  width: 40px;\n  text-align: center;\n}\n.legend .legendText:first-child {\n  text-align: left;\n}\n.legend .legendText:last-child {\n  text-align: right;\n}\n.legend .legendText.bar {\n  line-height: 1;\n  margin: 0px;\n  padding: 0px;\n}\n.legend #saltwaterLine {\n  border-bottom: solid red 3px;\n  width: 100%;\n  margin-top: 5px;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map