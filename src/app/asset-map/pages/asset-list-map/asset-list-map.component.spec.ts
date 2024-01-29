import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetListMapComponent } from './asset-list-map.component';

describe('AssetListMapComponent', () => {
  let component: AssetListMapComponent;
  let fixture: ComponentFixture<AssetListMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
