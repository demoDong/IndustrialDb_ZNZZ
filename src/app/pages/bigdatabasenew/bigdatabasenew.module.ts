import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TreeModule, CheckboxModule, MultiSelectModule, InputTextModule,
  TabViewModule, PanelModule, ButtonModule, SliderModule,
} from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { BigdatabasenewComponent } from './bigdatabasenew.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoContainerModule } from '../../shared/do-container/do-container.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';
import { ListboxModule } from 'primeng/components/listbox/listbox';
import { BigdatabasenewTableService } from './bigdatabasenewservice/bigdatabasenew-table.service';
import { BigdatabasenewDataService } from './bigdatabasenewservice/bigdatabasenew-data.service';

const services = [
  BigdatabasenewTableService,
  BigdatabasenewDataService,
];

@NgModule({
  imports: [CommonModule, DoEChartsModule, DoContainerModule, DoFrameModule, FormsModule,
    TreeModule, ButtonModule, InputTextModule, CheckboxModule, DropdownModule, MultiSelectModule,
    DataTableModule, SharedModule, TabViewModule, PanelModule, ListboxModule, SliderModule],
  declarations: [
    BigdatabasenewComponent,
  ],
  providers: [...services],
})
export class BigdatabasenewModule { }
