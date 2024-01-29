import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'street-light-map-slp',
  templateUrl: './slp.component.html',
  styleUrls: ['./slp.component.css']
})
export class SlpComponent implements OnInit {
  previous;
  @Input('markerData') markers;
  constructor() { }
  ngOnInit(): void {
  }
  ngOnChanges(){
    this.previous=null;
  }
  clickedMarker(infowindow) {
    if (this.previous) {
       this.previous.close();
   }
   this.previous = infowindow; 
    }
}

