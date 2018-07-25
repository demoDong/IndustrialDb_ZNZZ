import { ActivatedRoute, Router } from '@angular/router';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';

@Component({
    selector: 'do-example-nw5s3',
    templateUrl: 'nw5s3.component.html',
    styleUrls: ['nw5s3.component.scss'],
})


export class Nw5s3Component implements OnInit {

    title: 'nw5s3';

    lineLeftUp: any;
    lineRightUp: any;
    lineLeftDown: any;
    lineRightDown: any;
    theme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20066/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineLeftUp = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['全球', '我国', '我国占比'],
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
                            data: result[1],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLabel: {
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
                    yAxis: [
                        {
                            type: 'value',
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
                            name: '全球',
                            type: 'bar',
                            barWidth: '40%',
                            data: result[0],
                        },
                        {
                            yAxisIndex: 0,
                            name: '我国',
                            type: 'bar',
                            barWidth: '40%',
                            data: result[2],
                        },
                        {
                            yAxisIndex: 1,
                            name: '我国占比',
                            type: 'line',
                            data: result[3],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20067/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineRightUp = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['全球设计', '全球制造', '全球封测', '国内设计', '国内制造', '国内封测'],
                        bottom: 0,
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
                            data: result[5],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLabel: {
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
                            name: '全球设计',
                            type: 'line',
                            data: result[0],
                        },
                        {
                            name: '全球制造',
                            type: 'line',
                            data: result[1],
                        },
                        {
                            name: '全球封测',
                            type: 'line',
                            data: result[2],
                        },
                        {
                            name: '国内设计',
                            type: 'line',
                            data: result[3],
                        },
                        {
                            name: '国内制造',
                            type: 'line',
                            data: result[4],
                        },
                        {
                            name: '国内封测',
                            type: 'line',
                            data: result[6],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20068/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineLeftDown = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['设计业销售额', '制造业销售额', '封测业销售额', '设计业销售额增长率', '制造业销售额增长率', '封测业销售额增长率'],
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
                            },
                            axisLabel: {
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
                    yAxis: [
                        {
                            type: 'value',
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
                            name: '设计业销售额',
                            type: 'bar',
                            data: result[4],
                        },
                        {
                            yAxisIndex: 0,
                            name: '制造业销售额',
                            type: 'bar',
                            data: result[6],
                        },
                        {
                            yAxisIndex: 0,
                            name: '封测业销售额',
                            type: 'bar',
                            data: result[1],
                        },
                        {
                            yAxisIndex: 1,
                            name: '设计业销售额增长率',
                            type: 'line',
                            data: result[2],
                        },
                        {
                            yAxisIndex: 1,
                            name: '制造业销售额增长率',
                            type: 'line',
                            data: result[5],
                        },
                        {
                            yAxisIndex: 1,
                            name: '封测业销售额增长率',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20069/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineRightDown = {
                    title: {
                        textStyle: {
                            color: '#64A5E1',
                            fontSize: 20,
                        },
                    },
                    legend: {
                        show: true,
                        data: ['全球', '增速'],
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
                            data: result[1],
                            axisLine: {
                                lineStyle: {
                                    color: '#296FDE',
                                },
                            },
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLabel: {
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
                    yAxis: [
                        {
                            type: 'value',
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
                            name: '',
                            type: 'bar',
                            barWidth: '50%',
                            data: result[2],
                        },
                        {
                            yAxisIndex: 1,
                            name: '',
                            type: 'line',
                            data: result[0],
                        },
                    ],
                };
            },
        );
    }
    JumpGroupClicked(event) {}
}
