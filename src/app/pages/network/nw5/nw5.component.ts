import { ActivatedRoute, Router } from '@angular/router';
import { DoContainerComponent } from './../../../shared/do-container/do-container.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DoDatatransService } from '../../../shared/do-service/do-datatrans.service';

@Component({
    selector: 'do-example-nw5',
    templateUrl: 'nw5.component.html',
    styleUrls: ['nw5.component.scss'],
})


export class Nw5Component implements OnInit {

    title: 'nw5';
    tabItems = ['我国高科技产品出口金额占全球比例', '企业竞争力']; //  '产品出口竞争力'
    tab1Items = ['集成电路', '平板展示'];
    tab2Items = ['国内手机占比', '国内手机技术进展', '龙头企业成长'];
    tab3Items = ['研发投入强度', '研发投入金额', 'ICT专利数量'];
    lineLeftUp: any;
    lineRightUp: any;
    barDown: any;
    lineRightDown: any;
    theme = 'echart-theme';

    constructor(private http: HttpApi, private transService: DoDatatransService,
        private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.http.get<ResponseType>('/api/20058/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineLeftUp = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    legend: {
                        show: true,
                        data: ['手机', '基站', '彩电', '液晶显示板'],
                        bottom: '11%',
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
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                //   rotate: 30,
                                interval: 0,
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
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                    ],
                    series: [{
                        name: '彩电',
                        type: 'line',
                        data: result[1],
                    },
                    {
                        name: '基站',
                        type: 'line',
                        data: result[2],
                    },
                    {
                        name: '手机',
                        type: 'line',
                        data: result[3],
                    },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20075/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                console.log(result);
                this.lineRightUp = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '10%',
                        containLabel: true,
                    },
                    legend: {
                        data: ['制造业', '计算机、通信和其他手机制造业'],
                        textStyle: {
                            color: '#fff',
                        },
                        bottom: '10%',
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
                                show: false,
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
                            // name: '(单位：%)',
                            show: false,

                            axisLine: {
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
                                show: false,
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                        },
                        {
                            type: 'value',
                            name: '',
                            show: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            yAxisIndex: 0,
                            name: '制造业',
                            type: 'line',
                            barWidth: '40%',
                            data: result[1],
                        },
                        {
                            yAxisIndex: 1,
                            name: '计算机、通信和其他手机制造业',
                            type: 'line',
                            data: result[2],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20064/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                this.barDown = {
                    title: {
                        text: '集成电路产业链各环节营收',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '10%',
                        containLabel: true,
                    },
                    legend: {
                        data: ['设计业', '制造业', '封测业', '产业增速'],
                        textStyle: {
                            color: '#fff',
                        },
                        bottom: '10%',
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
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                //  rotate: 30,
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
                            // name: '（单位：MB）',
                            //  min: 0,
                            //  max: 2500,
                            nameTextStyle: {
                                color: '#72b1ff',
                                fontSize: '14',
                            },
                            textStyle: {
                                color: '#fff',
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '14',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#3b6ca1',
                                    width: '2',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        },
                        {
                            type: 'value',
                            // min: 0,
                            // max: 100,
                            name: '（单位：%）',
                            nameTextStyle: {
                                color: '#72b1ff',
                                fontSize: '14',
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '14',
                                },
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#3b6ca1',
                                    width: '2',
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        },
                    ],
                    series: [
                        {
                            yAxisIndex: 1,
                            name: '产业增速',
                            type: 'line',
                            barWidth: '40%',
                            data: result[0],
                        },
                        {
                            yAxisIndex: 0,
                            name: '设计业',
                            type: 'bar',
                            stack: 'a',
                            barWidth: '40%',
                            data: result[2],
                        },
                        {
                            yAxisIndex: 0,
                            name: '制造业',
                            type: 'bar',
                            stack: 'a',
                            barWidth: '40%',
                            data: result[3],
                        },
                        {
                            yAxisIndex: 0,
                            name: '封测业',
                            type: 'bar',
                            stack: 'a',
                            data: result[4],
                        },
                    ],
                };
            },
        );
        this.http.get<ResponseType>('/api/20078/all')
            .subscribe(
            data => {
                const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                this.lineRightDown = {
                    title: {
                        text: '国内手机市场国产手机出货量占比',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '25%',
                        top: '10%',
                        containLabel: true,
                    },
                    legend: {
                        show: true,
                        data: ['整体手机中国产品牌占货量比（%）', '智能机中国产品牌占出货量（%）'],
                        bottom: '13%',
                        textStyle: {
                            color: '#fff',
                        },
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
                                alignWithLabel: true,
                                show: true,
                            },
                            axisLabel: {
                                // rotate: 30,
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
                                lineStyle: {
                                    color: '#fff',
                                },
                            },
                            splitLine: {
                                show: true,
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
                            name: '智能机中国产品牌占出货量（%）',
                            type: 'line',
                            data: result[0],
                        },
                        {
                            name: '整体手机中国产品牌占货量比（%）',
                            type: 'line',
                            data: result[2],
                        },
                    ],
                };
            },
        );
    }
    btnGroupClicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20075/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        console.log(result);
                        this.lineRightUp = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                data: ['制造业', '计算机、通信和其他手机制造业'],
                                textStyle: {
                                    color: '#fff',
                                },
                                bottom: '10%',
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
                                        show: false,
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
                                    // name: '(单位：%)',
                                    show: false,

                                    axisLine: {
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
                                        show: false,
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                                {
                                    type: 'value',
                                    name: '',
                                    show: false,
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                },
                            ],
                            series: [
                                {
                                    yAxisIndex: 0,
                                    name: '制造业',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[1],
                                },
                                {
                                    yAxisIndex: 1,
                                    name: '计算机、通信和其他手机制造业',
                                    type: 'line',
                                    data: result[2],
                                },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20074/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        console.log(result);
                        this.lineRightUp = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                data: ['研发投入规模（亿元）', '研发投入增速（%）'],
                                textStyle: {
                                    color: '#fff',
                                },
                                bottom: '10%',
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
                                        rotate: 0,
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
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
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
                                    name: '',
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
                                    name: '研发投入规模（亿元）',
                                    type: 'bar',
                                    barWidth: '40%',
                                    data: result[1],
                                },
                                {
                                    yAxisIndex: 1,
                                    name: '研发投入增速（%）',
                                    type: 'line',
                                    data: result[2],
                                },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20076/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        console.log(result);
                        this.lineRightUp = {
                            title: {
                                text: '各国ICT领域专利数量',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                data: ['中国', '美国', '日本', '韩国', '德国', '英国', '法国'],
                                textStyle: {
                                    color: '#fff',
                                },
                                bottom: '11%',
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
                                        rotate: 0,
                                        show: true,
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
                                    //   name: '(单位：%)',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
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
                                    name: '中国',
                                    type: 'line',
                                    data: result[0],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    name: '美国',
                                    type: 'line',
                                    data: result[1],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    name: '日本',
                                    type: 'line',
                                    data: result[2],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    name: '韩国',
                                    type: 'line',
                                    data: result[3],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    name: '德国',
                                    type: 'line',
                                    data: result[5],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    name: '英国',
                                    type: 'line',
                                    data: result[6],
                                    label: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                },
                                {
                                    name: '法国',
                                    type: 'line',
                                    data: result[7],
                                    label: {
                                        normal: {
                                            show: false,
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
    btnGroup1Clicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20064/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        this.barDown = {
                            title: {
                                text: '集成电路产业链各环节营收',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                data: ['设计业', '制造业', '封测业', '产业增速'],
                                textStyle: {
                                    color: '#fff',
                                },
                                bottom: '10%',
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
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
                                        //  rotate: 30,
                                        show: true,
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
                                    // name: '（单位：MB）',
                                    //  min: 0,
                                    //  max: 2500,
                                    nameTextStyle: {
                                        color: '#72b1ff',
                                        fontSize: '14',
                                    },
                                    textStyle: {
                                        color: '#fff',
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: '14',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            color: '#3b6ca1',
                                            width: '2',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                },
                                {
                                    type: 'value',
                                    // min: 0,
                                    // max: 100,
                                    name: '（单位：%）',
                                    nameTextStyle: {
                                        color: '#72b1ff',
                                        fontSize: '14',
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: '14',
                                        },
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            color: '#3b6ca1',
                                            width: '2',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                },
                            ],
                            series: [
                                {
                                    yAxisIndex: 1,
                                    name: '产业增速',
                                    type: 'line',
                                    barWidth: '40%',
                                    data: result[0],
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '设计业',
                                    type: 'bar',
                                    stack: 'a',
                                    barWidth: '40%',
                                    data: result[2],
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '制造业',
                                    type: 'bar',
                                    stack: 'a',
                                    barWidth: '40%',
                                    data: result[3],
                                },
                                {
                                    yAxisIndex: 0,
                                    name: '封测业',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[4],
                                },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20065/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        console.log(result);
                        this.barDown = {
                            title: {
                                text: '全区分区域平板显示产能占比',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                data: ['中国大陆', '中国台湾', '日本', '韩国'],
                                textStyle: {
                                    color: '#fff',
                                },
                                bottom: '10%',
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
                                        // rotate: 30,
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
                                    name: '（单位：%）',
                                    //  min: 0,
                                    //  max: 2500,
                                    nameTextStyle: {
                                        color: '#72b1ff',
                                        fontSize: '14',
                                    },
                                    textStyle: {
                                        color: '#fff',
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: '14',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            color: '#3b6ca1',
                                            width: '2',
                                        },
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                },
                            ],
                            series: [
                                {
                                    name: '中国大陆',
                                    type: 'bar',
                                    stack: 'a',
                                    barWidth: '40%',
                                    data: result[0],
                                },
                                {
                                    name: '中国台湾',
                                    type: 'bar',
                                    stack: 'a',
                                    barWidth: '40%',
                                    data: result[1],
                                },
                                {
                                    name: '日本',
                                    type: 'bar',
                                    stack: 'a',
                                    barWidth: '40%',
                                    data: result[2],
                                },
                                {
                                    name: '韩国',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[3],
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
                this.http.get<ResponseType>('/api/20078/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.lineRightDown = {
                            title: {
                                text: '国内手机市场国产手机出货量占比',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                show: true,
                                data: ['整体手机中国产品牌占货量比（%）', '智能机中国产品牌占出货量（%）'],
                                bottom: '13%',
                                textStyle: {
                                    color: '#fff',
                                },
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
                                        alignWithLabel: true,
                                        show: true,
                                    },
                                    axisLabel: {
                                        // rotate: 30,
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
                                    name: '',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
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
                                    name: '智能机中国产品牌占出货量（%）',
                                    type: 'line',
                                    data: result[0],
                                },
                                {
                                    name: '整体手机中国产品牌占货量比（%）',
                                    type: 'line',
                                    data: result[2],
                                },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20079/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.lineRightDown = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
                                containLabel: true,
                            },
                            legend: {
                                show: true,
                                data: ['2G手机出货量占比（%）', '3G手机出货量占比（%）', '4G手机出货量占比（%）'],
                                bottom: '13%',
                                textStyle: {
                                    color: '#fff',
                                },
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
                                    name: '',
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
                                    name: '2G手机出货量占比（%）',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[3],
                                },
                                {
                                    name: '3G手机出货量占比（%）',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[2],
                                },
                                {
                                    name: '4G手机出货量占比（%）',
                                    type: 'bar',
                                    stack: 'a',
                                    data: result[1],
                                },
                            ],
                        };
                    },
                );
                break;
            case 2:
                this.http.get<ResponseType>('/api/20085/query?params=data_time:B:2010,2015').subscribe(
                    data => {
                        const dateArr = [];
                        const dataMap_cn = {};
                        const dataMap_fn = {};
                        const xAxisData = {};
                        const tmpOption: any = {
                            timeline: {
                                data: [],
                                bottom: '10%',
                                axisType: 'category',
                                show: true,
                                autoPlay: true,
                                playInterval: 3000,
                            },
                            options: [{
                                title: {
                                    text: '全球手机市场份额TOP10',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                        type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                    },
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '25%',
                                    top: '10%',
                                    containLabel: true,
                                },
                                legend: {
                                    show: true,
                                    data: ['国内品牌', '国外品牌'],
                                    bottom: 0,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                                xAxis: [
                                    {
                                        type: 'category',
                                        data: [],
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
                                        name: '',
                                        axisLine: {
                                            lineStyle: {
                                                color: '#fff',
                                            },
                                        },
                                        splitLine: {
                                            show: true,
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
                                        name: '国内品牌',
                                        type: 'bar',
                                        barGap: '-100%',
                                        itemStyle: {
                                            normal: {
                                                color: '#E4353C',
                                            },
                                        },
                                        data: [],
                                    }, {
                                        name: '国外品牌',
                                        type: 'bar',
                                        barGap: '-100%',
                                        data: [],
                                    },
                                ],
                            }],
                        };
                        // 分拣各年国内国外数据结果
                        for (const item of data.result) {
                            const tmpTime = item['data_time'];
                            if (dateArr.indexOf(tmpTime) < 0) {
                                dateArr.push(tmpTime);
                            }
                            if (!dataMap_cn[tmpTime]) {
                                dataMap_cn[tmpTime] = [];
                            }
                            if (!dataMap_fn[tmpTime]) {
                                dataMap_fn[tmpTime] = [];
                            }
                            if (item['type'] === '1') {
                                dataMap_cn[tmpTime].push(item);
                            } else {
                                dataMap_fn[tmpTime].push(item);
                            }

                        }
                        const results_cn = {};
                        const results_fn = {};
                        // 设置每年的x轴，国内国外数据集
                        for (const item of dateArr) {
                            results_cn[item] = this.transService.onObjArray(dataMap_cn[item], '', 'ec3-bar');
                            results_fn[item] = this.transService.onObjArray(dataMap_fn[item], '', 'ec3-bar');
                            xAxisData[item] = [];
                            xAxisData[item] = xAxisData[item].concat(results_cn[item][1]);
                            xAxisData[item] = xAxisData[item].concat(results_fn[item][1]);
                        }

                        tmpOption.timeline.data = dateArr;
                        //  创建echart图形
                        for (let i = 0; i < dateArr.length; i++) {
                            const cnt_cn = results_cn[dateArr[i]][0].length;
                            const cnt_fn = results_fn[dateArr[i]][0].length;
                            let data_cn = [];
                            data_cn = data_cn.concat(results_cn[dateArr[i]][3]);
                            let data_fn = [];
                            for (let j = 0; j < cnt_fn; j++) {
                                data_cn.push(0);
                            }
                            for (let j = 0; j < cnt_cn; j++) {
                                data_fn.push(0);
                            }
                            data_fn = data_fn.concat(results_fn[dateArr[i]][3]);
                            if (tmpOption.options[i]) {
                                tmpOption.options[i].xAxis[0].data = xAxisData[dateArr[i]];
                                tmpOption.options[i].series[0].data = data_cn;
                                tmpOption.options[i].series[1].data = data_fn;
                            } else {
                                tmpOption.options.push({
                                    xAxis: [{
                                        type: 'category',
                                        data: xAxisData[dateArr[i]],
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
                                    }],
                                    series: [
                                        {
                                            name: '国内品牌',
                                            type: 'bar',
                                            barGap: '-100%',
                                            itemStyle: {
                                                normal: {
                                                    color: '#E4353C',
                                                },
                                            },
                                            data: data_cn,
                                        }, {
                                            name: '国外品牌',
                                            type: 'bar',
                                            barGap: '-100%',
                                            data: data_fn,
                                        },
                                    ],
                                });
                            }
                        }
                        this.lineRightDown = tmpOption;
                    },
                );
                break;
            default:
                break;
        }
    }
    btnGroup3Clicked(index) {
        switch (index) {
            case 0:
                this.http.get<ResponseType>('/api/20058/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.lineLeftUp = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                show: true,
                                data: ['手机', '基站', '彩电', '液晶显示板'],
                                bottom: '11%',
                                textStyle: {
                                    color: '#fff',
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
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
                                        // rotate: 30,
                                        interval: 0,
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
                                    name: '',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [{
                                name: '彩电',
                                type: 'line',
                                data: result[1],
                            },
                            {
                                name: '基站',
                                type: 'line',
                                data: result[2],
                            },
                            {
                                name: '手机',
                                type: 'line',
                                data: result[3],
                            },
                            ],
                        };
                    },
                );
                break;
            case 1:
                this.http.get<ResponseType>('/api/20061/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-bar');
                        const leftData = [];
                        const leftData1 = [];
                        for (const key in result[0]) {
                            if (result[2][key] === '国外') {
                                leftData.push(result[3][key]);
                                leftData1.push('');
                            } else {
                                leftData1.push(result[3][key]);
                                leftData.push('');
                            }
                        }
                        this.http.get<ResponseType>('/api/20062/all')
                            .subscribe(
                            data1 => {
                                const result1 = this.transService.onObjArray(data1.result, '', 'ec3-bar');
                                const RightData = [];
                                const RightData1 = [];
                                for (const key in result1[0]) {
                                    if (result1[2][key] === '国外') {
                                        RightData.push(result1[3][key]);
                                        RightData1.push('');
                                    } else {
                                        RightData1.push(result1[3][key]);
                                        RightData.push('');
                                    }
                                }
                                this.lineLeftUp = {
                                    title: {
                                        text: '服务器2016年全球市场收入份额',
                                    },
                                    tooltip: {
                                        trigger: 'axis',
                                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                        },
                                    },
                                    grid: [
                                        { x: 0, y: 0, width: '40%', height: '50%', left: '5%', top: '18%' },
                                        { x1: 0, y1: 0, width: '40%', height: '50%', right: 0 },
                                    ],
                                    yAxis: [
                                        {
                                            type: 'category',
                                            data: result[1],
                                            axisTick: {
                                                alignWithLabel: true,
                                                show: true,
                                            },
                                            gridIndex: 0,
                                            axisLabel: {
                                                interval: '0',
                                                rotate: 0,
                                                textStyle: {
                                                    color: '#fff',
                                                },
                                            },
                                            splitLine: {
                                                show: false,
                                            },
                                            axisLine: {
                                                lineStyle: {
                                                    color: '#fff',
                                                },
                                            },
                                        },
                                        {
                                            type: 'category',
                                            data: result1[1],
                                            gridIndex: 1,
                                            axisTick: {
                                                alignWithLabel: true,
                                                show: true,
                                            },
                                            axisLabel: {
                                                interval: '0',
                                                rotate: 0,
                                                textStyle: {
                                                    color: '#fff',
                                                },
                                            },
                                            splitLine: {
                                                show: false,
                                            },
                                            axisLine: {
                                                lineStyle: {
                                                    color: '#fff',
                                                },
                                            },
                                        },
                                    ],
                                    xAxis: [
                                        {
                                            show: false,
                                            type: 'value',
                                            name: '(单位：亿元)',
                                            gridIndex: 0,
                                            splitLine: {
                                                show: true,
                                            },
                                            axisLine: {
                                                lineStyle: {
                                                    color: '#fff',
                                                },
                                            },
                                        },
                                        {
                                            show: false,
                                            type: 'value',
                                            name: '(单位：亿元)',
                                            gridIndex: 1,
                                            splitLine: {
                                                show: true,
                                            },
                                            axisLine: {
                                                lineStyle: {
                                                    color: '#fff',
                                                },
                                            },
                                        },
                                    ],
                                    series: [
                                        {
                                            name: '国外企业',
                                            type: 'bar',
                                            xAxisIndex: 0,
                                            yAxisIndex: 0,
                                            barGap: '-100%',
                                            data: leftData,
                                        },
                                        {
                                            name: '国内企业',
                                            type: 'bar',
                                            xAxisIndex: 0,
                                            yAxisIndex: 0,
                                            barGap: '-100%',
                                            data: leftData1,
                                        },
                                        {
                                            name: '国外企业',
                                            type: 'bar',
                                            xAxisIndex: 1,
                                            yAxisIndex: 1,
                                            barGap: '-100%',
                                            data: RightData,
                                        },
                                        {
                                            name: '国内企业',
                                            type: 'bar',
                                            xAxisIndex: 1,
                                            yAxisIndex: 1,
                                            barGap: '-100%',
                                            data: RightData1,
                                        },
                                    ],
                                };
                            },
                        );
                    },
                );

                break;
            case 2:
                this.http.get<ResponseType>('/api/20058/all')
                    .subscribe(
                    data => {
                        const result = this.transService.onObjArray(data.result, '', 'ec3-line');
                        this.lineLeftUp = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '25%',
                                top: '10%',
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
                                        //  rotate: 30,
                                        interval: 0,
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
                                    name: '',
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff',
                                        },
                                    },
                                    splitLine: {
                                        show: true,
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            ],
                            series: [{
                                name: '彩电',
                                type: 'line',
                                data: result[1],
                            },
                            {
                                name: '基站',
                                type: 'line',
                                data: result[2],
                            },
                            {
                                name: '手机',
                                type: 'line',
                                data: result[3],
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
    // jumpClicked(path: string) {
    //     this.router.navigate(['pages/country']);
    // }
    JumpGroupClicked(event) { }
}
