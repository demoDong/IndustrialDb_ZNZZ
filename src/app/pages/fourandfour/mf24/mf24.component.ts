import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf24',
    templateUrl: 'mf24.component.html',
    styleUrls: ['mf24.component.scss'],
})

export class Mf24Component implements OnInit {
    theme = 'echart-theme';
    title: string = '全国工业增长趋势';
    showTitle = true;
    nameMap = 'china';
    trendLine: any;
    growthMap: any;
    indexLine: any;
    growBarh: any;
    growBarl: any;
    showEcharts = true;
    tabItems = ['2015', '2016', '2017'];

    option_barLine: any;
    option_map: any;
    option_line: any;
    option_bar: any;
    chartTheme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20001/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                // this.trendLine = {
                //     tooltip: { trigger: 'axis' },
                //     textStyle: {
                //         color: 'white',
                //     },
                //     legend: {
                //         orient: 'vertical',
                //         bottom: '18%',
                //         data: ['工业增加值增速'],
                //         textStyle: {
                //             color: 'white',
                //         },
                //     },
                //     grid: {
                //         left: '3%', top: 40,
                //         right: '4%', bottom: '25%',
                //         containLabel: true,
                //     },
                //     dataZoom: [
                //         {
                //             show: true,
                //             realtime: true,
                //             start: 80,
                //             end: 100,
                //             height: 20,
                //             textStyle: {
                //                 color: '#fff',
                //             },
                //         },
                //     ],
                //     xAxis: {
                //         type: 'category',
                //         axisLabel: {
                //             rotate: 30,
                //         },
                //         data: result[0],
                //     },
                //     yAxis: {
                //         type: 'value',
                //         scale: true,
                //         axisTick: {
                //             show: false,
                //         },
                //         name: '(单位：%)',
                //     },
                //     series: [{
                //         name: '工业增加值增速',
                //         type: 'line',
                //         data: result[1],
                //     },
                //     ],
                // };
            },
        );
        this.http.get<ResponseType>('/api/20234/all')
            .subscribe(
            data => {
                const visual = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                this.http.get<ResponseType>('/api/20235/all')
                    .subscribe(
                    data1 => {
                        const scatter = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        this.growthMap = {
                            tooltip: {
                                show: true,
                                formatter: function (params) {
                                    console.log(params);
                                    return params.data[2];
                                },
                                trigger: 'item',
                            },
                            // visualMap: {
                            //     min: 0, max: 100, calculable: true,
                            //     seriesIndex: 0,
                            //     textGap: 20,
                            //     orient: 'horizontal',
                            //     bottom: '6%',
                            //     // inRange: {
                            //     //     color: [
                            //     //         '#f15faff',
                            //     //         '#017df6',
                            //     //     ],
                            //     // },
                            //     textStyle: {
                            //         color: 'white',
                            //     },
                            // },
                            legend: {
                                orient: 'vertical',
                                bottom: '28%',
                                left: '3%',
                                data: ['智能制造试点示范项目', '智能制造专项'],
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 16,
                                },
                            },
                            geo: {
                                map: 'china',
                                roam: false,
                                top: '10%',
                                zoom: 1.2,
                                layoutCenter: ['50%', '50%'],
                                label: {
                                    emphasis: {
                                        show: false,
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        // areaColor: 'transparent',
                                        // borderColor: '#818181',
                                        borderWidth: 1.5,
                                    },
                                    emphasis: {
                                        // areaColor: 'transparent',
                                        // borderColor: '#818181',
                                        borderWidth: 1.5,
                                    },
                                },
                            },
                            series: [{
                                type: 'scatter',
                                name: '智能制造试点示范项目',
                                geoIndex: 0,
                                coordinateSystem: 'geo',
                                itemStyle: {
                                    normal: {
                                        color: '#296FDD',
                                    },
                                },
                                data: visual,
                            },
                            {
                                type: 'scatter',
                                name: '智能制造专项',
                                coordinateSystem: 'geo',
                                // label: {
                                //     normal: {
                                //         show: true,
                                //         formatter: function (params) {
                                //             console.log(params);
                                //             return params.data1[2];
                                //         },
                                //     },
                                // },
                                itemStyle: {
                                    normal: {
                                        color: '#e33f2e',
                                    },
                                },
                                data: scatter,
                            }],
                        };
                    },
                );
            },
        );
        this.http.get<ResponseType>('/api/20024/all')
            .subscribe(
            dataleft => {
                const data = this.transService.onObjArray(dataleft.result, '', 'ec3-line');
                // this.indexLine = {
                //     title: {
                //         text: '',
                //         x: 'center',
                //         top: '17%',
                //         textStyle: {
                //             color: '#fff',
                //         },
                //     },
                //     tooltip: {
                //         trigger: 'axis',
                //     },
                //     legend: {
                //         right: '10%',
                //         bottom: '12%',
                //         orient:  'horizontal',
                //         data: [
                //             '固定资产投资完成额累计增速',
                //             '社会消费品零售总额当月增速',
                //             '出口当月增速',
                //         ],

                //     },
                //     grid: {
                //         bottom: '33%',
                //         top: '10%',
                //         right: 20,
                //     },
                //     xAxis: {
                //         type: 'category',
                //         data: data[
                //             4
                //         ],
                //     },
                //     dataZoom: [
                //         {
                //             show: true,
                //             realtime: true,
                //             start: 80,
                //             end: 100,
                //             height: 20,
                //             textStyle: {
                //                 color: '#fff',
                //             },
                //         },
                //     ],
                //     yAxis: {
                //         type: 'value',
                //         name: '单位（%）',
                //     },
                //     series: [
                //         {
                //             name: '固定资产投资完成额累计增速',
                //             type: 'line',
                //             label: {
                //                 normal: {
                //                     show: false,
                //                 },
                //             },
                //             data: data[
                //                 3
                //             ],
                //         },
                //         {
                //             name: '社会消费品零售总额当月增速',
                //             type: 'line',
                //             label: {
                //                 normal: {
                //                     show: false,
                //                 },
                //             },
                //             data: data[
                //                 2
                //             ],
                //         },
                //         {
                //             name: '出口当月增速',
                //             type: 'line',
                //             label: {
                //                 normal: {
                //                     show: false,
                //                 },
                //             },
                //             data: data[
                //                 0
                //             ],
                //         },
                //     ],
                // };
            },
        );
        this.http.get<ResponseType>('/api/20004/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                // this.growBarh = {
                //     title: {
                //         text: '前十',
                //         left: 'center',
                //         top: '10%',
                //         textStyle: {
                //             color: 'white',
                //         },
                //     },
                //     tooltip: {
                //         trigger: 'axis',
                //         axisPointer: {
                //             type: 'shadow',
                //         },
                //     },
                //     grid: {
                //         left: '3%',
                //         right: '4%',
                //         bottom: '5%',
                //         containLabel: true,
                //     },
                //     xAxis: {
                //         show: false,
                //         type: 'value',
                //         axisLine: { show: false },
                //         splitLine: { show: false },
                //     },
                //     yAxis: {
                //         type: 'category',
                //         axisLine: { show: false },
                //         splitLine: { show: false },
                //         data: result[1],
                //         axisLabel: {
                //             color: 'white',
                //             rotate: 0,
                //         },
                //     },
                //     series: [
                //         {
                //             type: 'bar',
                //             data: result[0],
                //         },
                //     ],
                // };
            },
        );
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                break;
            case 1:

                break;
            case 2:

                break;

            default:
                break;
        }

    }
}
