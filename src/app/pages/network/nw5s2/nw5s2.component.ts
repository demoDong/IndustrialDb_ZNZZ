import { ActivatedRoute, Router } from '@angular/router';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';

@Component({
    selector: 'do-example-nw5s2',
    templateUrl: 'nw5s2.component.html',
    styleUrls: ['nw5s2.component.scss'],
})


export class Nw5s2Component implements OnInit {

    title: 'nw5s2';

    lineLeftUp: any;
    lineRightUp: any;
    lineLeftDown: any;
    lineRightDown: any;
    theme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20070/query?params=type:E:产能规模')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.http.get<ResponseType>('/api/20070/query?params=type:E:全球占比')
                    .subscribe(
                    data1 => {
                        const result1 = this.transService.onObjArray(data1.result, '', 'ec3-line');
                        this.lineLeftUp = {
                            title: {
                                textStyle: {
                                    color: '#64A5E1',
                                    fontSize: 20,
                                },
                            },
                            legend: {
                                show: true,
                                data: ['产能规模', '全球占比'],
                                bottom: '5%',
                                right: '4%',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '15%',
                                top: '15%',
                                containLabel: true,
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[0],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#296FDE',
                                        },
                                    },
                                    axisTick: {
                                        alignWithLabel: true,
                                    },
                                    axisLabel: {
                                        //  interval: 0,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                },
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                                {
                                    type: 'value',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                },
                            ],
                            series: [
                                {
                                    yAxisIndex: 0,
                                    name: '产能规模',
                                    type: 'bar',
                                    barWidth: '40%',
                                    data: result[2],
                                },
                                {
                                    yAxisIndex: 1,
                                    name: '全球占比',
                                    type: 'line',
                                    data: result1[2],
                                },
                            ],
                        };
                    },
                );
            },
        );
        this.http.get<ResponseType>('/api/20071/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineRightUp = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['京东', 'LG', '三星群创', '友达', '华星光电',
                            '中电集团', '夏普', '惠科', '天马'],
                        orient: 'vertical',
                        top: 'center',
                        left: 'right',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        top: '15%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[0],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '京东',
                            type: 'line',
                            data: result[1],
                        },
                        {
                            name: 'LG',
                            type: 'line',
                            data: result[2],
                        },
                        {
                            name: '三星',
                            type: 'line',
                            data: result[3],
                        },
                        {
                            name: '群创',
                            type: 'line',
                            data: result[4],
                        },
                        {
                            name: '华星光电',
                            type: 'line',
                            data: result[5],
                        },
                        {
                            name: '友达',
                            type: 'line',
                            data: result[6],
                        },
                        {
                            name: '中电集团',
                            type: 'line',
                            data: result[7],
                        },
                        {
                            name: '夏普',
                            type: 'line',
                            data: result[8],
                        },
                        {
                            name: '惠科',
                            type: 'line',
                            data: result[9],
                        },
                        {
                            name: '天马',
                            type: 'line',
                            data: result[10],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20072/query?params=type:E:产能规模')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.http.get<ResponseType>('/api/20072/query?params=type:E:全球占比')
                    .subscribe(
                    data1 => {
                        const result1 = this.transService.onObjArray(data1.result, '', 'ec3-line');
                        this.lineLeftDown = {
                            title: {
                                textStyle: {
                                    color: '#64A5E1',
                                    fontSize: 20,
                                },
                            },
                            legend: {
                                show: true,
                                data: ['产能规模', '全球占比'],
                                bottom: '5%',
                                right: '4%',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '15%',
                                top: '15%',
                                containLabel: true,
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[0],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#296FDE',
                                        },
                                    },
                                    axisTick: {
                                        alignWithLabel: true,
                                    },
                                    axisLabel: {
                                        //  interval: 0,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                },
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                                {
                                    type: 'value',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                },
                            ],
                            series: [
                                {
                                    yAxisIndex: 0,
                                    name: '产能规模',
                                    type: 'bar',
                                    barWidth: '40%',
                                    data: result[2],
                                },
                                {
                                    yAxisIndex: 1,
                                    name: '全球占比',
                                    type: 'line',
                                    data: result1[2],
                                },
                            ],
                        };
                    },
                );
            },
        );
        this.http.get<ResponseType>('/api/20073/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineRightDown = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['Oxide', 'AMOLED', 'LTPS', 'a-Si'],
                        bottom: '5%',
                        right: '4%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        top: '15%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[0],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: 'Oxide',
                            type: 'line',
                            data: result[1],
                        },
                        {
                            name: 'AMOLED',
                            type: 'line',
                            data: result[2],
                        },
                        {
                            name: 'LTPS',
                            type: 'line',
                            data: result[3],
                        },
                        {
                            name: 'a-Si',
                            type: 'line',
                            data: result[4],
                        },
                    ],
                };
            },
        );
    }
    JumpGroupClicked(event) {}
}
