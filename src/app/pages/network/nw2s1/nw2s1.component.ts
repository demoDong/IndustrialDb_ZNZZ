import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import * as echarts from 'echarts';
import { DataList } from 'primeng/primeng';


@Component({
    selector: 'do-example-nw2s1',
    templateUrl: 'nw2s1.component.html',
    styleUrls: ['nw2s1.component.scss'],
})


export class Nw2s1Component implements OnInit {

    title: 'nw2s1';
    theme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService) {
    }

    ngOnInit() {
    }
    btnGroupClicked(event) { }
}
