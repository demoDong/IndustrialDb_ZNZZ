import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { StrongCountryComponent } from './strong-country.component';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DoContainerModule } from '../../shared/do-container/do-container.module';
import { DoFrameModule } from '../../shared/do-frame/do-frame.module';

@NgModule({
  imports: [ThemeModule, DoEChartsModule, DoContainerModule, DoFrameModule],
  declarations: [
    StrongCountryComponent,
  ],
})
export class StrongCountryModule {}
