import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nw1Component } from './nw1/nw1.component';
import { Nw2Component } from './nw2/nw2.component';
import { Nw2s1Component } from './nw2s1/nw2s1.component';
import { Nw3Component } from './nw3/nw3.component';
import { Nw4Component } from './nw4/nw4.component';
import { Nw5Component } from './nw5/nw5.component';
import { Nw6Component } from './nw6/nw6.component';
import { Nw5s1Component } from './nw5s1/nw5s1.component';
import { Nw5s2Component } from './nw5s2/nw5s2.component';
import { Nw5s3Component } from './nw5s3/nw5s3.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';
import { DoNetworkMoudle } from '../../shared/do-network/do-network.moudle';
import { DialogModule, InputTextModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [DoEChartsModule, DoFrameModule, DoNetworkMoudle, CommonModule,
     DialogModule, FormsModule, InputTextModule],
  declarations: [
    Nw1Component,
    Nw2Component,
    Nw2s1Component,
    Nw3Component,
    Nw4Component,
    Nw5Component,
    Nw6Component,
    Nw5s1Component,
    Nw5s2Component,
    Nw5s3Component,
  ],
})
export class NetworkModule { }
