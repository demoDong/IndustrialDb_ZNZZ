import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';

@Component({
    selector: 'do-example-nw3',
    templateUrl: 'nw3.component.html',
    styleUrls: ['nw3.component.scss'],
})


export class Nw3Component implements OnInit {

    title: 'nw3';

    lineUp: any;
    mapUp = {};
    lineLeftDown: any;
    lineRightDown: any;
    tabItems = ['工业', '服务业', '农业'];
    theme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20222/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.lineUp = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '10%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        data: ['数字经济模块', '占GDP比重'],
                        bottom: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[2],
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                rotate: 30,
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
                                show: false,
                            },
                            axisLabel: {
                                rotate: 0,
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            yAxisIndex: 0,
                            name: '数字经济模块',
                            type: 'bar',
                            barWidth: '40%',
                            data: result[1],
                        },
                        {
                            yAxisIndex: 1,
                            name: '占GDP比重',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        // 十二月7号左下更改原版
        this.http.get<ResponseType>('/api/20100/query?params=value:e:1')
            .subscribe(
            // data0 => {
            //     const result = this.transService.onObjArray(data0.result, '', 'ec3-visualMap');
            //     this.http.get<ResponseType>('/api/20100/query?params=value:e:2')
            //         .subscribe(
            //         data1 => {
            //             const result1 = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
            //             this.http.get<ResponseType>('/api/20100/query?params=value:e:3')
            //                 .subscribe(
            //                 data2 => {
            //                     const result2 = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');

            //                     this.http.get<ResponseType>('/api/2000/all')
            //                         .subscribe(
            //                         data3 => {
            //                             const result3 = this.transService.onObjArray(data3.result, '', 'ec3-line');
            //                             this.mapUp = {
            //                                 color: 'blue',
            //                                 timeline: {
            //                                     data: [
            //                                         '2011', '2012', '2013', '2014', '2015', '2016', '2017',
            //                                     ],
            //                                     bottom: '10%',
            //                                     left: 0,
            //                                     width: '70%',
            //                                     axisType: 'category',
            //                                     show: true,
            //                                     autoPlay: true,
            //                                     playInterval: 3000,
            //                                 },
            //                                 options: [{
            //                                     title: {
            //                                         text: '全国电信普遍服务试点城市地图',
            //                                         left: '15%',
            //                                         top: '2%',
            //                                         textStyle: {
            //                                             color: 'white',
            //                                             fontSize: 16,
            //                                         },
            //                                     },
            //                                     grid: {
            //                                         left: '65%',
            //                                         width: '30%',
            //                                         height: '50%',
            //                                     },
            //                                     xAxis: {
            //                                         data: result3[2],
            //                                         axisLabel: {
            //                                             rotate: 30,
            //                                             interval: 0,
            //                                         },
            //                                     },
            //                                     yAxis: [
            //                                         {
            //                                             type: 'value',
            //                                             nane: '',
            //                                             axisLine: {
            //                                                 show: false,
            //                                                 lineStyle: {
            //                                                     color: '#fff',
            //                                                 },
            //                                             },
            //                                             splitLine: {
            //                                                 show: true,
            //                                             },
            //                                             axisLabel: {
            //                                                 show: true,
            //                                                 textStyle: {
            //                                                     color: '#fff',
            //                                                 },
            //                                             },
            //                                         },
            //                                     ],
            //                                     tooltip: { trigger: 'item' },
            //                                     legend: {
            //                                         orient: 'vertical',
            //                                         bottom: '28%',
            //                                         right: '3%',
            //                                         textStyle: {
            //                                             color: '#fff',
            //                                         },
            //                                     },
            //                                     geo: {
            //                                         map: 'china',
            //                                         roam: false,
            //                                         top: '-3%',
            //                                         left: '15%',
            //                                         zoom: 0.9,
            //                                         layoutCenter: ['50%', '50%'],
            //                                         label: {
            //                                             emphasis: {
            //                                                 show: false,
            //                                             },
            //                                         },
            //                                         itemStyle: {
            //                                             normal: {
            //                                                 borderWidth: 1.5,
            //                                             },
            //                                             emphasis: {
            //                                                 borderWidth: 1.5,
            //                                             },
            //                                         },
            //                                     },
            //                                     series: [
            //                                         {
            //                                             type: 'scatter',
            //                                             name: '2016年第一批电信普遍试点城市',
            //                                             coordinateSystem: 'geo',
            //                                             label: {
            //                                                 normal: { show: false },
            //                                                 emphasis: { show: true },
            //                                             },
            //                                             itemStyle: {
            //                                                 normal: {
            //                                                     color: '#296FDD',
            //                                                 },
            //                                             },
            //                                             data: result,
            //                                         },
            //                                         {
            //                                             name: '数字经济规模',
            //                                             type: 'bar',
            //                                             data: result3[1],
            //                                             label: {
            //                                                 normal: {
            //                                                     show: true,
            //                                                     position: 'top',
            //                                                     color: '#fff',

            //                                                 },
            //                                                 emphasis: {
            //                                                     show: true,

            //                                                 },
            //                                             },

            //                                         },
            //                                     ],
            //                                 }, {
            //                                     series: [{
            //                                         type: 'scatter',
            //                                         coordinateSystem: 'geo',
            //                                         label: {
            //                                             normal: { show: false },
            //                                             emphasis: { show: true },
            //                                         },
            //                                         itemStyle: {
            //                                             normal: {
            //                                                 color: '#000000',
            //                                             },
            //                                         },
            //                                         data: result1,
            //                                     }],
            //                                 }, {
            //                                     series: [{
            //                                         type: 'scatter',
            //                                         coordinateSystem: 'geo',
            //                                         label: {
            //                                             normal: { show: false },
            //                                             emphasis: { show: true },
            //                                         },
            //                                         itemStyle: {
            //                                             normal: {
            //                                                 color: '#e33f2e',
            //                                             },
            //                                         },
            //                                         data: result2,
            //                                     }],
            //                                 }, {
            //                                     series: [{
            //                                         type: 'scatter',
            //                                         coordinateSystem: 'geo',
            //                                         label: {
            //                                             normal: { show: false },
            //                                             emphasis: { show: true },
            //                                         },
            //                                         itemStyle: {
            //                                             normal: {
            //                                                 color: '#e33f2e',
            //                                             },
            //                                         },
            //                                         data: result2,
            //                                     }],
            //                                 }, {
            //                                     series: [{
            //                                         type: 'scatter',
            //                                         coordinateSystem: 'geo',
            //                                         label: {
            //                                             normal: { show: false },
            //                                             emphasis: { show: true },
            //                                         },
            //                                         itemStyle: {
            //                                             normal: {
            //                                                 color: '#e33f2e',
            //                                             },
            //                                         },
            //                                         data: result2,
            //                                     }],
            //                                 }, {
            //                                     series: [{
            //                                         type: 'scatter',
            //                                         coordinateSystem: 'geo',
            //                                         label: {
            //                                             normal: { show: false },
            //                                             emphasis: { show: true },
            //                                         },
            //                                         itemStyle: {
            //                                             normal: {
            //                                                 color: '#e33f2e',
            //                                             },
            //                                         },
            //                                         data: result2,
            //                                     }],
            //                                 }, {
            //                                     series: [{
            //                                         type: 'scatter',
            //                                         coordinateSystem: 'geo',
            //                                         label: {
            //                                             normal: { show: false },
            //                                             emphasis: { show: true },
            //                                         },
            //                                         itemStyle: {
            //                                             normal: {
            //                                                 color: '#e33f2e',
            //                                             },
            //                                         },
            //                                         data: result2,
            //                                     }],
            //                                 }],
            //                             };
            //                         },
            //                     );
            //                 },
            //             );
            //         },
            //     );
            // },
            );
        // 十二月7号左下更改新版
        this.http.get<ResponseType>('/api/2002/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                console.log(result);
                this.mapUp = {
                    tooltip: { trigger: 'item' },
                    visualMap: {
                        min: 0, max: 15000, calculable: true,
                        seriesIndex: 0,
                        textGap: 20,
                        orient: 'horizontal',
                        bottom: '3%',
                        // inRange: {
                        //     color: [
                        //         '#f1faff',
                        //         '#017df6',
                        //     ],
                        // },
                        textStyle: {
                            color: 'white',
                        },
                    },
                    geo: {
                        map: 'china',
                        roam: false,
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
                        type: 'map',
                        mapType: 'china',
                        geoIndex: 0,
                        roam: false,
                        label: {
                            normal: { show: false },
                            emphasis: { show: true },
                            color: '#e33f2e',
                        },
                        data: result,
                    },
                    ],
                };
            },
        );
        // 十二月7号左上更改原版
        this.http.get<ResponseType>('/api/20058/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                // this.lineLeftDown = {
                //     tooltip: {
                //         trigger: 'axis',
                //         axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                //             type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                //         },
                //     },
                //     legend: {
                //         show: true,
                //         data: ['先行合成指数', '一致合成指数', '滞后合成指数'],
                //         bottom: '10%',
                //         left: 'center',
                //         textStyle: {
                //             color: '#fff',
                //         },
                //     },
                //     grid: {
                //         left: '3%',
                //         right: '4%',
                //         bottom: '25%',
                //         top: '5%',
                //         containLabel: true,
                //     },
                //     xAxis: [
                //         {
                //             type: 'category',
                //             data: result[0],
                //             axisLine: {
                //                 lineStyle: {
                //                     color: '#fff',
                //                 },
                //             },
                //             axisTick: {
                //                 show: true,
                //             },
                //             axisLabel: {
                //                 rotate: 30,
                //                 textStyle: {
                //                     color: '#fff',
                //                 },
                //             },
                //             splitLine: {
                //                 show: false,
                //             },
                //         },
                //     ],
                //     yAxis: [
                //         {
                //             type: 'value',
                //             nane: '',
                //             axisLine: {
                //                 show: false,
                //                 lineStyle: {
                //                     color: '#fff',
                //                 },
                //             },
                //             splitLine: {
                //                 show: true,
                //             },
                //             axisLabel: {
                //                 show: true,
                //                 textStyle: {
                //                     color: '#fff',
                //                 },
                //             },
                //         },
                //     ],
                //     series: [
                //         {
                //             name: '先行合成指数',
                //             type: 'line',
                //             data: result[1],
                //         },
                //         {
                //             name: '一致合成指数',
                //             type: 'line',
                //             data: result[2],
                //         },
                //         {
                //             name: '滞后合成指数',
                //             type: 'line',
                //             data: result[3],
                //         }],
                // };
            },
        );
        // 十二月7号左上更改新版
        this.http.get<ResponseType>('/api/20226/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                console.log(result);
                this.lineLeftDown = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    legend: {
                        show: true,
                        data: ['2016数字经济总规模', '2016数字经济占GDP比重'],
                        bottom: '10%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '8%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[2],
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisTick: {
                                show: true,
                            },
                            axisLabel: {
                                rotate: 30,
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
                                show: false,
                            },
                            axisLabel: {
                                rotate: 0,
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '2016数字经济总规模',
                            yAxisIndex: 0,
                            type: 'bar',
                            barWidth: '40%',
                            data: result[1],
                        },
                        {
                            name: '2016数字经济占GDP比重',
                            yAxisIndex: 1,
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20224/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.lineRightDown = {
                    title: {
                        text: '2016年工业各行业数字占比',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '10%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        data: '漏洞检测数据各省排行',
                        top: 0,
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[0],
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                rotate: 20,
                                interval: 0,
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
                            name: '（单位：%）',
                            max: 100,
                            min: 0,
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            splitNumber: 2,
                            scale: true,
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            type: 'bar',
                            name: '漏洞检测数据各省排行',
                            barWidth: '40%',
                            data: result[2],
                        }],
                };
            },
        );

    }

    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20224/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        this.lineRightDown = {
                            title: {
                                text: '2016年工业各行业数字占比',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                show: true,
                                data: '漏洞检测数据各省排行',
                                top: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[0],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 20,
                                        interval: 0,
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
                                    name: '（单位：%）',
                                    max: 100,
                                    min: 0,
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    splitNumber: 2,
                                    scale: true,
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    type: 'bar',
                                    name: '漏洞检测数据各省排行',
                                    barWidth: '40%',
                                    data: result[2],
                                }],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20225/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        console.log(result);
                        this.lineRightDown = {
                            title: {
                                text: '2016年服务业各行业数字占比说',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                show: true,
                                // data: '漏洞检测数据各省排行',
                                top: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[0],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 20,
                                        interval: 0,
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
                                    name: '（单位：%）',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    splitNumber: 2,
                                    scale: true,
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    type: 'bar',
                                    name: '漏洞检测数据各省排行',
                                    barWidth: '40%',
                                    data: result[2],
                                }],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20223/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        console.log(result);
                        this.lineRightDown = {
                            title: {
                                text: '2016年农业各行业数字占比说',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                show: true,
                                //   data: '漏洞检测数据各省排行',
                                top: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[0],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 45,
                                        interval: 0,
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
                                    name: '（单位：%）',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    splitNumber: 2,
                                    scale: true,
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    type: 'bar',
                                    name: '漏洞检测数据各省排行',
                                    barWidth: '40%',
                                    data: result[1],
                                }],
                        };
                    },
                );
                break;
            default:
                break;
        }

    }



    JumpGroupClicked(event) { }
}
