define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function(){function e(){t(this,e)}return e.prototype.configureRouter=function(e,t){e.title="RiskMap",e.options.pushState=!0,e.options.root="",e.map([{route:":risk",name:"riskmap",moduleId:"routes/riskmap/riskmap"}]),e.mapUnknownRoutes({redirect:"riskmap"}),this.router=t},e.prototype.attached=function(){},e}()}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(e,t){"use strict";function o(e){e.use.standardConfiguration().feature("resources"),r.default.debug&&e.use.developmentLogging(),r.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=o;var r=function(e){return e&&e.__esModule?e:{default:e}}(t)}),define("resources/index",["exports"],function(e){"use strict";function t(e){}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t}),define("routes/riskmap/riskmap",["exports","mapbox-gl"],function(e,t){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.RiskMap=void 0;var r=function(e){return e&&e.__esModule?e:{default:e}}(t);e.RiskMap=function(){function e(t){o(this,e),this.ea=t,this.layers={flood:[{id:"FLDHVE",type:"fill",source:{url:"mapbox://asbarve.b0mn3fbb",type:"vector"},paint:{"fill-color":"#fccf23","fill-opacity":.9}},{id:"FLDHAO",type:"fill",source:{url:"mapbox://asbarve.1eqmjn9o",type:"vector"},paint:{"fill-color":"#fc610b","fill-opacity":.8}},{id:"FLDHAE",type:"fill",source:{url:"mapbox://asbarve.4cou1y2j",type:"vector"},paint:{"fill-color":"#c44d3f","fill-opacity":.7}},{id:"FLDHAH",type:"fill",source:{url:"mapbox://asbarve.758t0cbw",type:"vector"},paint:{"fill-color":"#6576a5","fill-opacity":.5}},{id:"FLDHX",type:"fill",source:{url:"mapbox://asbarve.44qg0o2f",type:"vector"},paint:{"fill-color":"#368bd8","fill-opacity":.25}}],stormsurge:[{id:"stormsurge",type:"fill",source:{url:"mapbox://asbarve.41947bz4",type:"vector"},paint:{"fill-color":{property:"CAT",type:"categorical",stops:[["1","#c1272d"],["2","#cd5257"],["3","#d97d81"],["4","#e6a8ab"],["5","#f2d3d5"]]},"fill-opacity":{property:"CAT",type:"categorical",stops:[["1",.7],["2",.6],["3",.5],["4",.4],["5",.3]]}}}],groundwater:[{id:"groundwater",type:"fill",source:{url:"mapbox://asbarve.5wvk9kun",type:"vector"},paint:{"fill-color":{property:"DN",type:"exponential",stops:[[44,"#d7191c"],[60,"#e24631"],[76,"#ee7446"],[92,"#faa25v"],[108,"#fdc076"],[124,"#fed993"],[140,"#fef2b0"],[156,"#f2f9c5"],[172,"#d8edd2"],[188,"#bee1df"],[204,"#a1d1e5"],[220,"#7ab4d5"],[236,"#5397c5"],[256,"#2c7bb6"]]},"fill-opacity":.8}},{id:"salt_water",type:"line",source:{url:"mapbox://asbarve.87xhq483",type:"vector"},paint:{"line-color":"#f05022","line-width":3}}]}}return e.prototype.activate=function(e){this.risk=e.risk},e.prototype.addLayerToMap=function(e){return this.map.addLayer({id:e.id,type:e.type,source:e.source,"source-layer":e.id,layout:{visibility:"visible"},paint:e.paint})},e.prototype.attached=function(){var e=this;r.default.accessToken="pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiJjajVvOGdpcmwzejNiMzJvODF2dGFqYWcxIn0.rAJZcytC7dbajv0wzWo8Kw",e.map=new r.default.Map({attributionControl:!1,container:"mapContainer",center:[-80.25,26.15],zoom:11,style:"mapbox://styles/mapbox/light-v9",hash:!1}),e.map.addControl(new r.default.NavigationControl({})),e.map.on("load",function(){for(var t in e.layers)if(console.log("checking group: "+t),t===e.risk){console.log("group "+t+" is active");for(var o=e.layers[t],r=Array.isArray(o),i=0,o=r?o:o[Symbol.iterator]();;){var a;if(r){if(i>=o.length)break;a=o[i++]}else{if(i=o.next(),i.done)break;a=i.value}var n=a;console.log(n.id),e.addLayerToMap(n)}}})},e.prototype.detached=function(){var e=this;for(var t in e.layers)if("flood"===t)for(var o in e.layers.flood){var r=e.layers.flood[o].id;e.map.getLayer(r)&&(e.map.removeLayer(r),e.map.removeSource(r))}else e.map.getLayer(e.layers[t].id)&&(e.map.removeLayer(e.layers[t].id),e.map.removeSource(e.layers[t].id))},e}()}),define("text!app.html",["module"],function(e){e.exports='<template>\n  <require from="./app.css"></require>\n  \n  <router-view></router-view>\n</template>\n'}),define("text!routes/riskmap/riskmap.html",["module"],function(e){e.exports='<template>\n  <require from="./riskmap.css"></require>\n  <require from="mapbox-gl/mapbox-gl.css"></require>\n\n  <div id="mapContainer">\n  </div>\n</template>\n'}),define("text!app.css",["module"],function(e){e.exports="html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"}),define("text!resources/styles/themeGuide.css",["module"],function(e){e.exports=""}),define("text!routes/riskmap/riskmap.css",["module"],function(e){e.exports="#mapContainer {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n"});