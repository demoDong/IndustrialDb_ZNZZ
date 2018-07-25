import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf16',
    templateUrl: 'mf16.component.html',
    styleUrls: ['mf16.component.scss'],
})

export class Mf16Component implements OnInit {
    theme = 'echart-theme';
    title: string = '总体检测';
    tabItemsRight = ['动力', '结构', '效率'];
    showTitle = true;
    nameMap = 'china';
    trendLine: any;
    growthMap: any;
    indexLine: any;
    growBarh: any;
    showEcharts = true;

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
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['工业增加值增速', '年度均线'],
                        bottom: '5%',
                        right: '4%',
                        textStyle: {
                            color: '#fff',
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
                        bottom: '15%',
                        top: '15%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[2],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(单位：%)',
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
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '工业增加值增速',
                            type: 'line',
                            data: result[1],
                        },
                        {
                            name: '年度均线',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20117/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.indexLine = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['投资增速', '消费增速', '出口增速'],
                        bottom: '5%',
                        right: '4%',
                        textStyle: {
                            color: '#fff',
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
                        bottom: '15%',
                        top: '15%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[3],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(单位：%)',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                        },
                    ],
                    series: [
                        {
                            name: '消费增速',
                            type: 'line',
                            data: result[1],
                        },
                        {
                            name: '出口增速',
                            type: 'line',
                            data: result[0],
                        },
                        {
                            name: '投资增速',
                            type: 'line',
                            data: result[2],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20103/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.growthMap = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['工业投资', '其他投资'],
                        bottom: '5%',
                        right: '4%',
                        textStyle: {
                            color: '#fff',
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
                        bottom: '15%',
                        top: '15%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[2],
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(单位：%)',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                        },
                    ],
                    series: [
                        {
                            name: '市场规模',
                            type: 'line',
                            data: result[1],
                        },
                        {
                            name: '增速',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20103/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.growBarh = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['两化融合指数'],
                        bottom: '5%',
                        right: '4%',
                        textStyle: {
                            color: '#fff',
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
                        bottom: '15%',
                        top: '15%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[2],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '(单位：%)',
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '两化融合指数',
                            type: 'line',
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
                this.http.get<ResponseType>('/api/20117/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.indexLine = {
                            title: {
                                textStyle: {
                                    color: '#64A5E1',
                                    fontSize: 20,
                                },
                            },
                            legend: {
                                show: true,
                                data: ['投资增速', '消费增速', '出口增速'],
                                bottom: '5%',
                                right: '4%',
                                textStyle: {
                                    color: '#fff',
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
                                bottom: '15%',
                                top: '15%',
                                containLabel: true,
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[3],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#296FDE',
                                        },
                                    },
                                    axisTick: {
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                },
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '(单位：%)',
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                },
                            ],
                            series: [
                                {
                                    name: '消费增速',
                                    type: 'line',
                                    data: result[1],
                                },
                                {
                                    name: '出口增速',
                                    type: 'line',
                                    data: result[0],
                                },
                                {
                                    name: '投资增速',
                                    type: 'line',
                                    data: result[2],
                                },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20118/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        console.log(result);
                        this.indexLine = {
                            title: {
                                textStyle: {
                                    color: '#64A5E1',
                                    fontSize: 20,
                                },
                            },
                            legend: {
                                show: true,
                                data: ['工业投资', '其他投资'],
                                bottom: '5%',
                                right: '4%',
                                textStyle: {
                                    color: '#fff',
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
                                bottom: '15%',
                                top: '15%',
                                containLabel: false,
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[4],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#296FDE',
                                        },
                                    },
                                    axisTick: {
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                },
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '(单位：%)',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                },
                            ],
                            series: [
                                {
                                 //   name: '工业投资',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[1],
                                    label: {
                                        normal: {
                                          show: false,
                                        },
                                    },
                                },
                                {
                                 //   name: '其他投资',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[0],
                                    label: {
                                        normal: {
                                          show: false,
                                        },
                                    },
                                },
                                {
                                  //  name: '其他投资',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[2],
                                    label: {
                                        normal: {
                                          show: false,
                                        },
                                    },
                                },
                                {
                                   // name: '其他投资',
                                    type: 'bar',
                                    data: result[3],
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

}
