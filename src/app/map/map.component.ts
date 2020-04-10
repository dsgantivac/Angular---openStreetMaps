import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import { Vector as VectorSource} from 'ol/source';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import { fromLonLat, toLonLat, transform } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { toStringHDMS } from 'ol/coordinate.js';
import Overlay from 'ol/Overlay';
import { PopupMapMarkerComponent } from '../popups/popup-map-marker/popup-map-marker.component';
import { MapServices } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  entryComponents: [PopupMapMarkerComponent]
})
export class MapComponent implements OnInit {
  latitude: number = 4.63386;
  longitude: number = -74.13099;
  vectorSource = new VectorSource()
  displayPopup: boolean
  message: string = "prueba"

  view = new View({
    center: fromLonLat([this.longitude, this.latitude]),
    zoom: 15
  })

  geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: this.view.getProjection()
  });
  constructor(private mapService: MapServices){
    this.displayPopup = false;
  }

  ngOnInit() {
    this.initiazlizeMap();
    this.mapService.featuresChange.subscribe(features => {
      this.vectorSource.clear(true)
      this.vectorSource.addFeatures(features);
    })
  }
  clearMap(){
    this.vectorSource.clear(true)
    this.displayPopup = false;
  }
  showMapMarkers(){
    this.vectorSource.clear(true)
    this.vectorSource.addFeatures(this.mapService.getFeatures());
  }

  initiazlizeMap(){
    const container = document.getElementById('popup');
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      offset: [-105, 23],
      autoPanAnimation: { duration: 250 }
    });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ preload: 4, source: new OSM() })
      ],
      overlays: [overlay],
      view: this.view
    });
    
    new VectorLayer({ map: map, source: this.vectorSource });

    map.on('click',  async (evt: any) => {
      var feature = map.forEachFeatureAtPixel(evt.pixel,
        (feature) => {
          return feature;
        });
        if (feature) {
          var featureGeometry:any = feature.getGeometry();
          var coordinates = featureGeometry.flatCoordinates;
          var lonLatCoordinates = transform(coordinates, 'EPSG:3857', 'EPSG:4326');
          var response:any = await this.mapService.getGeoCoding(lonLatCoordinates[0], lonLatCoordinates[1])
          
          console.log("response");
          console.log(lonLatCoordinates);
          
          //const hdms = toStringHDMS(toLonLat(coordinates));
          //this.message = 'Current coordinates of '+feature.get(name)+' are : ' + hdms;
          this.message = response.display_name 
          this.displayPopup = true;
          overlay.setPosition(coordinates);          
        } else {
          overlay.setPosition(undefined);          
        }
    });

    // change mouse cursor when over marker
    map.on('pointermove', function(e) {
      if (e.dragging) {
        return;
      }
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? 'pointer' : ''; 
    }); 
  }
}
