import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf23',
    templateUrl: 'mf23.component.html',
    styleUrls: ['mf23.component.scss'],
})

export class Mf23Component implements OnInit {
    tabItems: any;
    tabItemsRight: any;
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

    option_barLine: any;
    option_map: any;
    option_line: any;
    option_bar: any;
    chartTheme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {}
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
