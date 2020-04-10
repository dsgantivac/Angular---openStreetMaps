import { Component } from '@angular/core';
import { MapServices } from './map/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private mapServices: MapServices){}

  addCoordenades(){
    navigator.geolocation.getCurrentPosition((position) => {
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;
      console.log("longitude: " + longitude);
      console.log("latitude: " + latitude);
      
      this.mapServices.addMapFeature(longitude , latitude, "prueba")
    })
  }

  addCoordenades2(){
    navigator.geolocation.getCurrentPosition((position) => {
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;
      this.mapServices.addMapFeature(longitude + 0.005, latitude + 0.005, "prueba")
    })
  }
  clearCoordenades(){
    this.mapServices.deleteFeatures();
  }
}
