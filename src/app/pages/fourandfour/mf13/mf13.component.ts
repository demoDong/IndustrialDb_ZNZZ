import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf13',
    templateUrl: 'mf13.component.html',
    styleUrls: ['mf13.component.scss'],
})

export class Mf13Component implements OnInit {
    theme = 'echart-theme';
    title: string = '全国工业增长趋势';
    showTitle = true;
    nameMap = 'china';
    trendLine: any;
    growthMap: any;
    indexLine: any;
    growBarh: any;

    showEcharts = true;


    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20029/query?params=name:E:七星关区海宁扣板厂')
            .subscribe(
            data => {
                const visualOne = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.trendLine = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        bottom: '15%',
                        data: ['ERP软件市场规模', '增长速度'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '25%',
                        containLabel: true,
                    },
                    textStyle: {
                        color: '#FCFCFC',
                    },

                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                        },
                        data: visualOne[4],
                    },
                    yAxis: [{
                        type: 'value',
                        name: '(单位：亿元)',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                        },
                        axisLabel: {
                            rotate: 0,
                            show: true,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    {
                        type: 'value',
                        name: '(单位：%)',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                    },
                    ],
                    series: [{
                        name: 'ERP软件市场规模',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                            },
                        },
                        yAxisIndex: 1,
                        data: visualOne[2],
                    },
                    {
                        name: '增长速度',
                        yAxisIndex: 0,
                        type: 'line',
                        data: visualOne[1],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20029/query?params=name:E:七星关区海宁扣板厂')
            .subscribe(
            data => {
                const visualOne = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.growthMap = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        bottom: '15%',
                        data: ['ERP软件市场规模', '增长速度'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '25%',
                        containLabel: true,
                    },
                    textStyle: {
                        color: '#FCFCFC',
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                        },
                        data: visualOne[4],
                    },
                    yAxis: [{
                        type: 'value',
                        name: '(单位：亿元)',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                        },
                        axisLabel: {
                            rotate: 0,
                            show: true,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    {
                        type: 'value',
                        name: '(单位：%)',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                    },
                    ],
                    series: [{
                        name: 'ERP软件市场规模',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                            },
                        },
                        yAxisIndex: 1,
                        data: visualOne[2],
                    },
                    {
                        name: '增长速度',
                        yAxisIndex: 0,
                        type: 'line',
                        data: visualOne[1],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20029/query?params=name:E:七星关区海宁扣板厂')
            .subscribe(
            data => {
                const visualOne = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.indexLine = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        bottom: '15%',
                        data: ['ERP软件市场规模', '增长速度'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '25%',
                        containLabel: true,
                    },
                    textStyle: {
                        color: '#FCFCFC',
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                        },
                        data: visualOne[4],
                    },
                    yAxis: [{
                        type: 'value',
                        name: '(单位：亿元)',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                        },
                        axisLabel: {
                            rotate: 0,
                            show: true,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    {
                        type: 'value',
                        name: '(单位：%)',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                    },
                    ],
                    series: [{
                        name: 'ERP软件市场规模',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                            },
                        },
                        yAxisIndex: 1,
                        data: visualOne[2],
                    },
                    {
                        name: '增长速度',
                        yAxisIndex: 0,
                        type: 'line',
                        data: visualOne[1],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20029/query?params=name:E:七星关区海宁扣板厂')
            .subscribe(
            data => {
                const visualOne = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.growBarh = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        bottom: '15%',
                        data: ['ERP软件市场规模', '增长速度'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '25%',
                        containLabel: true,
                    },
                    textStyle: {
                        color: '#FCFCFC',
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                        },
                        data: visualOne[4],
                    },
                    yAxis: [{
                        type: 'value',
                        name: '(单位：亿元)',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                        },
                        axisLabel: {
                            rotate: 0,
                            show: true,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    {
                        type: 'value',
                        name: '(单位：%)',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                    },
                    ],
                    series: [{
                        name: 'ERP软件市场规模',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                            },
                        },
                        yAxisIndex: 1,
                        data: visualOne[2],
                    },
                    {
                        name: '增长速度',
                        yAxisIndex: 0,
                        type: 'line',
                        data: visualOne[1],
                    },
                    ],
                };
            },
        );
    }
}
