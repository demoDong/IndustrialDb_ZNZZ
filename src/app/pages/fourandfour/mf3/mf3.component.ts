import { RouteCacheService } from './../../../shared/do-service/route-cache.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
declare const BMap: any;
declare const BMAP_SATELLITE_MAP: any;
@Component({
    selector: 'do-example-mf3',
    templateUrl: 'mf3.component.html',
    styleUrls: ['mf3.component.scss'],
})

export class Mf3Component implements OnInit {

    title = 'mf3';
    theme = 'echart-theme';
    showContainerTitle = false;
    showEcharts = true;
    map = 'guizhou';

    tabItemsArr = ['投资', '就业', '资产', '负债'];
    mf3Option1: any;
    mf3Option2: any;
    mf3Option3: any;
    mf3Option4: any;

    parkName: string;
    parkLon: any;
    parkLat: any;

    constructor(private http: HttpApi, private transService: DoDatatransService, private routrInfo: ActivatedRoute,
        private routeCacheService: RouteCacheService, private router: Router) { }

    ngOnInit() {
        this.parkName = this.routrInfo.snapshot.params['name'];
        this.parkLon = this.routrInfo.snapshot.params['lon'];
        this.parkLat = this.routrInfo.snapshot.params['lat'];
        this.routeCacheService.assignmentUrl(this.parkName, this.parkLon, this.parkLat);

        this.http.get<ResponseType>('/api/20012/query?params=name:E:' + this.parkName)
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.mf3Option1 = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        orient: 'vertical',
                        bottom: '15%',
                        data: ['工业增加值增速(%)'],
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
                        },
                    ],
                    textStyle: {
                        color: '#FCFCFC',
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#3b6ca1',
                                width: '2',
                            },
                        },
                        data: result[1],
                    },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        name: '',
                        splitNumber: 3,
                        boundaryGap: [0.05, 0.05],
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#3b6ca1',
                                width: '2',
                            },
                        },
                    },
                    series: [{
                        name: '工业增加值增速(%)',
                        type: 'line',
                        data: result[2],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20025/query?params=park_name:E:' + this.parkName)
            .subscribe(
            data => {
                const result = data.result;
                const map = new BMap.Map('allmap', { mapType: BMAP_SATELLITE_MAP });
                map.centerAndZoom(new BMap.Point(this.parkLon, this.parkLat), 13);
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
                    marker.addEventListener('mouseout', function () {
                        map.closeInfoWindow();
                    });
                    marker.addEventListener('click', () => {
                        this.router.navigate(['pages/mf4', { name: i.enp_name, lon: i.lon, lat: i.lat }]);
                    });
                }
            },
        );
        this.http.get<ResponseType>('/api/20013/query?params=name:E:' + this.parkName)
            .subscribe(
            data => {
                const line1 = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.mf3Option3 = {
                    tooltip: { trigger: 'axis' },
                    legend: {
                        bottom: '12%',
                        data: ['本月投资（万元）'],
                        textStyle: {
                            color: 'white',
                        },
                    },
                    grid: {
                        left: '3%', top: 40,
                        right: '4%', bottom: '20%',
                        containLabel: true,
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 80,
                            end: 100,
                            height: 20,
                        },
                    ],
                    textStyle: {
                        color: '#FCFCFC',
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#3b6ca1',
                                width: '2',
                            },
                        },
                        data: line1[1],
                    },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        axisTick: {
                            show: false,
                        },
                        name: '',
                        splitNumber: 3,
                        boundaryGap: [0.05, 0.05],
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3b6ca1',
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#3b6ca1',
                                width: '2',
                            },
                        },
                    },
                    series: [{
                        name: '本月投资（万元）',
                        type: 'line',
                        data: line1[2],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20026/query?params=park_name:E:' + this.parkName)
            .subscribe(
            data => {
                const line1 = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.mf3Option4 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true,
                    },
                    xAxis: {
                        type: 'value',
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    yAxis: {
                        type: 'category',
                        data: line1[1],
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                color: '#fff',
                                fontSize: '14',
                            },
                        },
                        // splitLine : {
                        //   show: false,
                        // },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            barWidth: '50%',
                            data: line1[0],
                        },
                    ],
                };
            },
        );
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20013/query?params=name:E:' + this.parkName)
                    .subscribe(
                    data => {
                        const line1 = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.mf3Option3 = {
                            tooltip: { trigger: 'axis' },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '20%',
                                containLabel: true,
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 80,
                                    end: 100,
                                    height: 20,
                                },
                            ],
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                                data: line1[1],
                            },
                            yAxis: {
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '(单位：万元)',
                                splitNumber: 3,
                                boundaryGap: [0.05, 0.05],
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                            },
                            legend: {
                                bottom: '12%',
                                data: ['本月投资（万元）'],
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            series: [{
                                name: '本月投资（万元）',
                                type: 'line',
                                data: line1[2],
                            },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20014/query?params=name:E:' + this.parkName)
                    .subscribe(
                    data => {
                        const line1 = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.mf3Option3 = {
                            tooltip: { trigger: 'axis' },
                            legend: {
                                bottom: '12%',
                                data: ['期末从业人员数(个)'],
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '20%',
                                containLabel: true,
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 80,
                                    end: 100,
                                    height: 20,
                                },
                            ],
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                                data: line1[1],
                            },
                            yAxis: {
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '',
                                splitNumber: 3,
                                boundaryGap: [0.05, 0.05],
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                            },
                            series: [{
                                name: '期末从业人员数(个)',
                                type: 'line',
                                data: line1[2],
                            },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20015/query?params=name:E:' + this.parkName)
                    .subscribe(
                    data => {
                        const line1 = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.mf3Option3 = {
                            tooltip: { trigger: 'axis' },
                            legend: {
                                bottom: '12%',
                                data: ['园区资产（万元）'],
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '20%',
                                containLabel: true,
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 80,
                                    end: 100,
                                    height: 20,
                                },
                            ],
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                                data: line1[1],
                            },
                            yAxis: {
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '',
                                splitNumber: 3,
                                boundaryGap: [0.05, 0.05],
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                            },
                            series: [{
                                name: '园区资产（万元）',
                                type: 'line',
                                data: line1[2],
                            },
                            ],
                        };
                    },
                );
                break;
            case 3:
                this.http.get<ResponseType>('/api/20016/query?params=name:E:' + this.parkName)
                    .subscribe(
                    data => {
                        const line1 = this.transService.onObjArray(data.result, '', 'ec3-line');
                        console.log(this.transService.onObjArray(data.result, '', 'ec3-line'));
                        this.mf3Option3 = {
                            tooltip: { trigger: 'axis' },
                            legend: {
                                bottom: '12%',
                                data: ['园区累计债务（万元）'],
                                textStyle: {
                                    color: 'white',
                                },
                            },
                            grid: {
                                left: '3%', top: 40,
                                right: '4%', bottom: '20%',
                                containLabel: true,
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 80,
                                    end: 100,
                                    height: 20,
                                },
                            ],
                            textStyle: {
                                color: '#FCFCFC',
                            },
                            xAxis: {
                                type: 'category',
                                axisLabel: {
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                                data: line1[1],
                            },
                            yAxis: {
                                type: 'value',
                                scale: true,
                                axisTick: {
                                    show: false,
                                },
                                name: '',
                                splitNumber: 3,
                                boundaryGap: [0.05, 0.05],
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#3b6ca1',
                                    },
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#3b6ca1',
                                        width: '2',
                                    },
                                },
                            },
                            series: [{
                                name: '园区累计债务（万元）',
                                type: 'line',
                                data: line1[2],
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
