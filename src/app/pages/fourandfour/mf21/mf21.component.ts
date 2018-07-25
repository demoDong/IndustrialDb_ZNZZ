import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf21',
    templateUrl: 'mf21.component.html',
    styleUrls: ['mf21.component.scss'],
})

export class Mf21Component implements OnInit {
    theme = 'echart-theme';
    title: string = '新一代信息技术（手机）';
    showTitle = true;
    nameMap = 'china';
    showEcharts = true;
    leftTop: any;
    rightTopMap: any;
    rightTopBar: any;
    rightTopPie: any;
    leftBottom: any;
    timeObj: any;
    timeLineData: any;
    ajaxIndex = 0;

    timeObjMap: any;
    timeLineDataMap: any;
    ajaxIndexMap = 0;

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.leftTop = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '20%',
                top: '5%',
                containLabel: true,
            },
            legend: {
                show: true,
                data: ['国产手机占比(%)', '国产芯片占比(%)', '国产操作系统占比(%)'],
                bottom: '10%',
                left: 'center',
                textStyle: {
                    color: '#fff',
                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
                    axisTick: {
                        alignWithLabel: true,
                        show: true,
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                        },
                    },
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
            yAxis: [
                {
                    type: 'value',
                    nane: '',
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                        },
                    },
                },
            ],
            series: [
                {
                    yAxisIndex: 0,
                    name: '国产手机占比(%)',
                    type: 'line',
                    barWidth: '40%',
                    data: [5, 10, 12, 15, 18, 19, 20, 23, 45],
                },
                {
                    yAxisIndex: 0,
                    name: '国产芯片占比(%)',
                    type: 'line',
                    barWidth: '40%',
                    data: [15, 27, 16, 45, 17, 46, 25, 17, 26],
                },
                {
                    yAxisIndex: 0,
                    name: '国产操作系统占比(%)',
                    type: 'line',
                    barWidth: '40%',
                    data: [9, 17, 26, 35, 37, 24, 30, 27, 46],
                },
            ],
        };
        this.http.get<ResponseType>('/api/901/all')
            .subscribe(
            data => {
                this.timeObj = {};
                this.timeLineData = [];
                for (const iterator of data.result) {
                    if (this.timeObj[iterator.data_time] === undefined) {
                        this.timeObj[iterator.data_time] = [];
                        this.timeLineData.push(iterator.data_time);
                    }
                }
                // tslint:disable-next-line:forin
                for (const iterator in this.timeObj) {
                    this.http.get<ResponseType>('/api/901/query?params=data_time:E:' + iterator)
                        .subscribe(
                        data1 => {
                            this.timeObj[iterator] = this.transService.onObjArray(data1.result, '', 'ec3-line');
                            this.ajaxIndex++;
                            this.creatLine();
                        });
                }
            },
        );
        this.http.get<ResponseType>('/api/496/query?params=area:E:广东省')
            .subscribe(
            data1 => {
                const data = this.transService.onObjArray(data1.result, '', 'ec3-line');
                this.rightTopBar = {
                    title: {
                        text: '2016广东省手机出货量',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            },
                        },
                    },
                    grid: {
                        bottom: '10%',
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: data[2],
                            axisLabel: {
                                interval: '0',
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '（单位：万部）',
                            axisLabel: {
                                formatter: '{value}',
                            },
                        },
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            data: data[1],
                            label: {
                                normal: {
                                    show: true,
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/502/query?params=year:E:2016')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.rightTopPie = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c} ({d}%)',
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '70%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'inner',
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold',
                                    },
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 20,
                                    length2: 15,
                                },
                            },
                            data: result,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/302/all')
            .subscribe(
            data => {
                this.timeObjMap = {};
                this.timeLineDataMap = [];
                for (const iterator of data.result) {
                    if (this.timeObjMap[iterator.Year] === undefined) {
                        this.timeObjMap[iterator.Year] = [];
                        this.timeLineDataMap.push(iterator.Year);
                    }
                }
                // tslint:disable-next-line:forin
                for (const iterator in this.timeObjMap) {
                    this.http.get<ResponseType>('/api/302/query?params=Year:E:' + iterator)
                        .subscribe(
                        data1 => {
                            this.timeObjMap[iterator] = this.transService.onObjArray(data1.result, '', 'ec3-visualMap');
                            this.ajaxIndexMap++;
                            this.creatMap();
                        });
                    this.http.get<ResponseType>('/api/301/query?params=year:E:' + iterator)
                        .subscribe(
                        data2 => {
                            const name2 = iterator + 'dadian';
                            this.timeObjMap[name2] = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');
                            this.ajaxIndexMap++;
                            this.creatMap();
                        });
                }
            },
        );
    }
    creatLine() {
        if (this.ajaxIndex > (this.timeLineData.length - 1)) {
            const seriesData = [];
            // tslint:disable-next-line:forin
            for (const key of this.timeLineData) {
                const barData = [];
                const barData2 = [];
                for (const i in this.timeObj[key][2]) {
                    if (this.timeObj[key][2][i] === '0') {
                        barData.push(this.timeObj[key][3][i]);
                        barData2.push('');
                    } else {
                        barData.push('');
                        barData2.push(this.timeObj[key][3][i]);
                    }
                }
                seriesData.push({
                    xAxis: {
                        data: this.timeObj[key][1],
                    },
                    series: [
                        {
                            data: barData,
                        },
                        {
                            data: barData2,
                        },
                    ],
                });
            }
            this.leftBottom = {
                baseOption: {
                    timeline: {
                        currentIndex: this.timeLineData.length - 1,
                        data: this.timeLineData,
                        bottom: '10',
                        left: '0%',
                    },
                    tooltip: { trigger: 'axis' },
                    textStyle: {
                        color: 'white',
                    },
                    legend: {
                        show: true,
                        data: ['国外品牌', '国内品牌'],
                        bottom: '14%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '20%',
                        containLabel: true,
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            rotate: 30,
                        },
                        data: [],
                    },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        name: '(单位：万部)',
                    },
                    series: [{
                        name: '国外品牌',
                        type: 'bar',
                        barGap: '-100%',
                        data: [],
                    },
                    {
                        name: '国内品牌',
                        type: 'bar',
                        barGap: '-100%',
                        data: [],
                    }],
                },
                options: seriesData,
            };
        }
    }
    creatMap() {
        if (this.ajaxIndexMap > (this.timeLineDataMap.length * 2 - 1)) {
            const seriesData = [];
            // tslint:disable-next-line:forin
            for (const key of this.timeLineDataMap) {
                const name2 = key + 'dadian';
                seriesData.push({
                    series: [
                        {
                            data: this.timeObjMap[name2],
                        },
                        {
                            data: this.timeObjMap[key],
                        },
                    ],
                });
            }
            this.rightTopMap = {
                baseOption: {
                    timeline: {
                        currentIndex: this.timeLineDataMap.length - 1,
                        data: this.timeLineDataMap,
                        bottom: '10',
                    },
                    visualMap: {
                        max: 1000,
                        orient: 'vertical',
                        left: '5',
                        bottom: '20',
                        textStyle: {
                            color: '#fff',
                        },
                        seriesIndex: [1],
                        calculable: true,
                    },
                    tooltip: {
                        formatter: '{b}: {c}',
                    },
                    geo: {
                        map: 'china',
                        roam: true,
                        top: 40,
                        label: {
                            normal: {
                                show: true,

                            },
                        },
                    },
                    series: [
                        {
                            name: '',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            animation: false,
                            symbolSize: 10,
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 7,

                            },
                            itemStyle: {
                                normal: {
                                    color: '#B22A26',
                                },
                            },
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false,
                                },
                            },
                            tooltip: {
                                padding: 10,
                                backgroundColor: '#222',
                                borderColor: '#777',
                                borderWidth: 1,
                                formatter: function (obj) {
                                    const value = obj.value;
                                    return value[3];
                                },
                            },
                            data: [],

                        }, {
                            type: 'map',
                            geoIndex: 0,
                            data: [],
                        },
                    ],
                },
                options: seriesData,
            };
        }
    }
}
