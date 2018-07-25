import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule, CheckboxModule, MultiSelectModule, InputTextModule,
  TabViewModule, PanelModule, ButtonModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { BigdatabasenewV2Component } from './bigdatabasenew.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoContainerModule } from '../../shared/do-container/do-container.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';
import { BigdatabasenewChartService } from './bigdatabasenew-chart.service';
import { BigdatabasenewTableService } from './bigdatabasenew-table.service';
import { BigdatabasenewDbsrcService } from './bigdatabasenew-dbsrc.service';
import { BigdatabasenewDataService } from './bigdatabasenew-data.service';

const services = [
  BigdatabasenewChartService,
  BigdatabasenewTableService,
  BigdatabasenewDbsrcService,
  BigdatabasenewDataService,
];

@NgModule({
  imports: [CommonModule, DoEChartsModule, DoContainerModule, DoFrameModule, FormsModule,
    TreeModule, ButtonModule, InputTextModule, CheckboxModule, DropdownModule, MultiSelectModule,
     DataTableModule, SharedModule, TabViewModule, PanelModule],
  declarations: [
    BigdatabasenewV2Component,
  ],
  providers: [...services],
})
export class BigdatabasenewV2Module { }
