import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule, CheckboxModule, MultiSelectModule, InputTextModule,
  TabViewModule, PanelModule, ButtonModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { BigdatabaseComponent } from './bigdatabase.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoContainerModule } from '../../shared/do-container/do-container.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';
import { BigdatabaseChartService } from './bigdatabase-chart.service';
import { BigdatabaseTableService } from './bigdatabase-table.service';
import { BigdatabaseDbsrcService } from './bigdatabase-dbsrc.service';
import { BigdatabaseDataService } from './bigdatabase-data.service';

const services = [
  BigdatabaseChartService,
  BigdatabaseTableService,
  BigdatabaseDbsrcService,
  BigdatabaseDataService,
];

@NgModule({
  imports: [CommonModule, DoEChartsModule, DoContainerModule, DoFrameModule, FormsModule,
    TreeModule, ButtonModule, InputTextModule, CheckboxModule, DropdownModule, MultiSelectModule,
     DataTableModule, SharedModule, TabViewModule, PanelModule],
  declarations: [
    BigdatabaseComponent,
  ],
  providers: [...services],
})
export class BigdatabaseModule { }
