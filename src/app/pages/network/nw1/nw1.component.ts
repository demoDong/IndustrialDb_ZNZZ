import { Component, OnInit } from '@angular/core';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import * as $ from 'jquery';
import * as echarts from 'echarts';


@Component({
    selector: 'do-example-nw1',
    templateUrl: 'nw1.component.html',
    styleUrls: ['nw1.component.scss'],
})


export class Nw1Component implements OnInit {
    theme = 'echart-theme';
    show = true;
    title: 'nw1';
    tab1Items = ['固定宽带普及率', '移动宽带普及率'];
    enterprises: any;
    enterNum: any;
    website: any;
    siteNum: any;
    machinecRoom: any;
    machineRoomNum: any;
    netSystem: any;
    netSystemNum: any;
    nameMap = 'china';
    mapUp: any;
    mapDown: any;
    lineUp: any;
    lineDown: any;
    Industry: any;
    IndustryNum: any;
    security: any;
    netSecurity: any;
    radiaPic: any;
    special1: any;
    special2: any;
    special3: any;
    tabItems = ['各省速率情况', '历史变化'];
    provinceRate: any;
    speedMap: any;
    rateTitle: any;
    provinceName: any;
    rateSpeed: any;
    nameFor: any;
    rateFor: any;
    historyDis: any;
    historyBar: any;
    mapHidden: boolean = false;
    historyChangeHidden: boolean = true;

    wordClass = 'theWord';
    wordClass1 = 'theWord1';

    constructor(private zone: NgZone, private router: Router, private http: HttpApi,
        private transService: DoDatatransService) {
    }
    network5SecurityCliked() {
        this.zone.run(() => this.router.navigate(['pages/nw3']));
    }
    network1SecurityCliked() {
        this.zone.run(() => this.router.navigate(['pages/nw2']));
    }
    network2SecurityCliked() {
        this.zone.run(() => this.router.navigate(['pages/nw5']));
    }
    network3SecurityCliked() {
        this.zone.run(() => this.router.navigate(['pages/nw4']));
    }
    network4SecurityCliked() {
        this.zone.run(() => this.router.navigate(['pages/nw6']));
    }
    ngOnInit() {
        this.rateTitle = '下载速率top5省份';
        this.provinceName = '省份';
        this.rateSpeed = '下载速率';
        this.http.get<ResponseType>('/api/20100/query?params=value:e:1')
            .subscribe(
            data0 => {
                const result = this.transService.onObjArray(data0.result, '', 'ec3-scatterMap');
                this.http.get<ResponseType>('/api/20100/query?params=value:e:2')
                    .subscribe(
                    data1 => {
                        const result1 = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        this.http.get<ResponseType>('/api/20100/query?params=value:e:3')
                            .subscribe(
                            data2 => {
                                const result2 = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');
                                this.mapUp = {
                                    title: {
                                        text: '全国电信普遍服务试点城市地图',
                                        left: 'center',
                                        top: '-2%',
                                        textStyle: {
                                            color: 'white',
                                            fontSize: 16,
                                        },
                                    },
                                    tooltip: { trigger: 'item' },
                                    legend: {
                                        orient: 'vertical',
                                        bottom: '28%',
                                        right: '3%',
                                        data: ['2016年第一批电信普遍试点城市', '2016年第二批电信普遍试点城市', '2016年第三批电信普遍试点城市'],
                                        textStyle: {
                                            color: '#fff',
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
                                                borderWidth: 1.5,
                                            },
                                            emphasis: {
                                                borderWidth: 1.5,
                                            },
                                        },
                                    },
                                    series: [{
                                        type: 'scatter',
                                        name: '2016年第一批电信普遍试点城市',
                                        coordinateSystem: 'geo',
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: true },
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: '#296FDD',
                                            },
                                        },
                                        data: result,
                                    },
                                    {
                                        type: 'scatter',
                                        name: '2016年第二批电信普遍试点城市',
                                        coordinateSystem: 'geo',
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: true },
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: '#65feca',
                                            },
                                        },
                                        data: result1,
                                    },
                                    {
                                        type: 'scatter',
                                        name: '2016年第三批电信普遍试点城市',
                                        coordinateSystem: 'geo',
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: true },
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: '#e33f2e',
                                            },
                                        },
                                        data: result2,
                                    }],
                                };
                            },
                        );
                    },
                );
            },
        );
        // 十二月7日变更版 原版
        this.http.get<ResponseType>('/api/2000/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                // this.lineUp = {
                //     title: {
                //         text: '',
                //     },
                //     tooltip: {
                //         trigger: 'axis',
                //     },
                //     legend: {
                //         show: true,
                //         orient: 'horizontal',
                //         data: [
                //             '数字经济规模',
                //             '占GDP比重',

                //         ],
                //         bottom: '0%',
                //         right: '10%',
                //         textStyle: {
                //             fontSize: '24',
                //         },
                //     },
                //     grid: {
                //         bottom: '20%',

                //     },
                //     xAxis: {
                //         data: result[
                //             2
                //         ],
                //         axisLabel: {
                //             interval: 0,
                //         },
                //     },
                //     yAxis: [
                //         {
                //             type: 'value',
                //             name: '（单位：亿美元）',

                //         },
                //         {
                //             type: 'value',
                //             name: '（单位：%）',

                //         },
                //     ],
                //     series: [
                //         {
                //             name: '数字经济规模',
                //             type: 'bar',
                //             data: result[
                //                 1
                //             ],
                //             label: {
                //                 normal: {
                //                     show: true,
                //                     position: 'top',
                //                     color: '#fff',

                //                 },
                //                 emphasis: {
                //                     show: true,

                //                 },
                //             },

                //         },
                //         {
                //             name: '占GDP比重',
                //             type: 'line',
                //             yAxisIndex: 1,
                //             data: result[
                //                 0
                //             ],
                //             label: {
                //                 normal: {
                //                     show: true,

                //                 },
                //                 emphasis: {
                //                     show: true,

                //                 },
                //             },
                //         },
                //     ],
                // };
            },
        );
        // 十二月7日变更版 新版
        this.http.get<ResponseType>('/api/20220/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.wordClass = 'theWord';
                this.wordClass1 = 'theWordHidden1';
                this.lineUp = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        // data: [
                        //   '数字经济规模',
                        //   '占GDP比重',
                        // ],
                        bottom: '0%',
                        right: '10%',
                        textStyle: {
                            // fontSize: '24',
                        },
                    },
                    grid: {
                        height: '50%',
                        top: '32%',
                    },
                    xAxis: {
                        data: result[2],
                        axisLabel: {
                            interval: 0,
                        },
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '（单位：%）',
                            scale: true,
                        },
                        // {
                        //   type: 'value',
                        // //  name: '（单位：%）',

                        // },
                    ],
                    series: [
                        {
                           // name: '占GDP比重',
                            type: 'line',
                            data: result[1],
                            label: {
                                normal: {
                                    show: true,

                                },
                                emphasis: {
                                    show: true,

                                },
                            },
                            markLine: {
                                symbol: 'circle',
                                lineStyle: {
                                    normal:
                                        {
                                            type: 'solid',
                                        },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'middle',
                                        formatter: '“十三五”规划目标',
                                    },
                                },
                                data: [
                                    { yAxis: result[0][0] },
                                ],
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#296fdd',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0,0,0,0)',
                                    }]),
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20038/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.enterprises = result[0][0];
                this.enterNum = result[1][0];
                this.website = result[0][1];
                this.siteNum = result[1][1];
                this.machinecRoom = result[0][2];
                this.machineRoomNum = result[1][2];
                this.netSystem = result[0][3];
                this.netSystemNum = result[1][3];
                this.Industry = result[0][4];
                this.IndustryNum = result[1][4];
            },
        );
        this.http.get<ResponseType>('/api/20039/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                // 十二月7日变更版 原版
                // this.mapDown = {
                //     title: {
                //         // text: '全国电信普遍服务试点城市', left: '4%', bottom: '18%',
                //         textStyle: {
                //             color: 'white',
                //             fontSize: 16,
                //         },
                //     },
                //     tooltip: { trigger: 'item' },
                //     visualMap: {
                //         min: 5, max: 577, calculable: true,
                //         seriesIndex: 0,
                //         textGap: 20,
                //         orient: 'horizontal',
                //         bottom: '15%',
                //         x: '20%',
                //         // inRange: {
                //         //     color: [
                //         //         '#f1faff',
                //         //         '#017df6',
                //         //     ],
                //         // },
                //         textStyle: {
                //             color: 'white',
                //         },
                //     },
                //     geo: {
                //         map: 'china',
                //         roam: false,
                //         top: '10%',
                //         zoom: 1.2,
                //         layoutCenter: ['50%', '50%'],
                //         label: {
                //             emphasis: {
                //                 show: false,
                //             },
                //         },
                //         itemStyle: {
                //             normal: {
                //                 // areaColor: 'transparent',
                //                 // borderColor: '#818181',
                //                 borderWidth: 1.5,
                //             },
                //             emphasis: {
                //                 // areaColor: 'transparent',
                //                 // borderColor: '#818181',
                //                 borderWidth: 1.5,
                //             },
                //         },
                //     },
                //     series: [{
                //         type: 'map',
                //         mapType: 'china',
                //         geoIndex: 0,
                //         roam: false,
                //         label: {
                //             normal: { show: false },
                //             emphasis: { show: true },
                //         },
                //         data: result,
                //     }],
                // };
            },
        );
        // 十二月7号变更 新版
        this.http.get<ResponseType>('/api/20226/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                console.log(result);
                this.lineDown = {
                    // title: {
                    //     text: '集成电路产业链各环节营收',
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true,
                    },
                    legend: {
                        data: ['2016年数字经济总规模', '2016年数字经济占GDP比重'],
                        textStyle: {
                            color: '#fff',
                        },
                        bottom: '5%',
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
                            name: '（单位：亿美元）',
                            //  min: 0,
                            //  max: 2500,
                            nameGap: 20,
                            nameTextStyle: {
                                // color: '#72b1ff',
                                // fontSize: '14',
                                // top: '-10%',
                            },
                            textStyle: {
                                color: '#fff',
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '14',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#3b6ca1',
                                    width: '2',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        },
                        {
                            type: 'value',
                            // min: 0,
                            // max: 100,
                            name: '（单位：%）',
                            nameGap: 20,
                            nameTextStyle: {
                                // color: '#72b1ff',
                                // fontSize: '14',
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '14',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#3b6ca1',
                                    width: '2',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            name: '2016年数字经济总规模',
                            type: 'bar',
                            barWidth: '40%',
                            data: result[1],
                        },
                        {
                            yAxisIndex: 1,
                            name: '2016年数字经济占GDP比重',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20036/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                $('.security').append(result[0][0] + ':' + result[1][0] + '<br>' + result[0][1] + ':' + result[1][1]);
            },
        );
        this.http.get<ResponseType>('/api/20037/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                // tslint:disable-next-line:max-line-length
                $('.netSecurity').append(result[0][0] + ':' + result[1][0] + '<br>' + result[0][1] + ':' + result[1][1]);
            },
        );
        this.http.get<ResponseType>('/api/20038/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                $('.industrySec').append(result[0][0] + ':' + result[1][0]);
            },
        );
        this.http.get<ResponseType>('/api/1118/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                const one = [];
                const two = [];
                const three = [];
                for (const key in result[4]) {
                    if (result[4][key] === '第一梯队') {
                        one.push(result[2][key]);
                        two.push('');
                        three.push('');
                    } else if (result[4][key] === '第二梯队') {
                        one.push('');
                        two.push(result[2][key]);
                        three.push('');
                    } else {
                        one.push('');
                        two.push('');
                        three.push(result[2][key]);
                    }
                }
                this.radiaPic = {
                    title: {
                        text: 'CSDI',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: [{
                        show: true,
                        data: ['第一梯队', '第二梯队', '第三梯队'],
                        bottom: '3%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '5%',
                            right: '2%',
                            top: '10%',
                            bottom: '20%',
                        },
                    ],
                    yAxis: [{
                        type: 'value',
                        name: '',
                        gridIndex: 0,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                        axisLabel: {
                            show: true,
                        },
                    }],
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            gridIndex: 0,
                            data: result[1],
                            axisLabel: {
                                interval: '0',
                                show: true,
                                rotate: 45,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
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
                            name: '第一梯队',
                            type: 'bar',
                            barGap: '-100%',
                            data: one,
                        },
                        {
                            name: '第二梯队',
                            type: 'bar',
                            barGap: '-100%',
                            data: two,
                        },
                        {
                            name: '第三梯队',
                            type: 'bar',
                            barGap: '-100%',
                            data: three,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20110/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.special1 = result[0][0];
                this.special2 = result[0][1];
                this.special3 = result[0][2];
            },
        );
        this.http.get<ResponseType>('/api/20127/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.provinceRate = result[0][0];
            },
        );
        this.http.get<ResponseType>('/api/20125/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.speedMap = {
                    title: {
                        text: '',
                        left: '4%',
                        bottom: '18%',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        },
                    },
                    tooltip: { trigger: 'item' },
                    visualMap: {
                        min: 13, max: 18,
                        calculable: true,
                        seriesIndex: 0,
                        textGap: 20,
                        orient: 'horizontal',
                        bottom: '15%',
                        left: '-2%',
                        // x: '20%',
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
                        top: '5%',
                        zoom: 1,
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
                        },
                        data: result,
                    }],
                };
            },
        );
        this.http.get<ResponseType>('/api/20126/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.nameFor = result[0];
                this.rateFor = result[1];
            },
        );
    }
    btnNetClicked(index) {
        switch (index) {
            case 0:
                this.mapHidden = false;
                this.historyChangeHidden = true;
                this.http.get<ResponseType>('/api/20127/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', '');
                        console.log(result);
                        this.provinceRate = result[0][0];
                    },
                );
                this.http.get<ResponseType>('/api/20125/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                        this.speedMap = {
                            title: {
                                text: '',
                                left: '4%',
                                bottom: '18%',
                                textStyle: {
                                    color: 'white',
                                    fontSize: 16,
                                },
                            },
                            tooltip: { trigger: 'item' },
                            visualMap: {
                                min: 13, max: 18,
                                calculable: true,
                                seriesIndex: 0,
                                textGap: 20,
                                orient: 'horizontal',
                                bottom: '15%',
                                left: '-2%',
                                // x: '20%',
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
                                top: '5%',
                                zoom: 1,
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
                                },
                                data: result,
                            }],
                        };
                    },
                );
                this.rateTitle = '下载速率top5省份';
                this.provinceName = '省份';
                this.rateSpeed = '下载速率';
                this.http.get<ResponseType>('/api/20126/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', '');
                        this.nameFor = result[0];
                        this.rateFor = result[1];
                    },
                );
                break;
            case 1:
                this.mapHidden = true;
                this.historyChangeHidden = false;
                this.http.get<ResponseType>('/api/20128/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', '');
                        this.historyBar = {
                            title: {
                                text: '',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow',
                                },
                            },
                            legend: [{
                                show: true,
                                data: [''],
                                bottom: '3%',
                                left: '15%',
                                textStyle: {
                                    color: '#fff',
                                },
                            }],
                            grid: [
                                {
                                    left: '5%',
                                    top: '20%',
                                },
                            ],
                            yAxis: [{
                                type: 'value',
                                name: '单位：Mbps',
                                splitLine: {
                                    show: false,
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#fff',
                                    },
                                },
                                axisLabel: {
                                    show: true,
                                },
                            }],
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    gridIndex: 0,
                                    data: result[0],
                                    axisLabel: {
                                        interval: '0',
                                        show: true,
                                        rotate: 0,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
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
                                    name: '',
                                    type: 'line',
                                    data: result[1],
                                },
                            ],
                        };
                    },
                );
                this.http.get<ResponseType>('/api/20129/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', '');
                        this.historyDis = result[0][0];
                    },
                );
                break;
            default:
                break;
        }

    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20220/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.wordClass = 'theWord';
                        this.wordClass1 = 'theWordHidden1';
                        this.lineUp = {
                            title: {
                                text: '',
                            },
                            tooltip: {
                                trigger: 'axis',
                            },
                            legend: {
                                show: true,
                                orient: 'horizontal',
                                // data: [
                                //   '数字经济规模',
                                //   '占GDP比重',

                                // ],
                                bottom: '0%',
                                right: '10%',
                                textStyle: {
                                    // fontSize: '24',
                                },
                            },
                            grid: {
                                height: '50%',
                                top: '32%',
                            },
                            xAxis: {
                                data: result[2],
                                axisLabel: {
                                    interval: 0,
                                },
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '（单位：%）',
                                    scale: true,
                                },
                                // {
                                //   type: 'value',
                                // //  name: '（单位：%）',

                                // },
                            ],
                            series: [
                                {
                                   // name: '占GDP比重',
                                    type: 'line',
                                    data: result[1],
                                    label: {
                                        normal: {
                                            show: true,

                                        },
                                        emphasis: {
                                            show: true,

                                        },
                                    },
                                    markLine: {
                                        symbol: 'circle',
                                        lineStyle: {
                                            normal:
                                                {
                                                    type: 'solid',
                                                },
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'middle',
                                                formatter: '“十三五”规划目标',
                                            },
                                        },
                                        data: [
                                            { yAxis: result[0][0] },
                                        ],
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#296fdd',
                                            }, {
                                                offset: 1,
                                                color: 'rgba(0,0,0,0)',
                                            }]),
                                        },
                                    },
                                },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20221/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.wordClass = 'theWordHidden';
                        this.wordClass1 = 'theWord1';
                        console.log(result[0][0]);
                        this.lineUp = {
                            title: {
                                text: '',
                            },
                            tooltip: {
                                trigger: 'axis',
                            },
                            legend: {
                                show: true,
                                orient: 'horizontal',
                                // data: [
                                //   '数字经济规模',
                                //   '占GDP比重',

                                // ],
                                bottom: '0%',
                                right: '10%',
                                textStyle: {
                                    //  fontSize: '24',
                                },
                            },
                            grid: {
                                height: '50%',
                                top: '32%',
                            },
                            xAxis: {
                                data: result[2],
                                axisLabel: {
                                    interval: 0,
                                },
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                    scale: true,
                                    max: '90',
                                    min: '70',
                                    name: '（单位：%）',

                                },
                                // {
                                //   type: 'value',
                                //   name: '（单位：%）',

                                // },
                            ],
                            series: [
                                {
                                   // name: '占GDP比重',
                                    type: 'line',
                                    data: result[1],
                                    label: {
                                        normal: {
                                            show: true,

                                        },
                                        emphasis: {
                                            show: true,

                                        },
                                    },
                                    markLine: {
                                        symbol: 'circle',
                                        lineStyle: {
                                            normal:
                                                {
                                                    type: 'solid',
                                                },
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'middle',
                                                formatter: '“十三五”规划目标',
                                            },
                                        },
                                        data: [
                                            { yAxis: result[0][0] },
                                        ],
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#296fdd',
                                            }, {
                                                offset: 1,
                                                color: 'rgba(0,0,0,0)',
                                            }]),
                                        },
                                    },
                                },
                            ],
                        };
                    },
                );
                break;
            default:
                break;
        }

    }
}
