import { Injectable } from '@angular/core';

@Injectable()
export class BigdatabaseChartService {
  chartType = [
    { name: '柱状图', value: 'bar' },
    { name: '折线图', value: 'line' },
    { name: '环形图', value: 'pie' },
    // { name: '玫瑰图', value: 'rose' },
    { name: '散点图', value: 'scatter' },
  ];
  constructor() { }
  getChartType() {
    return this.chartType;
  }
  chartOption(type, chartLegend, chartData) {
    let option = {};
    if (type === 'bar') {
      option = this.barOption(chartLegend, chartData);
    } else if (type === 'line') {
      option = this.lineOption(chartLegend, chartData);
    } else if (type === 'pie') {
      option = this.pieOption(chartLegend, chartData);
    } else if (type === 'rose') {
      option = this.roseOption(chartLegend, chartData);
    } else if (type === 'scatter') {
      option = this.scatterOption(chartLegend, chartData);
    }
    return option;
  }
  barOption(chartLegend, chartData) {
    const series = [];
    for (let index = 1; index < chartData.length; index++) {
      series.push({
        type: 'bar',
        name: chartLegend[index - 1],
        data: chartData[index],
        label: {
          normal: {
            show: false,
          },
        },
      });
    }
    const option = {
      color: ['#1e53e8', '#296fdd', '#296fdd', '#73ccba', '#df00fb', '#e33f2e', '#e3762e', '#e39205', '#e4d926',
        '#16a726', '#4ed05e'],
      legend: {
        left: 'center',
        top: 'bottom',
        type: 'scroll',
        data: chartLegend,
        pageButtonItemGap: 6,
        pageIconColor: '#fff',
        pageTextStyle: {
          color: '#fff',
        },
      },
      tooltip: {
        show: true,
      },
      grid: {
        left: '20%',
        right: '10%',
        bottom: '30%',
      },
      xAxis: [
        {
          type: 'category',
          data: chartData[0],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: series,
    };
    return option;
  }
  lineOption(chartLegend, chartData) {
    const series = [];
    for (let index = 1; index < chartData.length; index++) {
      series.push({
        type: 'line',
        name: chartLegend[index - 1],
        data: chartData[index],
        label: {
          normal: {
            show: false,
          },
        },
      });
    }
    const option = {
      color: ['#1e53e8', '#296fdd', '#296fdd', '#73ccba', '#df00fb', '#e33f2e', '#e3762e', '#e39205', '#e4d926',
        '#16a726', '#4ed05e'],
      legend: {
        left: 'center',
        top: 'bottom',
        type: 'scroll',
        data: chartLegend,
        pageButtonItemGap: 6,
        pageIconColor: '#fff',
        pageTextStyle: {
          color: '#fff',
        },
      },
      tooltip: {
        show: true,
      },
      grid: {
        left: '20%',
        right: '10%',
        bottom: '30%',
      },
      xAxis: [
        {
          type: 'category',
          data: chartData[0],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: series,
    };
    return option;
  }
  pieOption(chartLegend, chartData) {
    const pieData = [];
    for (let index = 1; index < chartData.length; index++) {
      pieData.push({
        name: chartLegend[index - 1],
        value: chartData[index][0],
      });
    }
    const option = {
      color: ['#1e53e8', '#296fdd', '#296fdd', '#73ccba', '#df00fb', '#e33f2e', '#e3762e', '#e39205', '#e4d926',
        '#16a726', '#4ed05e'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        left: 'center',
        top: 'bottom',
        type: 'scroll',
        data: chartLegend,
        pageButtonItemGap: 6,
        pageIconColor: '#fff',
        pageTextStyle: {
          color: '#fff',
        },
      },
      series: [{
        type: 'pie',
        radius: ['10%', '55%'],
        center: ['50%', '50%'],
        data: pieData,
      },
      ],
    };
    return option;
  }
  roseOption(chartLegend, chartData) {
    const series = [];
    for (let index = 0; index < chartLegend.length; index++) {
      const data = [];
      for (let i = 0; i < chartData[0].length; i++) {
        data.push({ name: chartData[0][i], value: chartData[index + 1][i] });
      }
      series.push({
        name: chartLegend[index],
        type: 'pie',
        label: {
          normal: {
            show: false,
          },
        },
        radius: [0, 50],
        center: index < 2 ? [200 * (index % 2 + 1) - 100, 50] : [200 * (index % 2 + 1) - 100, 150],
        roseType: 'radius',
        data: data,
      });
    }
    const option = {
      legend: {
        x: 'center',
        y: 'bottom',
        type: 'scroll',
        data: chartData[0],
        pageButtonItemGap: 6,
        pageIconColor: '#fff',
        pageTextStyle: {
          color: '#fff',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: series,
    };
    return option;
  }
  scatterOption(chartLegend, chartData) {
    const series = [];
    const color = ['#1e53e8', '#296fdd', '#296fdd', '#73ccba', '#df00fb', '#e33f2e', '#e3762e',
      '#e39205', '#e4d926', '#16a726', '#4ed05e'];
    for (let index = 1; index < chartData.length; index++) {
      const data = [];
      for (let i = 0; i < chartData[index].length; i++) {
        data.push([chartData[0][i], chartData[index][i]]);
      }
      series.push({
        name: chartLegend[index],
        type: 'scatter',
        data: data,
        itemStyle: {
          normal: {
            color: color[index - 1],
          },
        },
        markArea: {
          silent: true,
          itemStyle: {
            normal: {
              color: 'transparent',
              borderWidth: 1,
              borderType: 'dashed',
            },
          },
          data: [[{
            name: '分布区间',
            xAxis: 'min',
            yAxis: 'min',
          }, {
            xAxis: 'max',
            yAxis: 'max',
          }]],
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
        },
        markLine: {
          lineStyle: {
            normal: {
              type: 'solid',
            },
          },
          data: [
            { type: 'average', name: '平均值' },
          ],
        },
      });
    }
    const option = {
      legend: {
        left: 'center',
        top: 'bottom',
        type: 'scroll',
        data: chartLegend,
        pageButtonItemGap: 6,
        pageIconColor: '#fff',
        pageTextStyle: {
          color: '#fff',
        },
      },
      xAxis: [{
        type: 'value',
        scale: true,
      }],
      yAxis: [{
        type: 'value',
        scale: true,
      }],
      grid: {
        left: '20%',
        right: '20%',
        bottom: '35%',
      },
      series: series,
    };
    return option;
  }
}
