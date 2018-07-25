import { ActivatedRoute } from '@angular/router';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
declare const BMap: any;
declare const BMAP_SATELLITE_MAP: any;
@Component({
    selector: 'do-example-mf4',
    templateUrl: 'mf4.component.html',
    styleUrls: ['mf4.component.scss'],
})

export class Mf4Component implements OnInit {

    title = 'mf4';
    tabItemsArr = ['生产相关指标', '效益相关指标', '能耗相关指标'];
    showEcharts = true;
    trendBar: any;
    trendMap: any;
    trendLine: any;
    product: any;
    productType: any;
    Data: any;
    comName: any;
    theme = 'echart-theme';

    companyName: string;
    companyLon: any;
    companyLat: any;
    constructor(private http: HttpApi, private transService: DoDatatransService, private routrInfo: ActivatedRoute) {
    }

    ngOnInit() {
        this.companyName = this.routrInfo.snapshot.params['name'];
        this.companyLon = this.routrInfo.snapshot.params['lon'];
        this.companyLat = this.routrInfo.snapshot.params['lat'];
        this.http.get<ResponseType>('/api/20027/query?params=name:E:' + this.companyName)
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.trendBar = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        bottom: '15%',
                        data: ['累计工业销售产值(千元)'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 50,
                            end: 100,
                            height: 20,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    ],
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '25%',
                        containLabel: true,
                    },
                    textStyle: {
                        color: '#FCFCFC',
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                        },
                        data: result[1],
                    },
                    yAxis: [{
                        type: 'value',
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                        name: '',
                    }],
                    series: [{
                        name: '累计工业销售产值(千元)',
                        type: 'bar',
                        data: result[2],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20031/query?params=enp_name:E:' + this.companyName)
            .subscribe(
            data => {
                const result = data.result;
                const map = new BMap.Map('allmap', { mapType: BMAP_SATELLITE_MAP });
                map.centerAndZoom(new BMap.Point(this.companyLon, this.companyLat), 15);
                map.enableScrollWheelZoom();
                const bdary = new BMap.Boundary();
                const opts = {
                    width: 100,
                    height: 30,
                    offset: new BMap.Size(0, -20),
                };
                for (const i of result) {
                    const point = new BMap.Point(i.lon, i.lat);
                    const marker = new BMap.Marker(point);
                    map.addOverlay(marker);
                    const infoWindow = new BMap.InfoWindow(i.enp_name, opts);
                    marker.addEventListener('mouseover', function () {
                        map.openInfoWindow(infoWindow, point);
                    });
                }
            },
        );
        this.http.get<ResponseType>('/api/20028/query?params=name:E:' + this.companyName)
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.trendLine = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        bottom: '12%',
                        data: ['累计工业总产值（千元）'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '20%',
                        containLabel: true,
                    },
                    textStyle: {
                        color: '#FCFCFC',
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 50,
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
                            interval: 0,
                            rotate: 0,
                        },
                        data: result[1],
                    },
                    yAxis: [{
                        type: 'value',
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        name: '',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                    }],
                    series: [{
                        name: '累计工业总产值（千元）',
                        type: 'line',
                        data: result[2],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20032/query?params=enp_name:E:' + this.companyName)
            .subscribe(
            data => {
                // const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                // console.log(this.transService.onObjArray(data.result, '', 'ec3-line'));
                this.Data = data.result;
                this.productType = [{ name: '企业标准名称', value: this.Data[0].enp_name },
                { name: '组织机构代码', value: this.Data[0].org_code },
                { name: '通讯地址', value: this.Data[0].address },
                { name: '成立时间', value: this.Data[0].add_time }, { name: '企业规模', value: this.Data[0].enp_scale },
                { name: '统一社会信用代码', value: this.Data[0].enp_credit },
                { name: '企业登记注册类型', value: this.Data[0].ECONOMIC_TYPE },
                { name: '所属行业', value: this.Data[0].industry_code },
                { name: '所属园区', value: this.Data[0].park_name }];
            },
        );
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20028/query?params=name:E:' + this.companyName)
                    .subscribe(
                    data => {
                        const visual = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.trendLine = {
                            tooltip: { trigger: 'axis' },
                            legend: {
                                bottom: '12%',
                                data: ['累计工业总产值（千元）'],
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '20%',
                                containLabel: true,
                            },
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 50,
                                    end: 100,
                                    height: 20,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            ],
                            toolbox: {
                                feature: {
                                    saveAsImage: {},
                                },
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                    interval: 0,
                                    rotate: 0,
                                },
                                data: visual[1],
                            },
                            yAxis: [{
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '',
                                splitNumber: 3,
                            }],
                            series: [{
                                name: '累计工业总产值（千元）',
                                type: 'line',
                                data: visual[2],
                            },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20029/query?params=name:E:' + this.companyName)
                    .subscribe(
                    data => {
                        const visualOne = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.trendLine = {
                            tooltip: { trigger: 'axis' },
                            legend: {
                                bottom: '15%',
                                data: ['累计主营业务收入（千元）', '累计税金（千元）', '累计利润（千元）'],
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '25%',
                                containLabel: true,
                            },
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 50,
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
                                    interval: 0,
                                    rotate: 0,
                                },
                                data: visualOne[4],
                            },
                            yAxis: [{
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                            },
                            {
                                type: 'value',
                                axisTick: {
                                    show: false,
                                },
                                name: '',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                            },
                        ],
                            series: [{
                                name: '累计主营业务收入（千元）',
                                type: 'bar',
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                yAxisIndex: 1,
                                data: visualOne[2],
                            },
                            {
                                name: '累计税金（千元）',
                                yAxisIndex: 0,
                                type: 'line',
                                data: visualOne[1],
                            },
                            {
                                name: '累计利润（千元）',
                                type: 'line',
                                yAxisIndex: 0,
                                data: visualOne[0],
                            },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20030/query?params=name:E:' + this.companyName)
                    .subscribe(
                    data => {
                        const visualright = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.trendLine = {
                            tooltip: { trigger: 'axis' },
                            legend: {
                                bottom: '15%',
                                data: ['累计用电量（万千瓦时）'],
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '25%',
                                containLabel: true,
                            },
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 50,
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
                                    interval: 0,
                                    rotate: 0,
                                },
                                data: visualright[1],
                            },
                            yAxis: [{
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                            }],
                            series: [{
                                name: '累计用电量（万千瓦时）',
                                type: 'line',
                                data: visualright[2],
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
