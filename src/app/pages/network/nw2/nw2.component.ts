import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import * as echarts from 'echarts';
import { DataList } from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'do-example-nw2',
    templateUrl: 'nw2.component.html',
    styleUrls: ['nw2.component.scss'],
})


export class Nw2Component implements OnInit {

    title: 'nw2';
    theme = 'echart-theme';
    wordClass = 'theWord';
    lineUp: any;
    mapUp: any;
    lineDown: any;
    interMap: any;
    interBar: any;
    ftthline: any;
    basebar: any;
    leftPassage: any;
    nameMap = 'china';
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
    downBar: any;


    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
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
        this.http.get<ResponseType>('/api/2000/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
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
                        data: [
                            '数字经济规模',
                            '占GDP比重',

                        ],
                        bottom: '0%',
                        right: '10%',
                        textStyle: {
                            fontSize: '24',
                        },
                    },
                    grid: {
                        height: '50%',
                        top: '32%',
                    },
                    xAxis: {
                        data: result[
                            2
                        ],
                        axisLabel: {
                            interval: 0,
                        },
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '（单位：亿元）',

                        },
                        {
                            type: 'value',
                            name: '（单位：%）',

                        },
                    ],
                    series: [
                        {
                            name: '数字经济规模',
                            type: 'line',
                            data: result[1],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    color: '#fff',

                                },
                                emphasis: {
                                    show: true,

                                },
                            },

                        },
                        {
                            name: '占GDP比重',
                            type: 'line',
                            yAxisIndex: 1,
                            data: result[0],
                            label: {
                                normal: {
                                    show: true,

                                },
                                emphasis: {
                                    show: true,

                                },
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(255, 158, 68)',
                                    }, {
                                        offset: 0.7,
                                        color: 'rgba(255, 70, 131, 0)',
                                    }]),
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20119/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.ftthline = {
                    title: {
                        text: '光纤到户（FTTH）光网络覆盖家庭（万个）',
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
                            left: '15%',
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
                            markLine: {
                                symbol: 'circle',
                                lineStyle: {
                                    normal:
                                        {
                                            color: '#65feca',
                                            type: 'solid',
                                        },
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'middle',
                                        formatter: '“宽带中国”战略2020年目标',
                                    },
                                },
                                data: [
                                    {
                                        yAxis: 30000,
                                    },
                                ],
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20120/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.basebar = {
                    title: {
                        text: '4G基站数量（万个）',
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
                            left: '10%',
                            bottom: '20%',
                            // top: '10%'
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
                            type: 'bar',
                            data: result[1],
                            barWidth: '50%',
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20121/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.leftPassage = result[0][0];
            },
        );
        this.http.get<ResponseType>('/api/20122/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                this.interMap = {
                    title: {
                        text: '国家级互联网骨干直联点分布情况',
                        left: 'center',
                        top: '5%',
                    },
                    geo: {
                        map: 'china',
                        roam: false,
                        top: '20%',
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
                                areaColor: '#0A1C64',
                                borderColor: '#183888',
                            },
                            emphasis: {
                                borderWidth: 1.5,
                            },
                        },
                    },
                    series: [{
                        type: 'scatter',
                        name: '',
                        coordinateSystem: 'geo',
                        label: {
                            normal: {
                                show: true,
                                formatter: function(params){
                                  return  params.data[2];
                                },
                            },
                            emphasis: { show: true },
                        },
                        data: result,
                    }],
                };
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
        this.http.get<ResponseType>('/api/20130/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.interBar = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    legend: [{
                        show: false,
                        data: ['2016年', '2017年'],
                        bottom: '5%',
                        // left: '75%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '20%',
                            top: '28%',
                            right: '20%',
                        },
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: result[0],
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                interval: '0',
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
                    xAxis: [
                        {
                            type: 'value',
                            name: '(ms)',
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
                            name: '2016年',
                            type: 'bar',
                            data: result[1],
                            barGap: 0,
                        },
                        {
                            nane: '2017年',
                            type: 'bar',
                            data: result[2],
                            barGap: 0,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20131/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', '');
                this.downBar = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    legend: [{
                        show: true,
                        data: ['2016年', '2017年'],
                        bottom: '20%',
                        // left: '75%',
                        textStyle: {
                            color: '#fff',
                        },
                    }],
                    grid: [
                        {
                            left: '20%',
                            top: '0%',
                            bottom: '50%',
                            right: '20%',
                        },
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: result[0],
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                interval: '0',
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
                    xAxis: [
                        {
                            type: 'value',
                            name: '(%)',
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
                            name: '2016年',
                            type: 'bar',
                            data: result[1],
                            barGap: 0,
                        },
                        {
                            name: '2017年',
                            type: 'bar',
                            data: result[2],
                            barGap: 0,
                        },
                    ],
                };
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
                                    right: '15%',
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
    myClicked() {
        this.zone.run(() => this.router.navigate(['pages/nw2s1']));
    }
}
