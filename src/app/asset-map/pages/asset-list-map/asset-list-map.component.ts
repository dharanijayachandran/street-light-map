import { MapsAPILoader } from '@agm/core';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetMapViewData } from 'src/app/common/dto/AssetMapViewData';
import { AssetService } from 'src/app/common/service/asset.service';

@Component({
  selector: 'app-asset-list-map',
  templateUrl: './asset-list-map.component.html',
  styleUrls: ['./asset-list-map.component.css']
})
export class AssetListMapComponent implements OnInit {
  asset: any;
  previous;
  constructor(private router: Router, private route: ActivatedRoute, private assetService: AssetService,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef) {
     }
  @Input ('childlatlngBounds') bounds;
  @Input('childViewModeData') markersArray;
  @Input('childAssetName') assetname;
  @Input('childTotalMarkerIdx') markercount;
  @Input('totalLabelName') totalLabelName;
  @Input('childimageurl') iconURL;
  @Input('childtypeCode') typeCode;
  @Input('childAssetId') assetId;
  @Input('childAgmMap') agmMap;
  ngOnInit(): void {
  }
   clickedMarker(infowindow) {
     if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow; 
     }

}

