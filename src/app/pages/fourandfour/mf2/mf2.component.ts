import { Router } from '@angular/router';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { RouteCacheService } from './../../../shared/do-service/route-cache.service';

@Component({
    selector: 'do-example-mf2',
    templateUrl: 'mf2.component.html',
    styleUrls: ['mf2.component.scss'],
})

export class Mf2Component implements OnInit {

    title = 'mf2';
    theme = 'echart-theme';
    type = 'guizhou';
    tabItemsArr = ['相关统计指标', '工业平稳性指标', '工业景气指数'];
    showEchartsContainer = true;
    showChangeNorm_typeContainer = true;
    option_barLine: any;
    option_map: any;
    option_line: any;
    option_bar: any;
    visual: any;

    constructor(private http: HttpApi, private transService: DoDatatransService, private router: Router,
        private zone: NgZone) { }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20006/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.option_barLine = {
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
                        top: '5%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        data: ['贵州工业增加值累计完成额（亿元）', '贵州工业增加值增速（%）', '全国工业增加值增速（%）'],
                        bottom: '18%',
                        left: 'auto',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            bottom: '6%',
                            start: 50,
                            end: 100,
                            height: 20,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    ],

                    xAxis: [
                        {
                            type: 'category',
                            data: result[3],
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
                            nane: '',
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
                            nane: '',
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
                            name: '贵州工业增加值累计完成额（亿元）',
                            type: 'bar',
                            barWidth: '40%',
                            data: result[0],
                        },
                        {
                            yAxisIndex: 1,
                            name: '贵州工业增加值增速（%）',
                            type: 'line',
                            barWidth: '40%',
                            data: result[2],
                        },
                        {
                            yAxisIndex: 1,
                            name: '全国工业增加值增速（%）',
                            type: 'line',
                            barWidth: '40%',
                            data: result[1],
                        },
                    ],
                };
            },
        );
        this.option_line = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
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
                data: ['贵州工业增加值增速(%)', '全国工业增加值增速(%)'],
                bottom: '10%',
                left: 'center',
                textStyle: {
                    color: '#fff',
                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2015', '2016', '2017', '2015', '2016', '2017', '2015', '2016', '2017'],
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
                    name: '贵州工业增加值增速(%)',
                    type: 'line',
                    barWidth: '40%',
                    data: [0.5, 0.7, 1.6, 0.5, 0.7, 1.6, 0.5, 0.7, 1.6],
                },
                {
                    yAxisIndex: 0,
                    name: '全国工业增加值增速(%)',
                    type: 'line',
                    barWidth: '40%',
                    data: [1.5, 2.7, 1.6, 4.5, 1.7, 4.6, 2.5, 1.7, 2.6],
                },
            ],
        };
        this.http.get<ResponseType>('/api/20009/all')
            .subscribe(
            data => {
                this.visual = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.http.get<ResponseType>('/api/20010/all')
                    .subscribe(
                    data1 => {
                        const scatter = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        this.option_map = {
                            title: { text: '', left: '20%', bottom: '20%' },
                            tooltip: { formatter: '{b}: {c}' },
                            visualMap: {
                                inRange: {
                                    color: [
                                        '#f1faff',
                                        '#017df6',
                                    ],
                                },
                                bottom: '5%',
                                min: -9.5, max: 12, text: ['工业园区产值'], calculable: true,
                                seriesIndex: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            legend: {
                                bottom: '10%',
                                data: ['累计产值(万元)'],
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            geo: {
                                map: 'guizhou',
                                roam: false,
                                top: '3%',
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
                                mapType: 'guizhou',
                                geoIndex: 0,
                                roam: false,
                                label: {
                                    normal: { show: false },
                                    emphasis: { show: true },
                                },
                                data: this.visual,
                            },
                            {
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                label: {
                                    normal: { show: false },
                                    emphasis: { show: false },
                                },
                                symbolSize: function (val) {
                                    return val[3] / 50000;
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#e33f2e',
                                    },
                                },
                                data: scatter,
                                tooltip: {
                                    show: true,
                                    formatter: function (obj) {
                                        const value = obj.value;
                                        return value[2] + ' : ' + value[3];
                                    },
                                },
                            }],
                        };
                    },
                );
            },
        );
        this.http.get<ResponseType>('/api/20011/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.option_bar = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '10%',
                        top: '0%',
                        containLabel: true,
                    },
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
                            nane: '(单位：亿元)',
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
                            name: '工业增加值',
                            type: 'bar',
                            data: result[2],
                        },
                    ],
                };
            },
        );
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.option_line = {};
                this.option_line = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
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
                        data: ['贵州工业增加值增速(%)', '全国工业增加值增速(%)'],
                        bottom: '10%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: '16',
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['2015', '2016', '2017', '2015', '2016', '2017', '2015', '2016', '2017'],
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
                            name: '贵州工业增加值增速(%)',
                            type: 'line',
                            barWidth: '40%',
                            data: [0.5, 0.7, 1.6, 0.5, 0.7, 1.6, 0.5, 0.7, 1.6],
                        },
                        {
                            yAxisIndex: 0,
                            name: '全国工业增加值增速(%)',
                            type: 'line',
                            barWidth: '40%',
                            data: [1.5, 2.7, 1.6, 4.5, 1.7, 4.6, 2.5, 1.7, 2.6],
                        },
                    ],
                };
                break;
            case 1:
                this.option_line = {};
                this.http.get<ResponseType>('/api/20007/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        console.log('453274572682');
                        console.log(result);
                        this.option_line = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '40%',
                                top: '5%',
                                containLabel: true,
                            },
                            legend: {
                                show: true,
                                data: ['平稳性指数', '贷款余额增速(%)', '工业用电量增速(%)', '货运增速(公路)(%)'],
                                bottom: '24%',
                                left: 'center',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '16',
                                },
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    bottom: '10%',
                                    start: 50,
                                    end: 100,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[4],
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
                                    name: '平稳性指数',
                                    type: 'line',
                                    barWidth: '40%',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: result[3],
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '贷款余额增速(%)',
                                    type: 'line',
                                    barWidth: '40%',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: result[2],
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '工业用电量增速(%)',
                                    type: 'line',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    barWidth: '40%',
                                    data: result[1],
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '货运增速(公路)(%)',
                                    type: 'line',
                                    barWidth: '40%',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: result[0],
                                },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.option_line = {};
                this.http.get<ResponseType>('/api/20008/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        this.option_line = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '45%',
                                top: '5%',
                                containLabel: true,
                            },
                            legend: {
                                show: true,
                                // tslint:disable-next-line:max-line-length
                                data: ['工业用电量增速（%）', '工业增值税增速（%）', '铁路货运量增速（%）', '各项存款余额增速（%）', '各项贷款余额增速（%）', '工业生产者出厂价格指数', '工业生产者购进价格指数', '先行指数'],
                                bottom: '24%',
                                left: 'center',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '16',
                                },
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    bottom: '10%',
                                    start: 50,
                                    end: 100,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[8],
                                    axisTick: {
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
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
                            yAxis: [
                                {
                                    type: 'value',
                                    nane: '',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    yAxisIndex: 0,
                                    name: '工业用电量增速（%）',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[7],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '工业增值税增速（%）',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[6],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '铁路货运量增速（%）',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[5],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '各项存款余额增速（%）',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[4],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '各项贷款余额增速（%）',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[3],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '工业生产者出厂价格指数',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[2],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '工业生产者购进价格指数',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[1],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '先行指数',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[0],
                                    label: {
                                        normal: {
                                            show: false,
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
    onBmapClick(obj) {
        this.zone.run(() => this.router.navigate(['pages/mf3',
            { name: obj.data[2], lon: obj.data[0], lat: obj.data[1] }]));
    }
}
