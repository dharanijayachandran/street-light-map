export class Asset{
    static nodeData(nodeData: any) {
      throw new Error('Method not implemented.');
    }
    id: number;
    name: string;
    refAssetId: number;
    hasChild: boolean;
    child: any;
    geospatialCoordinates :  string;
    assets: Asset[];
    subAssets: Asset[]=[];
    refAssetName: string;
    typeName: string;    
    typeCode: string;
    assetId : number;
    assetName: string;
    assetTypeCode: string;
    assetTypeName:string;
    lightCount:number;
    lightWatt:any;
    lightBrandOrDriver:any;
    contract:any;
    status:string;
    statusTime:any;
    assetParams:any;
}