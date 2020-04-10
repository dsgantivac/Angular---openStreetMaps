import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popup-map-marker',
  templateUrl: './popup-map-marker.component.html',
  styleUrls: ['./popup-map-marker.component.css']
})
export class PopupMapMarkerComponent implements OnInit {
  @Input('message') message:string;

  constructor() { }

  ngOnInit() {
  }
}
