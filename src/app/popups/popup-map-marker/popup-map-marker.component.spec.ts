import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMapMarkerComponent } from './popup-map-marker.component';

describe('PopupMapMarkerComponent', () => {
  let component: PopupMapMarkerComponent;
  let fixture: ComponentFixture<PopupMapMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMapMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMapMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
