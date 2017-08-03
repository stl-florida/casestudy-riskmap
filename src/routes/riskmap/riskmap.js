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
    this.tooltip = {
      floodtitle: 'The SFHA is the area where the National Flood Insurance Programs NFIP floodplain management regulations must be enforced and the area where the mandatory purchase of flood insurance applies.',
      ve: 'High Risk Coastal Area: Coastal areas with a 1% or greater chance of flooding and an additional hazard associated with storm waves.',
      ao: 'River or stream flood hazard areas, and areas with a 1% or greater chance of shallow flooding each year, usually in the form of sheet flow, with an average depth ranging from 1 to 3 feet.',
      ae: 'The base floodplain where base flood elevation in relation to NGVD is provided.',
      ah: 'Areas with a 1% annual chance of shallow flooding, usually in the form of a pond, with an average depth ranging from 1 to 3 feet. These areas have a 26% chance of flooding over the life of a 30‐year mortgage.',
      x: 'Area of moderate flood hazard, usually the area between the limits of the 100‐ year and 500‐year floods.',
      stormsurgeTitle: 'featureset depicting Surge Zones, was created using a Surge Modeling application created for the Florida Statewide Regional Evacuation Update Study for each category of storm (1-5). Data courtesy- Florida Division of Emergency Management',
      groundwaterTitle: 'Change in the level of groundwater for projected 2060 sea level rise',
      waterdepth:'Change in the level of ground water - Base Case ground water data for 1990-1999 with NRC 3 Sea Level Rise projections',
      saltwater:'Extent of saltwater intrusion in ground water.',
      cat1:'Potential surge zone in category 1 hurricane',
      cat2:'Potential surge zone in category 2 hurricane',
      cat3:'Potential surge zone in category 3 hurricane',
      cat4:'Potential surge zone in category 4 hurricane',
      cat5:'Potential surge zone in category 5 hurricane',

    };
  }

  //Aurelia activate hook
  activate(param) {
    this.risk = param.risk;
  }

  //Fetch & apply layer properties
  addLayerToMap(layer) {
    var self = this;
    return self.map.addLayer(layer, 'waterway-label');
  }

  //Aurelia attached hook
  attached() {
    var self = this;

    //Initiate map
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiJjajVvOGdpcmwzejNiMzJvODF2dGFqYWcxIn0.rAJZcytC7dbajv0wzWo8Kw';
    self.map = new mapboxgl.Map({
      attributionControl: false,
      container: 'mapContainer',
      center: [-80.165, 26.0197],
      zoom: 15,
      style: 'mapbox://styles/mapbox/dark-v9',
      hash: false
    });

    //Add navigation controls
    self.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    //Construct popup
    self.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: true
    });
    self.popup.setLngLat([-80.1646, 26.02005])
              .setHTML('Sunset golfcourse')
              .addTo(self.map);

    //Display layers according to query parameter
    self.map.on('load', () => {
      for (let group in self.properties) {
        if (group === self.risk || group === 'default') {
          for (let layer of self.properties[group]) {
            self.addLayerToMap(layer);
          }
        }
      }
    });

    self.map.on('zoom', () => {
      if (self.map.getZoom() > 14) {
        self.popup.addTo(self.map);
      } else {
        self.popup.remove();
      }
    });
  }

  showTooltip(string) {
    this.hover = true;
    this.hoverstring = this.tooltip[string];
    }

  hideTooltip(){
    this.hover = null;
  }

}
