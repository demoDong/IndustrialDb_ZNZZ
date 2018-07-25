import { ActivatedRoute, Router } from '@angular/router';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import * as $ from 'jquery';


@Component({
    selector: 'do-example-nw4',
    templateUrl: 'nw4.component.html',
    styleUrls: ['nw4.component.scss'],
})

export class Nw4Component implements OnInit {

    title: 'nw4';
    tabItems = ['漏洞检测数据各省排行', '漏洞类型占比', '漏洞数据舆情与展示'];
    tabItems2 = ['工控系统暴漏设备厂商', '管理对象分布', '分类网站排名'];
    tabItems1 = ['工控系统暴漏设备厂商', '管理对象分布', '分类网站排名'];
    tab1Items: ['1', '2', '3', '4'];
    showChangeNorm_type1 = true;
    pieUp: any;
    mapUp: any;
    barDown: any;
    pieDown: any;
    theme = 'echart-theme';
    nameMap = 'china';
    btnType = ['按信息任务来源划分', '按信息内容类型划分', '按信息（所属网站）备案地划分', '按信息访问来源地划分', '按信息访问量划分'];
    btnActive = [true, false, false, false, false];
    butListNone = false;
    echartWidth = true;
    btnActiveIndex = 0;
    enterprises: any;
    enterprisesNum: any;
    domain: any;
    domainNum: any;
    ip: any;
    ipNum: any;

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    onBtnActive(event, i) {
        this.btnActive.fill(false);
        this.btnActive[i] = true;
        this.btnActiveIndex = i;
        this.http.get<ResponseType>('/api/20040/query?params=type:E:' + this.btnType[this.btnActiveIndex])
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.pieUp = {
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
    }
    ngOnInit() {
        this.http.get<ResponseType>('/api/20040/query?params=type:E:' + this.btnType[this.btnActiveIndex])
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.pieUp = {
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
                this.barDown = {
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
                            type: 'bar',
                            name: '漏洞检测数据各省排行',
                            barWidth: '40%',
                            data: result[1],
                        }],
                };
            },
        );
        this.http.get<ResponseType>('/api/20051/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.pieDown = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    series: [
                        {
                            // name: '访问来源',
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
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20113/all')
            .subscribe(
                data => {
                    const result = this.transService.onObjArray(data.result, '', '');
                    this.enterprises = result[0][0];
                    this.enterprisesNum = result[1][0];
                    this.domain = result[0][1];
                    this.domainNum = result[1][1];
                    this.ip = result[0][2];
                    this.ipNum = result[1][2];
                },
        );
        this.http.get<ResponseType>('/api/20114/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.mapUp = {
                    title: {
                        // text: '全国电信普遍服务试点城市', left: '4%', bottom: '18%',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        },
                    },
                    tooltip: { trigger: 'item' },
                    visualMap: {
                        min: 17, max: 577, calculable: true,
                        seriesIndex: 0,
                        textGap: 20,
                        orient: 'horizontal',
                        bottom: '15%',
                        x: '20%',
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
        this.http.get<ResponseType>('/api/20115/all')
        .subscribe(
        data => {
            const result = this.transService.onObjArray(data.result, '', '');
            console.log('111111111111111111111111111111111111');
            console.log(result);
            $.each(result[0], function(i){
                // tslint:disable-next-line:max-line-length
                $('.rightOne').append('<div><span>' + result[0][i] + '</span><span style="padding-left: 47%;">' + result[1][i]
                + '</span><br></div>');
            });
        },
        );
        window.setTimeout(  () => {

  }, 1);
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.butListNone = false;
                this.echartWidth = true;
                this.http.get<ResponseType>('/api/20040/query?params=type:E:' + this.btnType[this.btnActiveIndex])
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                        this.pieUp = {
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
                break;
            case 1:
                this.butListNone = true;
                this.echartWidth = false;
                this.http.get<ResponseType>('/api/20045/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        this.pieUp = {
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
                                data: ['接入企业数量', '网站数量', '域名数量', 'IP数量',
                                ],
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
                                    name: '网站数量',
                                    type: 'bar',
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
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: result[1],
                                },
                                {
                                    name: '域名数量',
                                    type: 'bar',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: result[2],
                                },
                                {
                                    name: 'IP数量',
                                    type: 'bar',
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: result[3],
                                },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.butListNone = true;
                this.echartWidth = false;
                this.http.get<ResponseType>('/api/20102/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                        this.pieUp = {
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)',
                            },
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
                break;

            default:
                break;
        }

    }
    btnGroup1Clicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20047/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        this.barDown = {
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
                                    type: 'bar',
                                    name: '漏洞检测数据排行',
                                    barWidth: '40%',
                                    data: result[1],
                                }],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20048/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                        this.http.get<ResponseType>('/api/20049/all')
                            .subscribe(
                            data1 => {
                                const result1 = this.transService.onObjArray(data1.result, '', 'ec3-pie');
                                this.barDown = {
                                    series: [
                                        {
                                            type: 'pie',
                                            radius: ['50%', '70%'],
                                            center: ['25%', '50%'],
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
                                                    length: 30,
                                                    length2: 15,
                                                },
                                            },
                                            data: result,
                                        },
                                        {
                                            type: 'pie',
                                            radius: ['50%', '70%'],
                                            center: ['75%', '50%'],
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
                                                    length: 30,
                                                    length2: 15,
                                                },
                                            },
                                            data: result1,
                                        },
                                    ],
                                };
                            },
                        );
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20111/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                        this.barDown = {
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
                                            length: 30,
                                            length2: 15,
                                        },
                                    },
                                    data: result,
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
    btnGroup2Clicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20051/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                        this.pieDown = {
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)',
                            },
                            series: [
                                {
                                    // name: '访问来源',
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
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        },
                                    },
                                },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20052/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                        this.pieDown = {
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)',
                            },
                            series: [
                                {
                                    // name: '访问来源',
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
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        },
                                    },
                                },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20053/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-radia');
                        this.pieDown = {
                            title: {
                                text: '',
                                top: '0',
                            },
                            tooltip: {
                            },
                            legend: {
                                data: result[0].legend,
                                right: '10',
                                bottom: '5%',
                            },
                            radar: {
                                indicator: result[0].indicator,
                                radius: '50%',
                            },
                            series: [
                                {
                                    type: 'radar',
                                    data: result[0].data,
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
    JumpGroupClicked(event) { }
}
