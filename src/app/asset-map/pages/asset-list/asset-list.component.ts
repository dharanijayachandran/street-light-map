import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral, MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Asset } from 'src/app/common/dto/Asset';
import { Marker } from 'src/app/common/dto/Marker';
import { AssetService } from 'src/app/common/service/asset.service';
const STORE_KEY = 'lastAction';
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit,OnDestroy {
  @ViewChild('treeview') public tree: TreeViewComponent;
  @ViewChild('AgmMap') agmMap: AgmMap;
  showLoaderImage: boolean = true;
  assets: any;
  getDataSource: Asset[] = [];
  field: Object = {};
  asset: Asset = new Asset();
  allowMultiSelection = true;
  assetId: any;
  assetname: string;
  markercount: number;
  totalLabelName: string;
  name: string;
  typeCode: string;
  timeZone: number;
  iconURL: any;
  markerIdx: any;
  inter: NodeJS.Timeout;
  status:string;
  statusTime:number;
  slpAssets:Asset[]=[];
  assetTypeCode: string;
  markersArray: any = [];
  latlngBounds:any;
  constructor(private assetService: AssetService,private http: HttpClient,private mapsAPILoader: MapsAPILoader,) { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getAssetsByOrganizationId();
    this.refreshdata();
  }
  ngOnDestroy() {
    clearInterval(this.inter);
  }
  refreshdata(){
    this.assetService.getRefreshTimeIntervals().toPromise().then(data => {
       let interval = data.refreshtimeinterval;
      this.inter = setInterval(() => {
        localStorage.setItem(STORE_KEY, Date.now().toString());
        this.getAssetLightStatus();
      }, +interval);
    })
  }
  getAssetsByOrganizationId() {
    let organizationId = sessionStorage.getItem("beId");
    this.assetService.getAssetsByOrganizationId(Number(organizationId)).subscribe(data => {
      this.showLoaderImage = false;
      if (Array.isArray(data) && data.length) {
        this.assets = JSON.parse(JSON.stringify(data));
        this.assets.forEach(asset => {
          if (null != asset.subAssets && asset.subAssets.length != 0) {
            asset.hasChild = true;
            this.iterateTheSubList(asset.subAssets)
          }
        })
        this.getDataSource = this.getFormattedAssetList(this.assets);
        this.field = this.formatedResponse(this.getDataSource);
        this.asset = this.field['dataSource'][0];
        this.assetId = this.asset.id;
        this.assetname = this.asset.name;
        this.field['dataSource'][0].isSelected = true;
        this.getAssetLightStatus();
      } else {
        this.field = Object.keys(this.field).length === 0;
      }
    },
      error => {
        this.showLoaderImage = false;
        console.log(error);
      })
  }
  formatedResponse(response: any) {
    return {
      dataSource: response,
      id: 'id',
      text: 'name',
      parentID: 'refAssetId',
      tooltip: 'typeName',
      hasChildren: 'hasChild',
      selected:'isSelected',
      assetTypeCode:'typeCode'
    };
  }
  iterateTheSubList(subAssets: any[]) {
    const that = this;
    subAssets.forEach(asset => {
      if (null != asset.subAssets && asset.subAssets.length != 0) {
        asset.hasChild = true;
        this.iterateTheSubList(asset.subAssets)
        if(asset.subAssets[0].typeCode == "SLP"){
        asset.subAssets.length=0;
        }
       }
    })
  }
  getFormattedAssetList(list) {
    const that = this;
    return list.map(function (l) {
      return {
        id: l.id,        
        name: l.name,
        typeName: l.typeName,
        typeCode:l.typeCode,
        child: that.assetIterate(l.subAssets),
      };
    });
  }
  assetIterate(assets) {
    const that = this;
    return assets && assets.length ? assets.map(function (o) {
      var returnObj = {
        "id": o.id,
        "name": o.name,
        "refAssetId": o.refAssetId,
        "typeName": o.typeName,
        "typeCode":o.typeCode,
        "child": that.assetIterate(o.subAssets),
      }
      if (o.refAssetId) {
        returnObj["refAssetId"] = o.refAssetId;
      }
      if (o.typeCode) {
        returnObj["typeCode"] = o.typeCode;
      }
      return returnObj;
    }) : [];
  }
  onClickAsset(asset: any) {
    this.assetId = asset.nodeData.id;
     this.assetTypeCode=this.tree.getTreeData(this.assetId)[0].typeCode.toString();
    this.assetname = asset.nodeData.text;
    this.getAssetLightStatus();
  }
  getAssetLightStatus() {
    let organizationId = sessionStorage.getItem("beId");
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.assetService.getAssetLightStatus(Number(organizationId), Number(this.assetId),String(timezone)).subscribe(data => {
      let assets:Asset[];
      assets=data;
      this.getAssetMarkerCreation(assets);
      },
      error => {
        console.log(error);
      })
  }
  getAssetMarkerCreation(assets:any[]){
          this.markercount=assets.length;
          this.markersArray.length=0;
         for (let idx = 0; idx < assets.length; idx++) {
          let asset=assets[idx];
          if(null == asset.geospatialCoordinates ){
            continue;
          }
          let marker=new Marker();
          let latlng = asset.geospatialCoordinates.split(" ");
          this.totalLabelName = asset.assetTypeCode;
          let icon: string;
          icon = "/assets/street-light/img/status/light-status-no.png";
          if ( null != asset.status ) {
            if (asset.status.toUpperCase() == "ON") {
              icon = "/assets/street-light/img/status/light-status-on.png";}
            else if (asset.status.toUpperCase() == "OFF") {
              icon = "/assets/street-light/img/status/light-status-off.png";}
          }
          marker.iconURL=icon;
          marker.lat=latlng[0];
          marker.lng=latlng[1];  
          marker.visible=true;
          marker.name= asset.assetName;
          marker.typeCode= asset.assetTypeCode;
          marker.refAssetName= asset.refAssetName;
          marker.lightStatus=asset.status;
          marker.lightStatusTime=asset.statusTime;
          marker.lightCount=asset.lightCount;
          marker.lightWatt=asset.lightWatt;
          marker.lightBrandOrDriver=asset.lightBrandOrDriver;
          marker.contract=asset.contract;
          marker.assetId=asset.assetId;
          this.markersArray[idx]=marker;
        }
        this.setBounds();
      }
      setBounds(): void {
        this.mapsAPILoader.load().then(() => {
                this.latlngBounds = new window['google'].maps.LatLngBounds();
                this.markersArray.forEach((marker) => {
                    this.latlngBounds.extend(new window['google'].maps.LatLng(marker.lat, marker.lng))
                })
        })
    }
}