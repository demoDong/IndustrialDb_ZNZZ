import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomePageComponent } from './homepage/homepage.component';
import { StrongCountryComponent } from './strong-country/strong-country.component';
import { BigdatabaseComponent } from './bigdatabase/bigdatabase.component';
import { BigdatabasenewComponent } from './bigdatabasenew/bigdatabasenew.component';
import { BigdatabasenewV2Component } from './bigdatabasenewV2/bigdatabasenew.component';
import { DataroamComponent } from './dataroam/dataroam.component';
import { Mf1Component } from './fourandfour/mf1/mf1.component';
import { Mf2Component } from './fourandfour/mf2/mf2.component';
import { Mf3Component } from './fourandfour/mf3/mf3.component';
import { Mf4Component } from './fourandfour/mf4/mf4.component';
import { Mf5Component } from './fourandfour/mf5/mf5.component';
import { Mf6Component } from './fourandfour/mf6/mf6.component';
import { Mf7Component } from './fourandfour/mf7/mf7.component';
import { Mf8Component } from './fourandfour/mf8/mf8.component';
import { Mf9Component } from './fourandfour/mf9/mf9.component';
import { Mf10Component } from './fourandfour/mf10/mf10.component';
import { Mf11Component } from './fourandfour/mf11/mf11.component';
import { Mf12Component } from './fourandfour/mf12/mf12.component';
import { Mf13Component } from './fourandfour/mf13/mf13.component';
import { Mf14Component } from './fourandfour/mf14/mf14.component';
import { Mf15Component } from './fourandfour/mf15/mf15.component';
import { Mf16Component } from './fourandfour/mf16/mf16.component';
import { Mf17Component } from './fourandfour/mf17/mf17.component';
import { Mf18Component } from './fourandfour/mf18/mf18.component';
import { Mf19Component } from './fourandfour/mf19/mf19.component';
import { Mf20Component } from './fourandfour/mf20/mf20.component';
import { Mf21Component } from './fourandfour/mf21/mf21.component';
import { Mf22Component } from './fourandfour/mf22/mf22.component';
import { Mf23Component } from './fourandfour/mf23/mf23.component';
import { Mf24Component } from './fourandfour/mf24/mf24.component';
import { Nw1Component } from './network/nw1/nw1.component';
import { Nw2Component } from './network/nw2/nw2.component';
import { Nw2s1Component } from './network/nw2s1/nw2s1.component';
import { Nw3Component } from './network/nw3/nw3.component';
import { Nw4Component } from './network/nw4/nw4.component';
import { Nw5Component } from './network/nw5/nw5.component';
import { Nw6Component } from './network/nw6/nw6.component';
import { Nw5s1Component } from './network/nw5s1/nw5s1.component';
import { Nw5s2Component } from './network/nw5s2/nw5s2.component';
import { Nw5s3Component } from './network/nw5s3/nw5s3.component';
import { AuthGuard } from 'app/pages/auth-guard';
import { LoginComponent } from 'app/pages/login/login.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'bigdatabase',
    component: BigdatabaseComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'bigdatabasenew',
    component: BigdatabasenewComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'bigdatabasenewV2',
    component: BigdatabasenewV2Component,
    canActivate: [AuthGuard],
  }, {
    path: 'homepage',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'dataroam',
    component: DataroamComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'login',
    component: LoginComponent,
  }, {
    path: '',
    component: BigdatabasenewComponent,
    canActivate: [AuthGuard],
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
