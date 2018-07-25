import { RouteCacheService } from './route-cache.service';
import { DoTreeService } from './do-tree.service';
import { NgModule } from '@angular/core';

import { HttpApi } from './http-api.service';
import { DoFrameService } from './do-frame.service';
import { DoDatatransService } from './do-datatrans.service';

const services = [
    HttpApi,
    DoFrameService,
    DoDatatransService,
    DoTreeService,
    RouteCacheService,
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [...services],
})
export class DoServiceModule { }
