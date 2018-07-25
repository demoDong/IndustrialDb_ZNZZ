import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf20',
    templateUrl: 'mf20.component.html',
    styleUrls: ['mf20.component.scss'],
})

export class Mf20Component implements OnInit {
    theme = 'echart-theme';
    title: string = '全国工业增长趋势';
    showTitle = true;
    nameMap = 'china';
    trendLine: any;
    growthMap: any;
    indexLine: any;
    growBarh: any;
    growBarl: any;
    visual: any;
    showEcharts = true;
    tabItems = ['相关统计指标', '工业大数据指标', '工业景气指数'];
    tabItemsRight = ['新能源汽车', '新一代信息技术', '机器人'];

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
                this.trendLine = {
                    tooltip: { trigger: 'axis' },
                    textStyle: {
                        color: 'white',
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: '18%',
                        data: ['工业增加值增速'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '25%',
                        containLabel: true,
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
                        data: result[0],
                    },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        name: '(单位：%)',
                    },
                    series: [{
                        name: '工业增加值增速',
                        type: 'line',
                        data: result[1],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20002/all')
            .subscribe(
            data => {
                this.visual = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.http.get<ResponseType>('/api/20003/all')
                    .subscribe(
                    data1 => {
                        const scatter = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        this.growthMap = {
                            title: {
                                text: '工业增加值增速', left: '4%', bottom: '18%',
                                textStyle: {
                                    color: 'white',
                                    fontSize: 16,
                                },
                            },
                            tooltip: { trigger: 'item' },
                            visualMap: {
                                min: 0, max: 100, calculable: true,
                                seriesIndex: 0,
                                textGap: 20,
                                orient: 'horizontal',
                                bottom: '6%',
                                // inRange: {
                                //     color: [
                                //         '#f20faff',
                                //         '#017df6',
                                //     ],
                                // },
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            legend: {
                                orient: 'vertical',
                                bottom: '28%',
                                left: '3%',
                                data: ['重点联系城市'],
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
                                type: 'map',
                                mapType: 'china',
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
                                name: '重点联系城市',
                                coordinateSystem: 'geo',
                                label: {
                                    normal: { show: false },
                                    emphasis: { show: true },
                                },
                                // itemStyle: {
                                //     normal: {
                                //         color: '#e33f2e',
                                //     },
                                // },
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
                        orient:  'horizontal',
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
        this.http.get<ResponseType>('/api/20004/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.growBarh = {
                    title: {
                        text: '前十',
                        left: 'center',
                        top: '10%',
                        textStyle: {
                            color: 'white',
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
                        bottom: '5%',
                        containLabel: true,
                    },
                    xAxis: {
                        show: false,
                        type: 'value',
                        axisLine: { show: false },
                        splitLine: { show: false },
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: { show: false },
                        splitLine: { show: false },
                        data: result[1],
                        axisLabel: {
                            color: 'white',
                            rotate: 0,
                        },
                    },
                    series: [
                        {
                            type: 'bar',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20005/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.growBarl = {
                    title: {
                        text: '后十',
                        left: 'center',
                        top: '10%',
                        textStyle: {
                            color: 'white',
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
                        bottom: '5%',
                        containLabel: true,
                    },
                    xAxis: {
                        type: 'value',
                        show: false,
                        axisLine: { show: false },
                        splitLine: { show: false },
                        position: 'buttom',
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: { show: false },
                        splitLine: { show: false },
                        position: 'right',
                        data: result[1],
                        axisLabel: {
                            color: 'white',
                            rotate: 0,
                        },
                    },
                    series: [
                        {
                            type: 'bar',
                            data: result[0],
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
                        orient:  'horizontal',
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
