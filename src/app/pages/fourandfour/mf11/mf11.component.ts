import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf11',
    templateUrl: 'mf11.component.html',
    styleUrls: ['mf11.component.scss'],
})

export class Mf11Component implements OnInit {
    btnGroup1Clicked: any;
    theme = 'echart-theme';
    title: string = '全国工业增长趋势';
    showTitle = true;
    nameMap = 'china';
    trendLine: any;
    growthMap: any;
    indexLine: any;
    growBarh: any;
    tabItemsArr = ['收入', '出货量'];
    tabItemsArr1 = ['收入', '出货量'];

    showEcharts = true;

    chartTheme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20040/query?params=type:E:按信息任务来源划分')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.trendLine = {
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '70%'],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'out',
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
                                    length: 20,
                                    length2: 15,
                                },
                            },
                            data: result,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20047/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.growthMap = {
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
                        top: '5%',
                        containLabel: true,
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
                            nane: '',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
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
                            type: 'bar',
                            name: '漏洞检测数据各省排行',
                            barWidth: '40%',
                            data: result[1],
                        }],
                };
            },
        );
        this.http.get<ResponseType>('/api/20040/query?params=type:E:按信息任务来源划分')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.indexLine = {
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '70%'],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'out',
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
                                    length: 20,
                                    length2: 15,
                                },
                            },
                            data: result,
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20045/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.growBarh = {
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
                        top: '5%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        bottom: '10',
                        data: ['接入企业数量', '网站数量'],
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[4],
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
                            nane: '',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
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
                            name: '网站数量',
                            type: 'bar',
                            barGap: 0,
                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                            data: result[0],
                        },
                        {
                            name: '接入企业数量',
                            type: 'bar',
                            barGap: 0,
                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                            data: result[1],
                        },
                    ],
                };
            },
        );
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20024/all')
                    .subscribe(
                    dataLeft => {
                        const data = this.transService.onObjArray(dataLeft.result, '', 'ec3-line');
                        this.indexLine = {
                            title: {
                                text: '',
                                x: 'center',
                                top: '17%',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            tooltip: {
                                trigger: 'axis',
                            },
                            legend: {
                                right: '10%',
                                bottom: '12%',
                                orient: 'horizontal',
                                data: [
                                    '固定资产投资完成额累计增速',
                                    '社会消费品零售总额当月增速',
                                    '出口当月增速',
                                ],

                            },
                            grid: {
                                bottom: '33%',
                                top: '10%',
                                right: 20,
                            },
                            xAxis: {
                                type: 'category',
                                data: data[
                                    4
                                ],
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 80,
                                    end: 100,
                                    height: 20,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                            yAxis: {
                                type: 'value',
                                name: '单位（%）',
                            },
                            series: [
                                {
                                    name: '固定资产投资完成额累计增速',
                                    type: 'line',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: data[
                                        3
                                    ],
                                },
                                {
                                    name: '社会消费品零售总额当月增速',
                                    type: 'line',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: data[
                                        2
                                    ],
                                },
                                {
                                    name: '出口当月增速',
                                    type: 'line',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: data[
                                        0
                                    ],
                                },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20001/all')
                    .subscribe(
                    data => {
                        const visual = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.indexLine = {
                            tooltip: { trigger: 'axis' },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '26%',
                                containLabel: true,
                            },
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {},
                                },
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 80,
                                    end: 100,
                                    height: 20,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                    rotate: 30,
                                },
                                data: visual[0],
                            },
                            yAxis: {
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '(单位：%)',
                                splitNumber: 3,
                                boundaryGap: [0.05, 0.05],
                            },
                            series: [{
                                name: '相关统计指标',
                                type: 'line',
                                data: visual[1],
                            },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20001/all')
                    .subscribe(
                    data => {
                        const visual = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.indexLine = {
                            color: ['#296fdd', '#65feca', '#e33f2e', '#6f4ce8',
                                '#296fdd', '#65feca', '#e33f2e', '#6f4ce8'],
                            tooltip: { trigger: 'axis' },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '26%',
                                containLabel: true,
                            },
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {},
                                },
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 80,
                                    end: 100,
                                    height: 20,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                    rotate: 30,
                                },
                                data: visual[0],
                            },
                            yAxis: {
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '(单位：%)',
                                splitNumber: 3,
                                boundaryGap: [0.05, 0.05],
                            },
                            series: [{
                                name: '相关统计指标',
                                type: 'line',
                                data: visual[1],
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
    btnGroupClickedRight(index) {
        switch (index) {
            case 0:
                this.router.navigate(['pages/mf5']);
                break;
            case 1:

                break;
            case 2:

                break;

            default:
                break;
        }

    }

    mapClicked(event) {
        this.zone.run(() => this.router.navigate(['pages/mf2']));
    }
}
