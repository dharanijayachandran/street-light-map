import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/app/common/dto/Asset';
import { AssetMapViewData } from 'src/app/common/dto/AssetMapViewData';
import { AssetService } from 'src/app/common/service/asset.service';
@Component({
  selector: 'street-light-map-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  assetId: any
  asset:any;
  previous;
  constructor(private assetService:AssetService) { }
  @Input('childViewModeData') assetmapviewdata: AssetMapViewData = new AssetMapViewData();
  @Input('childAssetName') assetname;
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