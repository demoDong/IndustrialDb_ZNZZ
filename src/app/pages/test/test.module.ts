import { NgModule } from '@angular/core';

import { TestComponent } from './test.component';
import { DoContainerModule } from '../../shared/do-container/do-container.module';

@NgModule({
  imports: [
    DoContainerModule,
  ],
  declarations: [TestComponent],
})
export class TestModule { }
