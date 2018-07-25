import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';
import * as echarts from 'echarts';
import { style } from '@angular/core/src/animation/dsl';


@Component({
  selector: 'do-example-nw6',
  templateUrl: 'nw6.component.html',
  styleUrls: ['nw6.component.scss'],
})


export class Nw6Component implements OnInit {

  title: 'nw6';
  lineLeftUp: any;
  lineRightUp: any;
  lineLeftDown: any;
  lineRightDown: any;
  wordClass = 'theWord';
  wordClass1 = 'theWord1';
  theme = 'echart-theme';

  constructor(private http: HttpApi, private transService: DoDatatransService) {
  }
  tabItems = ['固定宽带普及率', '移动宽带普及率'];
  tabItems1 = ['移动APP应用', '移动开发者分布', '电子商务应用', '共享单车应用', '移动政务应用'];
  text: any;
  text1: any;
  text2: any;
  text3: any;
  textClass = 'textT';
  textClass1 = 'textT1';

  ngOnInit() {
    this.http.get<ResponseType>('/api/20103/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
        // this.lineLeftUp = {
        //   title: {
        //     textStyle: {
        //       color: '#64A5E1',
        //       fontSize: 20,
        //     },
        //   },
        //   legend: {
        //     show: true,
        //     data: ['移动电话用户', '增速'],
        //     bottom: '5%',
        //     right: '4%',
        //     textStyle: {
        //       color: '#fff',
        //     },
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'shadow',
        //     },
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '15%',
        //     top: '15%',
        //     containLabel: true,
        //   },
        //   xAxis: [
        //     {
        //       type: 'category',
        //       data: result[2],
        //       axisLine: {
        //         lineStyle: {
        //           color: '#296FDE',
        //         },
        //       },
        //       axisTick: {
        //         alignWithLabel: true,
        //       },
        //       axisLabel: {
        //         rotate: 0,
        //         textStyle: {
        //           color: '#fff',
        //         },
        //       },
        //       splitLine: {
        //         show: false,
        //       },
        //     },
        //   ],
        //   yAxis: [
        //     {
        //       type: 'value',
        //       name: '(单位：万人)',
        //       axisLine: {
        //         lineStyle: {
        //           color: '#fff',
        //         },
        //       },
        //       splitLine: {
        //         show: false,
        //       },
        //       axisLabel: {
        //         rotate: 0,
        //         textStyle: {
        //           color: '#fff',
        //         },
        //       },
        //     },
        //     {
        //       type: 'value',
        //       name: '(单位：%)',
        //       axisLine: {
        //         lineStyle: {
        //           color: '#fff',
        //         },
        //       },
        //       splitLine: {
        //         show: false,
        //       },
        //     },
        //   ],
        //   series: [
        //     {
        //       yAxisIndex: 0,
        //       name: '移动电话用户',
        //       type: 'bar',
        //       barWidth: '50%',
        //       data: result[1],
        //     },
        //     {
        //       yAxisIndex: 1,
        //       name: '增速',
        //       type: 'line',
        //       data: result[0],
        //     },
        //   ],
        // };
      },
    );
    this.http.get<ResponseType>('/api/20220/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
        this.wordClass = 'theWord';
        this.wordClass1 = 'theWordHidden1';
        this.lineLeftUp = {
          title: {
            text: '',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            show: true,
            orient: 'horizontal',
            data: [
              '数字经济规模',
              '占GDP比重',

            ],
            bottom: '0%',
            right: '10%',
            textStyle: {
              // fontSize: '24',
            },
          },
          grid: {
            height: '50%',
            top: '32%',
          },
          xAxis: {
            data: result[2],
            axisLabel: {
              interval: 0,
            },
          },
          yAxis: [
            {
              type: 'value',
              name: '（单位：%）',
              scale: true,
            },
            // {
            //   type: 'value',
            // //  name: '（单位：%）',

            // },
          ],
          series: [
            {
              //   name: '占GDP比重',
              type: 'line',
              data: result[1],
              label: {
                normal: {
                  show: true,

                },
                emphasis: {
                  show: true,

                },
              },
              markLine: {
                symbol: 'circle',
                lineStyle: {
                  normal:
                    {
                      type: 'solid',
                    },
                },
                label: {
                  normal: {
                    show: true,
                    position: 'middle',
                    formatter: '国家“十三五”规划2020年目标',
                  },
                },
                data: [
                  { yAxis: result[0][0] },
                ],
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#296fdd',
                  }, {
                    offset: 1,
                    color: 'rgba(0,0,0,0)',
                  }]),
                },
              },
            },
          ],
        };
      },
    );
    this.http.get<ResponseType>('/api/20090/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
        // this.text = result[0];
        // this.text1 = result[1];
        // this.text2 = result[2];
        this.text = 171;
        this.text1 = 221;
        this.text2 = 397;
      },
    );
    this.http.get<ResponseType>('/api/20116/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
        this.text3 = result[1];
      },
    );
    this.http.get<ResponseType>('/api/20091/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
        this.textClass1 = 'textHidden1';
        this.lineRightUp = {
          title: {
            textStyle: {
              color: '#64A5E1',
              fontSize: 20,
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
          legend: {
            show: true,
            orient: 'horizontal',
            data: [
              '下载量',
              '应用规模',
            ],
            bottom: '0%',
            right: '10%',
            // textStyle: {
            //   fontSize: '24',
            // },
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
              },
              axisLabel: {
                rotate: 0,
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
              name: '应用规模：个',
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
              name: '下载量：万',
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
              name: '应用规模',
              type: 'bar',
              barWidth: '50%',
              data: result[1],
            },
            {
              name: '下载量',
              yAxisIndex: 1,
              type: 'line',
              data: result[0],
            },
          ],
        };
      },
    );
    this.http.get<ResponseType>('/api/20089/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
        this.lineLeftDown = {
          title: {
            text: '移动数据资费变化趋势',
            // textStyle: {
            //   color: '#64A5E1',
            //   fontSize: 20,
            // },
          },
          legend: {
            show: true,
            data: ['每GB数据流量费用'],
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
              data: result[0],
              axisLine: {
                lineStyle: {
                  color: '#296FDE',
                },
              },
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                interval: 0,
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
              name: '(单位：元)',
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
          ],
          series: [
            {
              name: '每GB数据流量费用',
              type: 'bar',
              barWidth: '50%',
              data: result[1],
              label: {
                normal: {
                  show: true,
                },
              },
            },
          ],
        };
      },
    );
    this.http.get<ResponseType>('/api/2005/all')
      .subscribe(
      data => {
        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
        this.lineRightDown = {
          title: {
            text: '移动数据流量变化趋势',
          },
          legend: {
            show: true,
            data: ['用户月均移动互联网流量'],
            bottom: '5%',
            left: 'right',
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
              },
              axisLabel: {
                interval: 0,
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
              name: '(单位:MB)',
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
          ],
          series: [
            {
              name: '用户月均移动互联网流量',
              type: 'bar',
              data: result[1],
              label: {
                normal: {
                  show: true,
                },
              },
            },
          ],
        };
      },
    );

  }

  btnGroup1Clicked(event) {
    // switch (event) {
    //   case 0:
    //     this.textClass = 'textT';
    //     this.textClass1 = 'textHidden1';
    //     this.http.get<ResponseType>('/api/20091/all')
    //       .subscribe(
    //       data => {
    //         const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
    //         this.textClass1 = 'textHidden1';
    //         this.lineRightUp = {
    //           title: {
    //             textStyle: {
    //               color: '#64A5E1',
    //               fontSize: 20,
    //             },
    //           },
    //           tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //               type: 'shadow',
    //             },
    //           },
    //           grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '15%',
    //             top: '15%',
    //             containLabel: true,
    //           },
    //           legend: {
    //             show: true,
    //             orient: 'horizontal',
    //             data: [
    //               '下载规模',
    //               '应用规模',
    //             ],
    //             bottom: '0%',
    //             right: '10%',
    //             // textStyle: {
    //             //   fontSize: '24',
    //             // },
    //           },
    //           xAxis: [
    //             {
    //               type: 'category',
    //               data: result[2],
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#296FDE',
    //                 },
    //               },
    //               axisTick: {
    //                 alignWithLabel: true,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 interval: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //             },
    //           ],
    //           yAxis: [
    //             {
    //               type: 'value',
    //               name: '应用规模：个',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //             },
    //             {
    //               type: 'value',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //             },
    //           ],
    //           series: [
    //             {
    //               yAxisIndex: 0,
    //               name: '应用规模',
    //               type: 'bar',
    //               barWidth: '50%',
    //               data: result[1],
    //             },
    //             {
    //               name: '下载规模',
    //               yAxisIndex: 1,
    //               type: 'line',
    //               data: result[0],
    //             },
    //           ],
    //         };
    //       },
    //     );
    //     break;
    //   case 1:
    //     this.textClass = 'textHidden';
    //     this.textClass1 = 'textT1',
    //       this.http.get<ResponseType>('/api/20112/all')
    //         .subscribe(
    //         data => {
    //           const result = this.transService.onObjArray(data.result, '', 'ec3-visualMap');
    //           this.lineRightUp = {
    //             tooltip: { trigger: 'item' },
    //             visualMap: {
    //               min: 0, max: 15000, calculable: true,
    //               seriesIndex: 0,
    //               textGap: 20,
    //               orient: 'horizontal',
    //               bottom: '6%',
    //               // inRange: {
    //               //     color: [
    //               //         '#f1faff',
    //               //         '#017df6',
    //               //     ],
    //               // },
    //               textStyle: {
    //                 color: 'white',
    //               },
    //             },
    //             geo: {
    //               map: 'china',
    //               roam: false,
    //               top: '10%',
    //               zoom: 1.2,
    //               layoutCenter: ['50%', '50%'],
    //               label: {
    //                 emphasis: {
    //                   show: false,
    //                 },
    //               },
    //               itemStyle: {
    //                 normal: {
    //                   // areaColor: 'transparent',
    //                   // borderColor: '#818181',
    //                   borderWidth: 1.5,
    //                 },
    //                 emphasis: {
    //                   // areaColor: 'transparent',
    //                   // borderColor: '#818181',
    //                   borderWidth: 1.5,
    //                 },
    //               },
    //             },
    //             series: [{
    //               type: 'map',
    //               mapType: 'china',
    //               geoIndex: 0,
    //               roam: false,
    //               label: {
    //                 normal: { show: false },
    //                 emphasis: { show: true },
    //                 color: '#e33f2e',
    //               },
    //               data: result,
    //             },
    //             ],
    //           };
    //         },
    //       );
    //     break;
    //   case 2:
    //     this.textClass = 'textHidden';
    //     this.textClass1 = 'textHidden1';
    //     this.http.get<ResponseType>('/api/20105/all')
    //       .subscribe(
    //       data => {
    //         const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
    //         this.lineRightUp = {
    //           title: {
    //             text: '电子商务移动APP发展',
    //             // textStyle: {
    //             //   color: '#64A5E1',
    //             //   fontSize: 20,
    //             // },
    //           },
    //           legend: {
    //             show: true,
    //             data: ['应用规模', '下载规模'],
    //             bottom: '5%',
    //             right: '4%',
    //             textStyle: {
    //               color: '#fff',
    //             },
    //           },
    //           tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //               type: 'shadow',
    //             },
    //           },
    //           grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '15%',
    //             top: '15%',
    //             containLabel: true,
    //           },
    //           xAxis: [
    //             {
    //               type: 'category',
    //               data: result[2],
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#296FDE',
    //                 },
    //               },
    //               axisTick: {
    //                 alignWithLabel: true,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //             },
    //           ],
    //           yAxis: [
    //             {
    //               type: 'value',
    //               name: '应用规模：个',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //             },
    //             {
    //               type: 'value',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //             },
    //           ],
    //           series: [
    //             {
    //               yAxisIndex: 0,
    //               name: '应用规模',
    //               type: 'bar',
    //               barWidth: '50%',
    //               data: result[1],
    //               label: {
    //                 normal: {
    //                   show: true,
    //                 },
    //               },
    //             },
    //             {
    //               yAxisIndex: 1,
    //               name: '下载规模',
    //               type: 'line',
    //               data: result[0],
    //               label: {
    //                 normal: {
    //                   show: true,
    //                 },
    //               },
    //             },
    //           ],
    //         };
    //       },
    //     );
    //     break;
    //   case 3:
    //     this.textClass = 'textHidden';
    //     this.textClass1 = 'textHidden1';
    //     this.http.get<ResponseType>('/api/20106/all')
    //       .subscribe(
    //       data => {
    //         const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
    //         this.lineRightUp = {
    //           title: {
    //             text: '共享单车移动APP发展',
    //             // textStyle: {
    //             //   color: '#64A5E1',
    //             //   fontSize: 20,
    //             // },
    //           },
    //           legend: {
    //             show: true,
    //             data: ['应用规模', '下载规模'],
    //             bottom: '5%',
    //             right: '4%',
    //             textStyle: {
    //               color: '#fff',
    //             },
    //           },
    //           tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //               type: 'shadow',
    //             },
    //           },
    //           grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '15%',
    //             top: '15%',
    //             containLabel: true,
    //           },
    //           xAxis: [
    //             {
    //               type: 'category',
    //               data: result[2],
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#296FDE',
    //                 },
    //               },
    //               axisTick: {
    //                 alignWithLabel: true,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //             },
    //           ],
    //           yAxis: [
    //             {
    //               type: 'value',
    //               name: '应用规模：个',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //             },
    //             {
    //               type: 'value',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //             },
    //           ],
    //           series: [
    //             {
    //               yAxisIndex: 0,
    //               name: '应用规模',
    //               type: 'bar',
    //               barWidth: '50%',
    //               data: result[1],
    //               label: {
    //                 normal: {
    //                   show: true,
    //                 },
    //               },
    //             },
    //             {
    //               yAxisIndex: 1,
    //               name: '下载规模',
    //               type: 'line',
    //               data: result[0],
    //               label: {
    //                 normal: {
    //                   show: true,
    //                 },
    //               },
    //             },
    //           ],
    //         };
    //       },
    //     );
    //     break;
    //   case 4:
    //     this.textClass = 'textHidden';
    //     this.textClass1 = 'textHidden1';
    //     this.http.get<ResponseType>('/api/20107/all')
    //       .subscribe(
    //       data => {
    //         const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
    //         this.lineRightUp = {
    //           title: {
    //             text: '政务移动APP发展',
    //             // textStyle: {
    //             //   color: '#64A5E1',
    //             //   fontSize: 20,
    //             // },
    //           },
    //           legend: {
    //             show: true,
    //             data: ['应用规模', '下载规模'],
    //             bottom: '5%',
    //             right: '4%',
    //             textStyle: {
    //               color: '#fff',
    //             },
    //           },
    //           tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //               type: 'shadow',
    //             },
    //           },
    //           grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '15%',
    //             top: '15%',
    //             containLabel: true,
    //           },
    //           xAxis: [
    //             {
    //               type: 'category',
    //               data: result[2],
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#296FDE',
    //                 },
    //               },
    //               axisTick: {
    //                 alignWithLabel: true,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //             },
    //           ],
    //           yAxis: [
    //             {
    //               type: 'value',
    //               name: '应用规模：个',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //             },
    //             {
    //               type: 'value',
    //               axisLine: {
    //                 lineStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //               splitLine: {
    //                 show: false,
    //               },
    //               axisLabel: {
    //                 rotate: 0,
    //                 textStyle: {
    //                   color: '#fff',
    //                 },
    //               },
    //             },
    //           ],
    //           series: [
    //             {
    //               yAxisIndex: 0,
    //               name: '应用规模',
    //               type: 'bar',
    //               barWidth: '50%',
    //               data: result[1],
    //               label: {
    //                 normal: {
    //                   show: true,
    //                 },
    //               },
    //             },
    //             {
    //               yAxisIndex: 1,
    //               name: '下载规模',
    //               type: 'line',
    //               data: result[0],
    //               label: {
    //                 normal: {
    //                   show: true,
    //                 },
    //               },
    //             },
    //           ],
    //         };
    //       },
    //     );
    //     break;
    //   default:
    //     break;
    // }
  }
  btnGroup2Clicked(index) {
    switch (index) {
      case 0:
        this.http.get<ResponseType>('/api/20220/all')
          .subscribe(
          data => {
            const result = this.transService.onObjArray(data.result, '', 'ec3-line');
            this.wordClass = 'theWord';
            this.wordClass1 = 'theWordHidden1';
            this.lineLeftUp = {
              title: {
                text: '',
              },
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                show: true,
                orient: 'horizontal',
                // data: [
                //   '数字经济规模',
                //   '占GDP比重',

                // ],
                bottom: '0%',
                right: '10%',
                textStyle: {
                  // fontSize: '24',
                },
              },
              grid: {
                height: '50%',
                top: '32%',
              },
              xAxis: {
                data: result[2],
                axisLabel: {
                  interval: 0,
                },
              },
              yAxis: [
                {
                  type: 'value',
                  name: '（单位：%）',
                  scale: true,
                },
                // {
                //   type: 'value',
                // //  name: '（单位：%）',

                // },
              ],
              series: [
                {
                  // name: '占GDP比重',
                  type: 'line',
                  data: result[1],
                  label: {
                    normal: {
                      show: true,

                    },
                    emphasis: {
                      show: true,

                    },
                  },
                  markLine: {
                    symbol: 'circle',
                    lineStyle: {
                      normal:
                        {
                          type: 'solid',
                        },
                    },
                    label: {
                      normal: {
                        show: true,
                        position: 'middle',
                        formatter: '国家“十三五”规划2020年目标',
                      },
                    },
                    data: [
                      { yAxis: result[0][0] },
                    ],
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#296fdd',
                      }, {
                        offset: 1,
                        color: 'rgba(0,0,0,0)',
                      }]),
                    },
                  },
                },
              ],
            };
          },
        );
        break;
      case 1:
        this.http.get<ResponseType>('/api/20221/all')
          .subscribe(
          data => {
            const result = this.transService.onObjArray(data.result, '', 'ec3-line');
            this.wordClass = 'theWordHidden';
            this.wordClass1 = 'theWord1';
            console.log(result[0][0]);
            this.lineLeftUp = {
              title: {
                text: '',
              },
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                show: true,
                orient: 'horizontal',
                // data: [
                //   '数字经济规模',
                //   '占GDP比重',

                // ],
                bottom: '0%',
                right: '10%',
                textStyle: {
                  //  fontSize: '24',
                },
              },
              grid: {
                height: '50%',
                top: '32%',
              },
              xAxis: {
                data: result[2],
                axisLabel: {
                  interval: 0,
                },
              },
              yAxis: [
                {
                  type: 'value',
                  scale: true,
                  max: '90',
                  min: '70',
                  name: '（单位：%）',

                },
                // {
                //   type: 'value',
                //   name: '（单位：%）',

                // },
              ],
              series: [
                {
                  // name: '占GDP比重',
                  type: 'line',
                  data: result[1],
                  label: {
                    normal: {
                      show: true,

                    },
                    emphasis: {
                      show: true,

                    },
                  },
                  markLine: {
                    symbol: 'circle',
                    lineStyle: {
                      normal:
                        {
                          type: 'solid',
                        },
                    },
                    label: {
                      normal: {
                        show: true,
                        position: 'middle',
                        formatter: '国家“十三五”规划2020年目标',
                      },
                    },
                    data: [
                      { yAxis: result[0][0] },
                    ],
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#296fdd',
                      }, {
                        offset: 1,
                        color: 'rgba(0,0,0,0)',
                      }]),
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
  JumpGroupClicked(event) { }
}
