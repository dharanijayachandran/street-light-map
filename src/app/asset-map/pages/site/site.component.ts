import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'street-light-map-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
assetId:any;
asset:any;
previous;
  constructor() { }
  ngOnInit(): void {
  }
  ngOnChanges(){
    this.previous=null;
  }
  @Input('markerData') markers;
  clickedMarker(infowindow) {
    if (this.previous) {
       this.previous.close();
   }
   this.previous = infowindow; 
    }
}
