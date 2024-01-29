import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './asset-map/pages/layout/layout.component';



const routes: Routes = [
  {path:'',component:LayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/map' },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
