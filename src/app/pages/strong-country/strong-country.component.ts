import { Component, OnInit } from '@angular/core';
import { DoDatatransService } from '../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../shared/do-service/http-api.service';
import * as $ from 'jquery';

@Component({
    selector: 'do-strong-country',
    templateUrl: 'strong-country.component.html',
    styleUrls: ['strong-country.component.scss'],
})
export class StrongCountryComponent implements OnInit {
    constructor(private http: HttpApi, private transService: DoDatatransService, private router: Router,
        private zone: NgZone) {
    }
    fiveMajorAreas = ['制造业创新中心建设工程', '智能制造工程', '工业强基工程', '绿色制造工程', '高端装备创新工程'];
    tenMajorAreas = ['新一代信息技术产业', '高档数控机床和机器人', '航空航天装备', '海洋工程装备及高技术船舶',
        '先进轨道交通装备', '节能与新能源汽车', '电力装备', '农机装备', '新材料', '生物医药及高性能医疗器械'];
    demonstrationArea = ['试点示范城市/城市群', '示范基地'];

    nameMap = 'china';
    theme = 'echart-theme';
    mapOption: any;
    public ngOnInit() {
        this.http.get<ResponseType>('/api/22024/query?params=type:E:' + this.demonstrationArea[0])
            .subscribe(
            data1 => {
                const result1 = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                this.http.get<ResponseType>('/api/22024/query?params=type:E:' + this.demonstrationArea[1])
                    .subscribe(
                    data2 => {
                        const result2 = this.transService.onObjArray(data2.result, '', 'ec3-scatterMap');
                        this.mapOption = {
                            tooltip: {
                                formatter: function (obj) {
                                    return obj.data[2];
                                },
                            },
                            legend: {
                                show: true,
                                itemWidth: 14,
                                itemHeight: 23,
                                data: [this.demonstrationArea[0], this.demonstrationArea[1]],
                                bottom: '20',
                                left: 'center',
                                textStyle: {
                                    fontSize: '24',
                                },
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
                                    name: this.demonstrationArea[0],
                                    type: 'scatter',
                                    itemStyle: {
                                        normal: {
                                            color: '#296FDD',
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
                                        formatter: function (obj) {
                                            console.log(1);
                                            console.log(obj);
                                            return obj.data[2];
                                        },
                                    },
                                    data: result1,
                                },
                                {
                                    name: this.demonstrationArea[1],
                                    type: 'scatter',
                                    itemStyle: {
                                        normal: {
                                            color: '#e33f2e',
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
                                        formatter: function (obj) {
                                            console.log(2);
                                            console.log(obj);
                                            return obj.data[2];
                                        },
                                    },
                                    data: result2,
                                },
                            ],
                        };
                    },
                );
            },
        );



    }

    mapTurn1(index, num) {
        this.setOption('/api/22025/query?params=重点领域:E:' + this.tenMajorAreas[index], 4);
    }
    mapTurn2(index, num) {
        this.setOption('/api/22024/query?params=type:E:' + this.demonstrationArea[index], 2);
    }

    setOption(url, num) {
        this.http.get<ResponseType>(url)
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-scatterMap');
                this.mapOption = {
                    tooltip: {
                        formatter: function (obj) {
                            console.log(obj);
                            return obj.data[num];
                        },
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
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    color: '#296FDD',
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
                            data: result,
                        },
                    ],
                };
            },
        );
    }

}
