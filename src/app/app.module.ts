import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { GlobalModule } from 'global';
import { AssetListMapComponent } from './asset-map/pages/asset-list-map/asset-list-map.component';
import { LayoutComponent } from './asset-map/pages/layout/layout.component';
import { HeaderComponent } from './asset-map/pages/header/header.component';
import { AssetListComponent } from './asset-map/pages/asset-list/asset-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainInterceptor } from './main-interceptor';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegionComponent } from './asset-map/pages/region/region.component';
import { SiteComponent } from './asset-map/pages/site/site.component';
import { SlpComponent } from './asset-map/pages/slp/slp.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetListMapComponent,
    LayoutComponent,
    HeaderComponent,
    AssetListComponent,
    RegionComponent,
    SiteComponent,
    SlpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    AgmSnazzyInfoWindowModule,
    TreeViewModule,
    TabsModule.forRoot(),
    GlobalModule,

    NgbModule,
    BrowserAnimationsModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXmFtgk-h73pLIEsqiP9nAXA4XqlD-w7c',

      libraries: ['places']
    }),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
