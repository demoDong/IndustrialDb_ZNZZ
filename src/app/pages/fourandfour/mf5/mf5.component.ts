import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import * as $ from 'jquery';


@Component({
    selector: 'do-example-mf5',
    templateUrl: 'mf5.component.html',
    styleUrls: ['mf5.component.scss'],
})

export class Mf5Component implements OnInit {

    title = 'mf5';
    constructor(private http: HttpApi, private transService: DoDatatransService) { }
    mf5Option1: any;
    mf5Option2: any;
    mf5Option3: any;
    mf5Option4: any;
    mf5Option5: any;
    mf5Option6: any;
    mf5Option7: any;
    map: string;
    nameMap: string = 'china';
    theme = 'echart-theme';
    tabItemsRight = ['企业及产量分布', '乘用车产量TOP5', '分省市指南', '创新中心'];
    tabItemsLeft = ['电池能量密度', '续航里程', '最高车速'];
    inshowIframe: boolean = false;
    inshowEcharts: boolean = true;
    arr1 = [];
    arr2 = [];

    timeArr = [];
    tab1Arr1 = [];
    tab1Arr2 = [];
    seriesList = [];
    ngOnInit() {

        // 左上左
        this.http.get<ResponseType>('/api/22015/all')
        .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.mf5Option1 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            },
                        },
                    },
                    legend: {
                        data: ['产量', '新能源汽车增速', '汽车产量增速'],
                        textStyle: {
                            color: '#fff',
                        },
                        bottom: '6%',
                    },
                    grid: {
                        top: '25%',
                        bottom: '20%',
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: result[0],
                            axisPointer: {
                                type: 'shadow',
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '（单位：万台）',
                        },
                        {
                            type: 'value',
                            name: '（单位：%）',
                        },
                    ],
                    series: [
                        {
                            yAxisIndex: 0,
                            name: '产量',
                            type: 'bar',
                            barWidth: '30%',
                            data: result[3],
                        },
                        {
                            name: '新能源汽车增速',
                            type: 'line',
                            yAxisIndex: 1,
                            data: result[2],
                        },
                        {
                            name: '汽车产量增速',
                            type: 'line',
                            yAxisIndex: 1,
                            data: result[1],
                        },
                    ],
                };
            },
        );

        // 左上右
        this.http.get<ResponseType>('/api/22000/query?params=Year:E:2015')
        .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.mf5Option2  = {
                    title: {
                        text: '主要国家新能源汽车销量占比',
                        bottom: '6%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['40%', '60%'],
                            avoidLabelOverlap: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside',
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
                                },
                            },
                            data: result,
                        },
                    ],
                };
            },
        );

        // 右下左
        this.http.get<ResponseType>('/api/22016/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.arr1 = [];
                this.arr2 = [];
                data.result.forEach(
                    p => {
                        if (p.type === '国内') {
                            this.arr1.push(p.value);
                            this.arr2.push('');
                        }else {
                            this.arr2.push(p.value);
                            this.arr1.push('');
                        }
                    },
                );
                this.mf5Option5 =  {
                    color: ['#E13F2E', '#2A73E2'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    legend: {
                        data: ['国内', '国外'],
                        bottom: '2%',
                    },
                    grid: {
                        left: '3%',
                        right: '26%',
                        bottom: '10%',
                        containLabel: true,
                    },
                    xAxis: {
                        name: '（单位：万辆）',
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        position: 'top',
                    },
                    yAxis: {
                        type: 'category',
                        data: result[0],
                    },
                    series: [
                        {
                            name: '国内',
                            type: 'bar',
                            data: this.arr1,
                            stack: '总量',
                        },
                        {
                            name: '国外',
                            type: 'bar',
                            data: this.arr2,
                            stack: '总量',
                        },
                    ],
                };
            },
        );

        // 右下右_上
        this.http.get<ResponseType>('/api/22004/all')
        .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.mf5Option6  = {
                    title: {
                        text: '2016年乘用车前10企业市场占比：' +
                          Math.round((100 - result[data.result.length - 1].value) * 100) / 100 + '%',
                        bottom: '4%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    series: [
                        {
                            type: 'pie',
                            center: ['50%', '44%'],
                            radius: ['32%', '52%'],
                            avoidLabelOverlap: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside',
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
                                },
                            },
                            data: result,
                        },
                    ],
                };
            },
        );

        // 右下右_下
        this.http.get<ResponseType>('/api/22005/all')
        .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-pie');
                this.mf5Option7  = {
                    title: {
                        text: '2016年客车前10企业市场占比：' +
                         Math.round((100 - result[data.result.length - 1].value) * 100) / 100 + '%',
                        bottom: '2%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    series: [
                        {
                            type: 'pie',
                            center: ['50%', '34%'],
                            radius: ['32%', '52%'],
                            avoidLabelOverlap: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside',
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
                                },
                            },
                            data: result,
                        },
                    ],
                };
            },
        );

        this.btnGroupRightClicked(0);

    }


    // 右上
    btnGroupRightClicked (index) {
        switch (index) {
            case 0:
                this.inshowIframe = false;
                this.inshowEcharts = true;
                this.timeArr = [];
                this.http.get<ResponseType>('/api/22017/all')
                .subscribe(
                    data1 => {
                        let result1;
                        result1 = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        this.http.get<ResponseType>('/api/22018/all')
                            .subscribe(
                            data2 => {
                                let result2;
                                result2 = this.transService.onObjArray(data2.result, '', 'ec3-visualMap');
                                data2.result.forEach(
                                    p => {
                                        this.timeArr.push(p.YEAR);
                                    },
                                );
                                this.timeArr = $.unique(this.timeArr);
                                this.timeArr.forEach(
                                p => {
                                        result1.forEach(
                                        q => {
                                                if (q[2] === p) {
                                                    this.tab1Arr1.push(q);
                                                }
                                            },
                                        );
                                        result2.forEach(
                                            o => {
                                                if (o.YEAR === p) {
                                                    this.tab1Arr2.push(o);
                                                }
                                            },
                                        );

                                        this.seriesList.push(
                                            {
                                                series: [{
                                                    name: '企业',
                                                    data: this.tab1Arr1,
                                                }, {
                                                    name: '',
                                                    type: 'map',
                                                    geoIndex: 0,
                                                    data: this.tab1Arr2,
                                                },
                                            ],
                                            });
                                        this.tab1Arr1 = [];
                                        this.tab1Arr2 = [];
                                    },
                                );
                                this.mf5Option3 = {
                                    baseOption: {
                                        tooltip: {
                                            formatter: function(obj){
                                                return obj.data[4];
                                            },
                                        },
                                        legend: {
                                            data: ['企业'],
                                            top: 'middle',
                                            right: '20%',
                                        },
                                        timeline: {
                                            currentIndex: 5,
                                            data: this.timeArr,
                                            bottom: '45',
                                        },
                                        visualMap: {
                                            min: 0,
                                            max: 50000,
                                            left: '30',
                                            bottom: '70',
                                            orient: 'vertical',
                                            textStyle: {
                                                color: '#fff',
                                            },
                                            seriesIndex: [1],
                                            calculable: true,
                                        },
                                        geo: {
                                            map: 'china',
                                            roam: true,
                                            label: {
                                                normal: {
                                                    show: true,
                                                },
                                            },
                                            bottom: '40',
                                            zoom: 1.5,
                                        },
                                        series: [{
                                            type: 'scatter',
                                            itemStyle: {
                                                normal: {
                                                    color: '#F06C00',
                                                },
                                            },
                                            animation: false,
                                            coordinateSystem: 'geo',
                                            symbolSize: 10,
                                            rippleEffect: {
                                                brushType: 'stroke',
                                                scale: 7,
                                            },
                                            label: {
                                                normal: {
                                                    show: false,
                                                },
                                                emphasis: {
                                                    show: false,
                                                },
                                            },
                                            tooltip: {
                                                padding: 10,
                                                backgroundColor: '#222',
                                                borderColor: '#777',
                                                borderWidth: 1,
                                            },
                                        }, {
                                            name: '',
                                            type: 'map',
                                            geoIndex: 0,
                                            data: [],
                                        },
                                    ],
                                    },
                                    options: this.seriesList,
                                };
                            },
                        );
                    },
                );
                break;
            case 1:
                this.inshowEcharts = false;
                this.inshowIframe = true;
                break;
            case 2:
                this.inshowIframe = false;
                this.inshowEcharts = true;
                this.http.get<ResponseType>('/api/22020/all')
                .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                        this.mf5Option3 = {
                            // title: {
                            //     text: '产量',
                            //     right: 120,
                            //     bottom: 60,
                            // },
                            tooltip: {
                                formatter: function(obj){
                                    return obj.data[3];
                                },
                            },
                            legend: {
                                data: ['企业、园区'],
                                top: 'middle',
                                right: '20%',
                            },
                            geo: {
                                map: 'china',
                                roam: true,
                                label: {
                                    normal: {
                                        show: true,
                                    },
                                },
                            },
                            series: [
                                    {
                                   name: '企业、园区',
                                    type: 'scatter',
                                    itemStyle: {
                                        normal: {
                                            color: '#F06C00',
                                        },
                                    },
                                    animation: false,
                                    coordinateSystem: 'geo',
                                    // symbol: 'image://easyreport/../../../assets/images/mapDotting2.png',
                                    symbolSize: 10,
                                    rippleEffect: {
                                        brushType: 'stroke',
                                        scale: 7,
                                    },
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                        emphasis: {
                                            show: false,
                                        },
                                    },
                                    tooltip: {
                                        padding: 10,
                                        backgroundColor: '#222',
                                        borderColor: '#777',
                                        borderWidth: 1,
                                        // formatter: function(obj) {
                                        // 	var value = obj.value;
                                        // 	return value[2];
                                        // }
                                    },
                                    data: result,
                                },
                            ],
                        };
                    },
                );
                break;
            case 3:
                this.inshowIframe = false;
                this.inshowEcharts = true;
                this.http.get<ResponseType>('/api/22008/all')
                .subscribe(
                    data => {
                    const result = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                            this.mf5Option3 = {
                                // title: {
                                //     text: '产量',
                                //     right: 120,
                                //     bottom: 60,
                                // },
                                tooltip: {
                                    formatter: function(obj){
                                        return obj.data[2];
                                    },
                                },
                                legend: {
                                    data: ['创新中心'],
                                    top: 'middle',
                                    right: '20%',
                                },
                                geo: {
                                    map: 'china',
                                    roam: true,
                                    label: {
                                        normal: {
                                            show: true,
                                        },
                                    },
                                },
                                series: [
                                    {
                                        name: '创新中心',
                                        type: 'scatter',
                                        itemStyle: {
                                            normal: {
                                                color: '#F06C00',
                                            },
                                        },
                                        animation: false,
                                        coordinateSystem: 'geo',
                                        symbolSize: 10,
                                        rippleEffect: {
                                            brushType: 'stroke',
                                            scale: 7,
                                        },
                                        label: {
                                            normal: {
                                                show: false,
                                            },
                                            emphasis: {
                                                show: false,
                                            },
                                        },
                                        tooltip: {
                                            padding: 10,
                                            backgroundColor: '#222',
                                            borderColor: '#777',
                                            borderWidth: 1,
                                            // formatter: function(obj) {
                                            // 	var value = obj.value;
                                            // 	return value[4];
                                            // }
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


}
