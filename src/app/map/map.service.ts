import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MapServices {
    featuresChange = new Subject<Feature[]>();
    private positionFeatures: Feature[] = [];
    constructor(private http: HttpClient){}

    addMapFeature(longitude, latitude, nameValue) {
        var coordinates = fromLonLat([longitude, latitude])
        var positionFeature = new Feature();
        positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        positionFeature.set(name, nameValue);
        positionFeature.setStyle(new Style({
            image: new Icon(({
                color: '#8959A8',
                crossOrigin: 'anonymous',
                src: 'assets/vector.svg',
                imgSize: [20, 20]
            }))
        }));
        this.positionFeatures.push(positionFeature)
        this.featuresChange.next(this.positionFeatures)
    }

    getFeatures(){
        return this.positionFeatures;
    }

    deleteFeatures(){
        this.positionFeatures = [];
        this.featuresChange.next(this.positionFeatures)
    }

    getGeoCoding(longitude, latitude){
        return this.http.get("https://nominatim.openstreetmap.org/reverse?format=json&lon="+longitude+"&lat="+latitude).toPromise();
    }


}