import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
    selector: 'do-example-mf14',
    templateUrl: 'mf14.component.html',
    styleUrls: ['mf14.component.scss'],
})

export class Mf14Component implements OnInit {
    theme = 'echart-theme';
    title: string = '全国工业增长趋势';
    showTitle = true;
    nameMap = 'china';
    trendLine: any;
    growthMap: any;
    indexLine: any;
    growBarh: any;

    showEcharts = true;


    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20002/all')
            .subscribe(
            data => {
                const visual = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
                this.http.get<ResponseType>('/api/20003/all')
                    .subscribe(
                    data1 => {
                        const scatter = this.transService.onObjArray(data1.result, '', 'ec3-scatterMap');
                        this.trendLine = {
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
                                //         '#f15faff',
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
                                data: visual,
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
    }
}
