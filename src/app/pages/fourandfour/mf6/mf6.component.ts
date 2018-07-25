import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import Handsontable from 'handsontable';

@Component({
    selector: 'do-example-mf6',
    templateUrl: 'mf6.component.html',
    styleUrls: ['mf6.component.scss'],
})

export class Mf6Component implements OnInit {

    title = 'mf6';
    trendBar: any;
    trendMap: any;
    trendLine: any;
    trendPunch: any;
    theme = 'echart-theme';
    tabItemsRight = ['农副食品加工业',
        '食品制造业',
        '酒、饮料和精制茶制造业',
        '烟草制品业',
        '纺织业',
        '纺织服装、服饰业',
        '皮革、毛皮、羽毛及其制品和制鞋业',
        '木材加工和木、竹、藤、棕、草制品业',
        '家具制造业',
        '造纸和纸制品业',
        '印刷和记录媒介复制业',
        '文教、工美、体育和娱乐用品制造业',
        '石油加工、炼焦和核燃料加工业',
        '化学原料和化学制品制造业',
        '医药制造业',
        '化学纤维制造业',
        '橡胶和塑料制品业',
        '非金属矿物制品业',
        '黑色金属冶炼和压延加工业',
        '有色金属冶炼和压延加工业',
        '金属制品业',
        '通用设备制造业',
        '专用设备制造业',
        '汽车制造业',
        '铁路、船舶、航空航天和其他运输设备制造业',
        '电气机械和器材制造业',
        '计算机、通信和其他电子设备制造业',
        '仪器仪表制造业',
        '其他制造业',
        '废弃资源综合利用业',
        '金属制品、机械和设备修理业',
    ];
    zidian = ['val1',
        'val2',
        'val3',
        'val4',
        'val5',
        'val6',
        'val7',
        'val8',
        'val9',
        'val10',
        'val11',
        'val12',
        'val13',
        'val14',
        'val15',
        'val16',
        'val17',
        'val18',
        'val19',
        'val20',
        'val21',
        'val22',
        'val23',
        'val24',
        'val25',
        'val26',
        'val27',
        'val28',
        'val29',
        'val30',
        'val31',
    ];
    // handsontable 配置
    columns: object[] = [];
    settings: object = {
        contextMenu: {
            callback: (key, options) => {
            },
            items: {
                'showChart': { name: '可视化分析' },
            },
        },
    };
    isLoading: boolean = false;
    table: any[];
    constructor(private http: HttpApi, private transService: DoDatatransService) { }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20227/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.trendBar = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    legend: {
                        show: true,
                        data: ['广东工业增加值累计完成额', '广东工业增加值增速', '全国工业增加值增速'],
                        bottom: '10%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '8%',
                        containLabel: true,
                    },
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
                            name: '(单位：亿元)',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                        {
                            type: 'value',
                            name: '(单位：%)',
                            max: 8,
                            min: 6,
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            scale: true,
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                rotate: 0,
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '广东工业增加值累计完成额',
                            yAxisIndex: 0,
                            type: 'bar',
                            barWidth: '40%',
                            data: result[0],
                        },
                        {
                            name: '广东工业增加值增速',
                            yAxisIndex: 1,
                            type: 'line',
                            data: result[1],
                        },
                        {
                            name: '全国工业增加值增速',
                            yAxisIndex: 1,
                            type: 'line',
                            data: result[2],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20233/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                console.log(result);
                this.trendMap = {
                    title: {
                        text: '',
                        left: '4%',
                        bottom: '18%',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        },
                    },
                    tooltip: { trigger: 'item' },
                    visualMap: {
                        min: 0, max: 20,
                        calculable: true,
                        seriesIndex: 0,
                        textGap: 20,
                        orient: 'horizontal',
                        bottom: '15%',
                        // left: '-2%',/
                        // x: '20%',
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
                        map: 'guangdong',
                        roam: false,
                        top: '5%',
                        zoom: 0.7,
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
                        mapType: 'guangdong',
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
        // this.trendMap = {
        //     tooltip: { trigger: 'item' },
        //     toolbox: {
        //         show: true, orient: 'vertical', left: 'right', top: 'center',
        //         feature: { dataView: { readOnly: false }, restore: {}, saveAsImage: {} },
        //     },
        //     visualMap: {
        //         min: 0, max: 100, calculable: true,
        //         seriesIndex: 0,
        //         textGap: 20,
        //         orient: 'horizontal',
        //         bottom: '6%',
        //         zoom: 0.6,
        //         inRange: {
        //             color: [
        //                 '#f1faff',
        //                 '#017df6',
        //             ],
        //         },
        //         textStyle: {
        //             color: 'white',
        //         },
        //     },
        //     legend: {
        //         orient: 'vertical',
        //         bottom: 'bottom',
        //         data: ['环比增长'],
        //         textStyle: {
        //             color: '#fff',
        //         },
        //     },
        //     series: [{
        //         type: 'map',
        //         mapType: 'guangdong',
        //         roam: false,
        //         label: {
        //             normal: { show: false },
        //             emphasis: { show: true },
        //         },
        //         symbolSize: function (val) {
        //             return 20;
        //         },
        //         data: null,
        //     }],
        // };
        this.http.get<ResponseType>('/api/20228/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.trendLine = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    legend: {
                        show: true,
                        data: ['广东省制造业大数据指数'],
                        bottom: '10%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '8%',
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
                                show: true,
                            },
                            axisLabel: {
                                rotate: 30,
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
                            scale: true,
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLabel: {
                                rotate: 0,
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '广东省制造业大数据指数',
                            type: 'line',
                            data: result[1],
                        },
                    ],
                };
            },
        );

        const data1 = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
            '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p',
            '6p', '7p', '8p', '9p', '10p', '11p'];
        const data2 = ['Saturday', 'Friday', 'Thursday',
            'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
        this.trendPunch = {
            legend: {
                data: ['Punch Card'],
                left: 'right',
            },
            tooltip: {
                position: 'top',
                formatter: function (params) {
                    return params.value[2] + ' commits in ' + data1[params.value[0]]
                        + ' of ' + data2[params.value[1]];
                },
            },
            grid: {
                left: 2,
                bottom: 10,
                right: 10,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: data1,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#999',
                        type: 'dashed',
                    },
                },
                position: 'top',
                axisLine: {
                    show: true,
                },
            },
            yAxis: {
                type: 'category',
                data: data2,
                axisLine: {
                    show: false,
                },
            },
            series: [{
                name: 'Punch Card',
                type: 'scatter',
                symbolSize: function (val) {
                    return val[2] * 2;
                },
                data: [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0],
                [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3],
                [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5],
                [1, 0, 7], [1, 1, 0],
                [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0],
                [1, 9, 0], [1, 10, 5], [1, 11, 2],
                [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7],
                [1, 18, 8], [1, 19, 12], [1, 20, 5],
                [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0],
                [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0],
                [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1],
                [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6],
                [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2],
                [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0],
                [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1],
                [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7],
                [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5],
                [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4],
                [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0],
                [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0],
                [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4],
                [4, 14, 4], [4, 15, 14], [4, 16, 12],
                [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3],
                [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0],
                [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2],
                [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5],
                [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6],
                [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4],
                [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0],
                [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0],
                [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1],
                [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0],
                [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]],
                animationDelay: function (idx) {
                    return idx * 5;
                },
            }],

        };
        this.columns = [
            { data: 'c', title: '地区', width: 150, renderer: 'html' },
        ];
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:forin
        for (const key in this.tabItemsRight) {
            const obj = { data: 'c' + key, title: this.tabItemsRight[key], width: 150, renderer: 'html' };
            this.columns.push(obj);
        }
        const dotSize = ['small', 'middle', 'big'];
        const dotColor = ['bad', 'low', 'good'];
        const tableData = [];
        this.http.get<ResponseType>('/api/22027/all')
            .subscribe(
            data => {
                let j = 0;
                for (const iterator of data.result) {
                    tableData[j] = [];
                    tableData[j].push(iterator.name);
                    for (const key of this.zidian) {
                        tableData[j].push(iterator[key]);
                    }
                    j++;
                }
                this.table = [];
                for (const item of tableData) {
                    const rowData = {
                        'c': '',
                        'c0': '',
                        'c1': '',
                        'c2': '',
                        'c3': '',
                        'c4': '',
                        'c5': '',
                        'c6': '',
                        'c7': '',
                        'c8': '',
                        'c9': '',
                        'c10': '',
                        'c11': '',
                        'c12': '',
                        'c13': '',
                        'c14': '',
                        'c15': '',
                        'c16': '',
                        'c17': '',
                        'c18': '',
                        'c19': '',
                        'c20': '',
                        'c21': '',
                        'c22': '',
                        'c23': '',
                        'c24': '',
                        'c25': '',
                        'c26': '',
                        'c27': '',
                        'c28': '',
                        'c29': '',
                        'c30': '',
                    };
                    for (let i = 0; i < item.length; i++) {
                        if (i > 0) {
                            rowData[this.columns[i]['data']] = '<div class="' + dotSize[item[i][0]]
                                + ' ' + dotColor[item[i][1]] + '"></div>';
                        } else {
                            rowData[this.columns[i]['data']] = item[i];
                        }
                    }
                    this.table.push(rowData);
                }
            });
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20228/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        console.log(result);
                        this.trendLine = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                show: true,
                                data: ['广东省制造业大数据指数'],
                                bottom: '10%',
                                left: 'center',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '8%',
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
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 30,
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
                                    axisTick: {
                                        show: false,
                                    },
                                    scale: true,
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    name: '广东省制造业大数据指数',
                                    type: 'line',
                                    data: result[1],
                                },
                            ],
                        };
                    },
                );

                break;
            case 1:
                this.http.get<ResponseType>('/api/20229/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.trendLine = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                show: true,
                                data: ['广东省工业用电量', '广东省工业用电量(同比增速）'],
                                bottom: '10%',
                                left: 'center',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '8%',
                                containLabel: true,
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[2],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 30,
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
                                    name: '(单位：亿度)',
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                                {
                                    type: 'value',
                                    name: '(单位：%)',
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    name: '广东省工业用电量',
                                    type: 'bar',
                                    barWidth: '40%',
                                    data: result[1],
                                },
                                {
                                    name: '广东省工业用电量(同比增速）',
                                    yAxisIndex: 1,
                                    type: 'line',
                                    data: result[0],
                                },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20230/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.trendLine = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                show: true,
                                data: ['广东省规模以上工业综合能源消费量累计', '广东省规模以上工业综合能源消费量累计(同比增速）'],
                                bottom: '10%',
                                left: 'center',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '8%',
                                containLabel: true,
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[2],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 30,
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
                                    name: '(单位：万吨)',
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                                {
                                    type: 'value',
                                    name: '(单位：%)',
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    name: '广东省规模以上工业综合能源消费量累计',
                                    type: 'bar',
                                    barWidth: '40%',
                                    data: result[1],
                                },
                                {
                                    name: '广东省规模以上工业综合能源消费量累计(同比增速）',
                                    yAxisIndex: 1,
                                    type: 'line',
                                    data: result[0],
                                },
                            ],
                        };
                    },
                );
                break;
            case 3:
                this.http.get<ResponseType>('/api/20231/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.trendLine = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                show: true,
                                data: ['广东省158个园区高速公路货运量同比增速'],
                                bottom: '10%',
                                left: 'center',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '8%',
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
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 30,
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
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    name: '广东省158个园区高速公路货运量同比增速',
                                    type: 'line',
                                    data: result[1],
                                },
                            ],
                        };
                    },
                );
                break;
            case 4:
                this.http.get<ResponseType>('/api/20232/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.trendLine = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                show: true,
                                data: ['广东省制造业中长期贷款余额同比增速'],
                                bottom: '10%',
                                left: 'center',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '8%',
                                containLabel: true,
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: result[1],
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 30,
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
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        rotate: 0,
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [
                                {
                                    name: '广东省制造业中长期贷款余额同比增速',
                                    type: 'line',
                                    data: result[0],
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
