import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf22',
    templateUrl: 'mf22.component.html',
    styleUrls: ['mf22.component.scss'],
})

export class Mf22Component implements OnInit {
    theme = 'echart-theme';
    title: string = '全国工业增长趋势';
    showTitle = true;
    nameMap = 'china';
    leftTop: any;
    rightTop: any;
    leftBottom: any;
    showEcharts = true;
    optionLeft: any;
    optionRight: any;

    timeObj: any;
    ajaxIndex = 0;
    timeLineData: any;
    tabItemsList = ['设计业', '制造业', '封测业'];

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/1001/all')
            .subscribe(
            data1 => {
                const data = this.transService.onObjArray(data1.result, '', 'ec3-line');
                this.leftTop = {
                    title: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            },
                        },
                    },
                    legend: {
                        bottom: '0%',
                        right: '10%',
                        orient: 'horizontal',
                        data: [
                            '设计业销售额',
                            '制造业销售额',
                            '封测业销售额',
                            '设计业销售额增长率',
                            '制造业销售额增长率',
                            '封测业销售额增长率',
                        ],
                    },
                    grid: {
                        bottom: '24%',
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: data[3],
                            axisLabel: {
                                interval: '0',
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '（单位：亿元）',
                            axisLabel: {
                                formatter: '{value}',
                            },
                        },
                        {
                            type: 'value',
                            name: '（单位：%）',
                            axisLabel: {
                                formatter: '{value}',
                            },
                        },
                    ],
                    series: [
                        {
                            name: '设计业销售额',
                            type: 'bar',
                            data: data[4],
                            label: {
                                normal: {
                                    show: true,
                                },
                            },
                        },
                        {
                            name: '制造业销售额',
                            type: 'bar',
                            data: data[6],
                            label: {
                                normal: {
                                    show: true,
                                },
                            },
                        },
                        {
                            name: '封测业销售额',
                            type: 'bar',
                            data: data[1],
                            label: {
                                normal: {
                                    show: true,
                                },
                            },
                        },
                        {
                            name: '设计业销售额增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: data[2],
                        },
                        {
                            name: '制造业销售额增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: data[5],
                        },
                        {
                            name: '封测业销售额增长率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: data[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/1005/all')
            .subscribe(
            data1 => {
                const data = this.transService.onObjArray(data1.result, '', 'ec3-line');
                this.leftBottom = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    title: {
                        text: '',
                    },
                    grid: {
                        bottom: '20%',
                    },
                    legend: {
                        data: [
                            '中国',
                            '全球',
                            '我国增速',
                        ],
                        orient: 'horizontal',
                        textStyle: {
                            color: '#9B9B9B',

                        },
                        bottom: '2%',
                        right: '10%',
                    },
                    xAxis: {
                        type: 'category',
                        data: data[
                            1
                        ],
                        axisLabel: {
                            normal: {
                                interval: '0',

                            },
                        },
                    },
                    yAxis: [
                        {
                            name: '单位（万片/月）',
                        },
                        {
                            name: '单位（%）',
                        },
                    ],
                    series: [
                        {
                            name: '中国',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,

                                },

                            },
                            data: data[2],
                        },
                        {
                            name: '全球',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,

                                },

                            },
                            data: data[0],
                        },
                        {
                            name: '我国增速',
                            type: 'line',
                            yAxisIndex: 1,
                            label: {
                                normal: {
                                    show: true,

                                },

                            },
                            data: data[3],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/956/all')
            .subscribe(
            data => {
                this.timeObj = {};
                this.timeLineData = [];
                for (const iterator of data.result) {
                    if (this.timeObj[iterator.stats_period] === undefined) {
                        this.timeObj[iterator.stats_period] = [];
                        this.timeLineData.push(iterator.stats_period);
                    }
                }
                // tslint:disable-next-line:forin
                for (const iterator in this.timeObj) {
                    this.http.get<ResponseType>('/api/956/query?params=stats_period:E:' + iterator)
                        .subscribe(
                        data1 => {
                            this.timeObj[iterator] = this.transService.onObjArray(data1.result, '', 'ec3-visualMap');
                            this.ajaxIndex++;
                            this.creatMap();
                        });
                    this.http.get<ResponseType>('api/695/query?params=stats_period:e:' + iterator + ';type:e:0')
                        .subscribe(
                        data2 => {
                            const name2 = iterator + 'xianyou';
                            this.timeObj[name2] = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');
                            this.ajaxIndex++;
                            this.creatMap();
                        });
                    this.http.get<ResponseType>('api/695/query?params=stats_period:e:' + iterator + ';type:e:1')
                        .subscribe(
                        data3 => {
                            const name3 = iterator + 'zaijian';
                            this.timeObj[name3] = this.transService.onObjArray(data3.result, '', 'ec3-scatterMap');
                            this.ajaxIndex++;
                            this.creatMap();
                        });
                }
            },
        );
        this.btnGroupClicked(0);
    }

    creatMap() {
        if (this.ajaxIndex > 11) {
            const seriesData = [];
            // tslint:disable-next-line:forin
            for (const key of this.timeLineData) {
                const name2 = key + 'xianyou';
                const name3 = key + 'zaijian';
                seriesData.push({
                    series: [
                        {
                            data: this.timeObj[name2],
                        },
                        {
                            data: this.timeObj[name3],
                        },
                        {
                            data: this.timeObj[key],
                        },
                    ],
                });
            }
            console.log(seriesData);
            this.rightTop = {
                baseOption: {
                    timeline: {
                        currentIndex: this.timeLineData.length - 1,
                        data: this.timeLineData,
                        bottom: '10',
                    },
                    visualMap: {
                        max: 50,
                        orient: 'horizontal',
                        left: '5',
                        bottom: '60',
                        textStyle: {
                            color: '#fff',
                        },
                        seriesIndex: [2],
                        calculable: true,
                    },
                    legend: {
                        orient: 'vertical',
                        data: ['现有晶圆厂', '在建/规划晶圆厂'],
                        top: 'middle',
                        right: '10%',
                    },
                    tooltip: {
                        formatter: '{b}: {c}',
                    },
                    geo: {
                        map: 'china',
                        roam: true,
                        top: 0,
                        label: {
                            normal: {
                                show: true,

                            },
                        },
                    },
                    series: [
                        {
                            name: '现有晶圆厂',
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
                                    return value[2];
                                },
                            },
                            data: [],

                        }, {
                            name: '在建/规划晶圆厂',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            animation: false,
                            symbol: 'pin',
                            symbolSize: 15,
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 7,

                            },
                            itemStyle: {
                                normal: {
                                    color: '#06b42f',
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
                                    return value[2];
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


    btnGroupClicked(index) {
        switch (index) {
            case 0:
               this.getOption(22009, 22010);
               break;
            case 1:
               this.getOption(22011, 22012);
               break;
            case 2:
               this.getOption(22013, 22014);
               break;
            default:
               break;
        }

    }

    getOption(urlNum1, urlNum2) {
        this.http.get<ResponseType>('/api/' + urlNum1 + '/all')
        .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.optionLeft = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '26%',
                        bottom: '14%',
                        containLabel: true,
                    },
                    xAxis: {
                        name: '（单位：万辆）',
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        position: 'top',
                    },
                    yAxis: {
                        type: 'category',
                        data: result[0],
                    },
                    series: [
                        {
                            type: 'bar',
                            data: result[1],
                        },
                    ],
                };
            },
        );

        this.http.get<ResponseType>('/api/' + urlNum2 + '/all')
        .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.optionRight = {
                    // title: {
                    //     text: '2016年乘用车前10企业市场占',
                    //     bottom: '4%',
                    //     left: 'center',
                    // },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    series: [
                        {
                            type: 'pie',
                            center: ['50%', '50%'],
                            radius: ['35%', '55%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside',
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold',
                                    },
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                },
                            },
                            data: result,
                        },
                    ],
                };
            },
        );
    }
}
