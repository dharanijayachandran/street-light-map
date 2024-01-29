import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from '../dto/Asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  apiurlForAsset = environment.baseUrl_AssetManagement;
  assetViewModeFormViewStatus: string;
  listOfRow: Asset;
  assetName: any;
 
  assetManagementurl = environment.baseUrl_AssetManagement;
  apiurl=environment.baseUrl_StreetLightManagement;
  constructor(private http: HttpClient) { }
 
  getAssetsByOrganizationId(organizationId: number) {
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<Asset[]>(this.apiurl+"organizations/"+organizationId+"?user-id="+userId+"&user-type="+userType);
  }

  getAssetLightStatus(organizationId: Number, assetId: Number, timezone: String): Observable<Asset[]> {
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<Asset[]>
      (this.apiurl + 'organizations/' + organizationId + '/child-assets/' + assetId +'/latest-value?type-code=slp' +  '&offset=' +'&limit=' +'&timezone='+ timezone);
  }  
    getAssetIdsLatestLightStatus(assetIds:any){
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let organizationId = sessionStorage.getItem("beId");
      let userId = sessionStorage.getItem("userId");
      let userType="";
      if (sessionStorage.getItem("isAdmin") == "true") {
        userType = "Admin";
      }
      let assetJson={"assetIds":assetIds};
      return this.http.post<Asset[]>(this.apiurl + 'organizations/'+ organizationId + '/asset-id' +
      '/latest-light-status?timezone=' + timezone + "&user-id=" +userId +"&user-type=" +userType,assetJson);
    }
    getRefreshTimeIntervals(): Observable<any> {
      return this.http.get<any>('/assets/street-light/json/refreshtimeinterval.json');
    }
    getIconUrl(organizationId: number){
      return this.http.get<Asset[]>(this.apiurl+"organizations/"+organizationId+"/asset-types");
    }
}