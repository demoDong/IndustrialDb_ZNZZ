import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf10',
    templateUrl: 'mf10.component.html',
    styleUrls: ['mf10.component.scss'],
})

export class Mf10Component implements OnInit {
    theme = 'echart-theme';
    title: string = '全国工业增长趋势';
    showTitle = true;
    trendLine: any;
    growthMap: any;
    indexLine: any;
    growBarh: any;
    visual: any;
    showEcharts = true;

    option_barLine: any;
    option_map: any;
    option_line: any;
    option_bar: any;
    chartTheme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20103/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.trendLine = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['新增节点数', '增速'],
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
                            data: result[2],
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
                            name: '(单位：千个)',
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
                            name: '(单位：%)',
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
                            name: '新增节点数',
                            type: 'bar',
                            barWidth: '50%',
                            data: result[1],
                        },
                        {
                            yAxisIndex: 1,
                            name: '增速',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20103/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.growthMap = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    // legend: {
                    //     show: true,
                    //     data: ['移动电话用户', '增速'],
                    //     bottom: '5%',
                    //     right: '4%',
                    //     textStyle: {
                    //         color: '#fff',
                    //     },
                    // },
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
                            data: result[2],
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
                            name: '(单位：亿美元)',
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
                            yAxisIndex: 0,
                            name: '移动电话用户',
                            type: 'bar',
                            barWidth: '50%',
                            data: result[1],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20103/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.indexLine = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['市场规模', '增速'],
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
                            data: result[2],
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
                            name: '(单位：亿元)',
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
                            name: '(单位：%)',
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
                            name: '市场规模',
                            type: 'bar',
                            barWidth: '50%',
                            data: result[1],
                        },
                        {
                            yAxisIndex: 1,
                            name: '增速',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20103/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.growBarh = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['市场规模', '增速'],
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
                            data: result[2],
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
                            name: '(单位：亿元)',
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
                            name: '(单位：%)',
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
                            name: '市场规模',
                            type: 'bar',
                            barWidth: '50%',
                            data: result[1],
                        },
                        {
                            yAxisIndex: 1,
                            name: '增速',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );

    }
}
