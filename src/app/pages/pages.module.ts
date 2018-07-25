import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DoEChartsModule } from '../shared/do-echarts/do-echarts.module';
import { HomePageComponent } from './homepage/homepage.component';
import { StrongCountryModule } from './strong-country/strong-country.module';
import { FourandforModule } from './fourandfour/fourandfour.module';
import { BigdatabaseModule } from './bigdatabase/bigdatabase.module';
import { BigdatabasenewModule } from './bigdatabasenew/bigdatabasenew.module';
import { BigdatabasenewV2Module } from './bigdatabasenewV2/bigdatabasenew.module';
import { DataroamModule } from './dataroam/dataroam.module';
import { NetworkModule } from './network/network.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { DoServiceModule } from 'app/shared/do-service/do-service.module';
import { DoExportExcelModule } from 'app/shared/do-exportexcel/do-exportexcel.module';
import { InputTextModule } from 'primeng/primeng';
import { LoginComponent } from 'app/pages/login/login.component';
import { AuthGuard } from 'app/pages/auth-guard';
import { DialogModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';

const PAGES_COMPONENTS = [
  PagesComponent,
  HomePageComponent,
  LoginComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    PagesRoutingModule,
    DoEChartsModule,
    StrongCountryModule,
    FourandforModule,
    BigdatabaseModule,
    BigdatabasenewModule,
    BigdatabasenewV2Module,
    DataroamModule,
    DoServiceModule,
    InputTextModule,
    NetworkModule,
    DoExportExcelModule,
    DialogModule,
    ButtonModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    AuthGuard,
  ],
})
export class PagesModule {
}
