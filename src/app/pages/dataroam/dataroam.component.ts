import { Router } from '@angular/router';
import { HttpApi } from './../../shared/do-service/http-api.service';
import { TreeNode, SelectItem, MultiSelectModule, InputTextModule } from 'primeng/primeng';
import { DoTreeService } from './../../shared/do-service/do-tree.service';
import { Component, OnInit, NgZone } from '@angular/core';
import * as Jquery from 'jquery';

// 下拉框（单/多选）统一接口
interface Time {
  name: string;
  code: string;
}

@Component({
  selector: 'do-dataroam',
  templateUrl: 'dataroam.component.html',
  styleUrls: ['dataroam.component.scss'],
})
export class DataroamComponent implements OnInit {
  restapiUrlPrefix = 'http://219.239.97.111:10076/app/rest/v2/services/';
  // 树插件变量
  files: TreeNode[];
  selectedFiles: TreeNode;
  filesTwo: TreeNode[];
  selectedFilesTwo: TreeNode[];
  fuzzyInput: string = '';
  nameInput: string = '';
  nameCondition: boolean = true;
  timeCondition: boolean = false;
  // 多选框变量
  selectedCategories: string[] = [];
  selectedCategoriesAll: string[] = [];
  checked: boolean = false;
  checkboxArr = [
    ['指标项', '指标参数'],
  ];
  checkBoxMap = { '指标参数': '指标项' };
  checkBoxDtsrcMap = { '指标参数': '指标来源' };
  // 时间单选下拉变量
  timeOption: any[] = [
    { name: '全部时间', code: '' },
  ];
  selectedTime: any;
  // 地域复选下拉变量
  areaOption: any[] = [
    { name: '全国', code: '' },
  ];
  selectedArea: any;
  // 行业复选下拉变量
  industryOption: any[] = [
    { name: '全部行业', code: '' },
  ];
  selectedIndustry: any;
  // 比对指标下拉变量
  colOption: object[] = [
    { code: 'c0', name: '指标项', dtsrc: '' },
  ];
  selectedCol: object[] = [
    { code: 'c0', name: '指标项', dtsrc: '' },
  ];
  // handsontable 配置
  columns: object[] = [
    { data: 'c0', title: '指标项', dtsrc: '', width: 150 },
    { data: 'c1', title: '指标项', dtsrc: '', width: 150 },
    { data: 'c2', title: '指标项', dtsrc: '', width: 150 },
    { data: 'c3', title: '指标项', dtsrc: '', width: 150 },
    { data: 'c3', title: '指标项', dtsrc: '', width: 150 },
  ];
  settings: object = {
    contextMenu: {
      callback: (key, options) => {
        if (key === 'showChart') {
          this.chartData = [];
          if (options.end.col === 0) {
            return alert('请从第二列开始选择');
          }
          const colstart = (options.start.col > 0) ? options.start.col : 1;
          this.chartData = [];
          this.chartLegend = [];
          this.chartDataSrc = [];
          const firstCol = [];
          for (let n = options.start.row; n <= options.end.row; n++) {
            firstCol.push(this.table[n][this.columns[0]['data']]);
          }
          this.chartData.push(firstCol);
          for (let m = colstart; m <= options.end.col; m++) {
            const chartCol = [];
            for (let n = options.start.row; n <= options.end.row; n++) {
              chartCol.push(this.table[n][this.columns[m]['data']]);
            }
            this.chartData.push(chartCol);
            this.chartLegend.push(this.columns[m]['title']);
            this.chartDataSrc.push(this.columns[m]['dtsrc']);
          }
          this.zone.run(() => this.chartOption(this.btnType[0]['value']));
        }
      },
      items: {
        'showChart': { name: '可视化分析' },
      },
    },
  };
  isLoading: boolean = false;
  // table数据
  table: any[] = [];
  // 切换echart的btn变量
  btnType = [
    { name: '柱状图', value: 'bar' },
    { name: '折线图', value: 'line' },
    { name: '环形图', value: 'pie' },
    { name: '玫瑰图', value: 'rose' },
    { name: '散点图', value: 'scatter' },
  ];
  btnActive = [];
  // echart图表变量
  theme = 'echart-theme';
  nameMap = 'china';
  search: '';
  selectedBigType: any[];
  selectedBigStyle: string;
  chartLegend: any[];
  chartData: any[];
  chartDataSrc: any[];
  optionTurn: any;
  dbArr = [
    '../../../assets/images/dtsrc_0.png',
    '../../../assets/images/dtsrc_1.png',
    '../../../assets/images/dtsrc_2.png',
    '../../../assets/images/dtsrc_3.png',
    '../../../assets/images/dtsrc_4.png',
    '../../../assets/images/dtsrc_5.png',
    '../../../assets/images/dtsrc_6.png',
    '../../../assets/images/dtsrc_7.png',
    '../../../assets/images/dtsrc_8.png',
    '../../../assets/images/dtsrc_9.png',
  ];
  dtsrcs: object = {
    '工商': '8',
    '国际组织': '7',
    '统计局': '0',
    '海关总署': '1',
    '发改委': '3',
    '信通院': '5',
    '司局业务系统': '5',
    '省经信委平台': '6',
    '知识产权局': '2',
    '行业协会': '5',
  };
  constructor(private DoTreeService: DoTreeService, private http: HttpApi, private zone: NgZone,
    private router: Router) { }
  back() {
    this.zone.run(() => this.router.navigate(['pages/homePage']));
  }
  hotTableHeight() {
    if (window.innerWidth === 1920) {
      return 350;
    }else {
      return 220;
    }
  }
  ngOnInit() {
    this.checkboxArr = [];
    // tslint:disable-next-line:forin
    for (const i in this.btnType) {
      this.btnActive.push(false);
    }
    // tslint:disable-next-line:max-line-length
    this.DoTreeService.getFiles(this.restapiUrlPrefix + 'bigscreen169_TreeMenuService/getChildDbType').then(files => this.files = files);
    const fakeEvent = {
      node: {
        data: 'hgnd',
      },
    };
    this.selectedFiles = {data: 'hgnd', selectable: true, label: '年度'};
    this.nodeSelect(fakeEvent);
    fakeEvent.node.data = 'A0201';
    this.nodeSelectTwo(fakeEvent);
    this.selectedColChange({});
    for (let i = 0; i < 10; i++) {
      this.table.push({ c0: '-', c1: '', c2: '', c3: '', c4: '' });
    }
  }
  // 树插件筛选方法
  nodeSelect(event) {
    this.selectedFilesTwo = [];
    this.selectedBigType = event.node;
    this.dbArr = [
      '../../../assets/images/dtsrc_0.png',
      '../../../assets/images/dtsrc_1.png',
      '../../../assets/images/dtsrc_2.png',
      '../../../assets/images/dtsrc_3.png',
      '../../../assets/images/dtsrc_4.png',
      '../../../assets/images/dtsrc_5.png',
      '../../../assets/images/dtsrc_6.png',
      '../../../assets/images/dtsrc_7.png',
      '../../../assets/images/dtsrc_8.png',
      '../../../assets/images/dtsrc_9.png',
    ];
    this.selectedCategories = [];
    this.nameCondition = true;
    this.timeCondition = false;
    // tslint:disable-next-line:max-line-length
    this.DoTreeService.getFiles(this.restapiUrlPrefix + 'bigscreen169_TreeMenuService/indexBigType?dbCode=' + event.node.data).then(indexBigTypes => {
      this.filesTwo = indexBigTypes;
      // 当查询 企业库、园区库时，获取style字段：
      if (this.selectedBigType['data'] === 'PRK' || this.selectedBigType['data'] === 'COM') {
        this.selectedBigStyle = indexBigTypes[0]['style'];
        this.nameCondition = false;
        this.timeCondition = true;
      }
    });
    // tslint:disable-next-line:max-line-length
    this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/filterDateCondition?dateType=' + event.node.data).subscribe(dateConditions => {
      this.timeOption = [];
      // this.selectedBigStyle = dateConditions[0].style;
      for (const tmpItem of dateConditions) {
        this.timeOption.push({ name: tmpItem['label'], code: tmpItem['value'], type: tmpItem['type'] });
      }
    });
  }
  nodeSelectTwo(event) {
    const nodes = [];
    for (const node of this.selectedFilesTwo ) {
      nodes.push(node.data);
    }
    let result = '[' + event.node.data + ']';
    if (nodes.length > 0) {
      result = JSON.stringify(nodes).replace(/"/g, '');
    }
    // tslint:disable-next-line:max-line-length
    this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_TreeMenuService/indexDetails?dbCode=' + this.selectedFiles['data'] + '&groupIds=' + result).subscribe(data => {
      this.checkboxArr = data;
      this.selectedCategories = [];
      for (const key of this.checkboxArr) {
        this.selectedCategoriesAll.push(key[1]);
        this.checkBoxMap[key[1]] = key[0];
        this.checkBoxDtsrcMap[key[1]] = key[2];
      }
      this.selectedCategories = [this.checkboxArr[0][1]];
      this.changeDbShow();
      // tslint:disable-next-line:max-line-length
      this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/filterCondition?indexIds=[' + this.checkboxArr[0][1] + ']').subscribe(conditions => {
        this.areaOption = [];
        this.industryOption = [];
        for (const key of conditions.area) {
          this.areaOption.push({ name: key['label'], code: key['value'] });
        }
        for (const key of conditions.ind) {
          this.industryOption.push({ name: key['label'], code: key['value'] });
        }
      });
    });
  }
  // 多选框选择方法
  onChangeimplementation(event) {
    this.selectedCategories.length !== this.selectedCategoriesAll.length ? this.checked = false : this.checked = true;
    const indexs = [];
    for (const category of this.selectedCategories) {
      indexs.push(category);
    }
    this.changeDbShow();
    // tslint:disable-next-line:max-line-length
    this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/filterCondition?indexIds=' + JSON.stringify(indexs)).subscribe(data => {
      this.selectedTime = [];
      this.areaOption = [];
      this.selectedArea = [];
      this.industryOption = [];
      this.selectedIndustry = [];
      for (const key of data.area) {
        this.areaOption.push({ name: key['label'], code: key['value'] });
      }
      for (const key of data.ind) {
        this.industryOption.push({ name: key['label'], code: key['value'] });
      }
    });
  }
  // 全选框选择方法
  switchState(event) {
    this.checked ? this.selectedCategories = this.selectedCategoriesAll : this.selectedCategories = [];
    this.changeDbShow();
  }
  changeDbShow() {
    for (let idx = 0; idx < this.dbArr.length; idx++) {
      this.dbArr[idx] = '../../../assets/images/dtsrc_' + idx + '.png';
    }
    for (const category of this.selectedCategories) {
      if (this.checkBoxDtsrcMap[category]) {
        const idx = this.dtsrcs[this.checkBoxDtsrcMap[category]];
        this.dbArr[idx] = '../../../assets/images/dtsrc_' + idx + 'a.png';
      }
    }
  }
  // 时间、地域、行业下拉框选择方法（可分开处理）
  selectedConditionChange(event) {
  }
  dataQuery(event) {
    let category = '';
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      for (const ctg of this.selectedCategories) {
        category += ',' + ctg;
      }
      category = category.substr(1);
    } else {
      alert('请选择指标');
      return;
    }
    if (this.selectedTime.length = 0) {
      alert('请选择日期');
      return;
    }
    let areasCodes = '';
    if (this.selectedArea && this.selectedArea.length > 0) {
      for (const area of this.selectedArea) {
        areasCodes += ',' + area['code'];
      }
      areasCodes = areasCodes.substr(1);
    } else {
      alert('请选择地区');
      return;
    }
    let industryCodes = '';
    if (this.selectedIndustry && this.selectedIndustry.length > 0) {
      for (const ind of this.selectedIndustry) {
        industryCodes += ',' + ind['code'];
      }
      industryCodes = industryCodes.substr(1);
    }
    /*  当查询 企业库、园区库时，传入参数 含义如下：
     *  indexIds 表的字段
     *  date 企业创建日期，查询结果企业大于此日期
     *  dateType PRK='企业' 或者 COM='园区' 其他值代表指标库数据查询
     *  areas 代表地区
     *  industries 代表行业
     *  search 代表企业或园区名称
     */
    if (this.selectedBigType['data'] === 'PRK' || this.selectedBigType['data'] === 'COM') {
      this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/queryData?'
        + 'indexIds=' + category
        + '&date=' + this.selectedTime.code
        + '&dateType=' + this.selectedBigStyle
        + '&areas=' + areasCodes
        + '&industries=' + industryCodes
        + '&search=' + this.nameInput).subscribe(data => {
          let resultColumns = [];
          if (this.selectedBigType['data'] === 'PRK') {
            resultColumns = [{ data: 'c0', title: '园区名称', dtsrc: '', width: 300 }];
          } else if (this.selectedBigType['data'] === 'COM') {
            resultColumns = [{ data: 'c0', title: '企业名称', dtsrc: '', width: 300 }];
          }
          let tmpIndex = 1;
          this.colOption = [];
          this.selectedCol = [];
          const resultTime = [];
          const resultTable = [];
          // col字段
          let dataStr = '';
          let index = 0;
          for (const tmpCategory of this.selectedCategories) {
            // tslint:disable-next-line:max-line-length
            resultColumns.push({ data: 'c' + tmpIndex, title: this.checkBoxMap[tmpCategory], dtsrc: '', width: 300 });
            this.colOption.push({ code: 'c' + tmpIndex, name: this.checkBoxMap[tmpCategory], dtsrc: '' });
            tmpIndex++;
            dataStr += '_0';
          }
          // 企业名称/园区名称索引位置填入变量
          for (const tmpCategory of data[this.selectedBigStyle]) {
            const resultMap = new Object();
            tmpIndex = 0;
            for (const rowData of tmpCategory) {
              // 按照企业名称/园区名称初始化
              rowData === null ? resultMap['c' + tmpIndex] = '' : resultMap['c' + tmpIndex] = rowData;
              tmpIndex++;
            }
            resultTable[index] = resultMap;
            index++;
          }
          this.columns = resultColumns;
          this.table = resultTable;
        });
    } else {
      /*  当查询 指标库时，传入参数 含义如下：
         *  indexIds 指标id
         *  date 日期条件
         *  dateType 日期类型
         *  areas 地区
         *  industries 行业
         *  search 空，此接口无用
         */
      this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/queryData?'
        + 'indexIds=' + category
        + '&date=' + this.selectedTime.code
        + '&dateType=' + this.selectedTime.type
        + '&areas=' + areasCodes
        + '&industries=' + industryCodes
        + '&search=' + this.search).subscribe(data => {
          const resultColumns = [{ data: 'c0', title: '日期', dtsrc: '', width: 300 }];
          const resultMap = {};
          let tmpIndex = 1;
          this.colOption = [];
          this.selectedCol = [];
          const resultTime = [];
          const resultTable = [];
          // col字段
          let dataStr = '';
          for (const tmpArea of this.selectedArea) {
            if (this.selectedIndustry && this.selectedIndustry.length > 0) {
              for (const tmpInd of this.selectedIndustry) {
                for (const tmpCategory of this.selectedCategories) {
                  // tslint:disable-next-line:max-line-length
                  resultColumns.push({ data: 'c' + tmpIndex, title: tmpArea['name'] + '-' + tmpInd['name'] + '-' + this.checkBoxMap[tmpCategory], dtsrc: '', width: 300 });
                  this.colOption.push({ code: 'c' + tmpIndex, name: tmpArea['name'] + '-' + tmpInd['name'] + '-' + this.checkBoxMap[tmpCategory], dtsrc: '' });
                  tmpIndex++;
                  dataStr += '_0';
                }
              }
            } else {
              for (const tmpCategory of this.selectedCategories) {
                // tslint:disable-next-line:max-line-length
                resultColumns.push({ data: 'c' + tmpIndex, title: tmpArea['name'] + '-' + this.checkBoxMap[tmpCategory], dtsrc: '', width: 300 });
                this.colOption.push({ code: 'c' + tmpIndex, name: tmpArea['name'] + '-' + this.checkBoxMap[tmpCategory], dtsrc: '' });
                tmpIndex++;
                dataStr += '_0';
              }
            }
          }
          dataStr = dataStr.substr(1);
          // 日期索引位置填入变量
          tmpIndex = 0;
          for (const tmpCategory of this.selectedCategories) {
            data[tmpCategory] === undefined ? data[tmpCategory] = [] : data[tmpCategory] = data[tmpCategory];
            for (const rowData of data[tmpCategory]) {
              // 按照日期初始化
              if (resultTime.indexOf(rowData[0]) < 0) {
                resultTime.push(rowData[0]);
                resultMap[rowData[0]] = dataStr.split('_');
                resultMap[rowData[0]][0] = rowData[0];
              }
              // 日期行填指标数值
              const idx_area = areasCodes.split(',').indexOf(rowData[1]) + 1;
              let idx_ind = 1;
              if (rowData[2] === null || industryCodes === '') {
                idx_ind = 1;
              } else {
                idx_ind = industryCodes.split(',').indexOf(rowData[2]) + 1;
              }
              resultMap[rowData[0]][
                idx_area *
                idx_ind *
                (tmpIndex + 1)
              ] = rowData[3];
            }
            tmpIndex++;
          }
          // 转换格式
          for (const tmpTime of resultTime) {
            const tableRow = { 'c0': tmpTime };
            for (let idx = 1; idx < resultMap[tmpTime].length; idx++) {
              tableRow['c' + idx] = resultMap[tmpTime][idx];
            }
            resultTable.push(tableRow);
          }
          this.columns = resultColumns;
          this.table = resultTable;
        });
    }
  }
  // 切换chart图形对比数据
  selectedColChange(event) {
    this.chartData = [];
    this.chartLegend = [];
    this.chartDataSrc = [];
    const firstCol = [];
    for (let n = 0; n < this.table.length; n++) {
      firstCol.push(this.table[n][this.columns[0]['data']]);
    }
    this.chartData.push(firstCol);
    for (const col of this.selectedCol) {
      const chartCol = [];
      for (let n = 0; n < this.table.length; n++) {
        chartCol.push(this.table[n][col['code']]);
      }
      this.chartData.push(chartCol);
      this.chartLegend.push(col['name']);
      this.chartDataSrc.push(col['dtsrc']);
    }
    this.chartOption(this.btnType[0]['value']);
  }
  // 切换echart图形种类按钮的点击方法
  onBtnActive(event, i) {
    this.btnActive.fill(false);
    this.btnActive[i] = true;
    this.chartOption(this.btnType[i]['value']);
  }
  // 模糊查询
  fuzzyQuery(event) {
    // tslint:disable-next-line:max-line-length
    this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FuzzyQueryService/fuzzyQuery?searchTerm=' + this.fuzzyInput).subscribe(data => {
      this.checkboxArr = data;
      if (this.checkboxArr.length === 0) {
        return alert('无相关指标');
      }
      this.selectedCategories = [];
      for (const key of this.checkboxArr) {
        this.selectedCategoriesAll.push(key[1]);
        this.checkBoxMap[key[1]] = key[0];
      }
      this.selectedCategories = [this.checkboxArr[0][1]];
      // tslint:disable-next-line:max-line-length
      this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/filterDateCondition?dateType=').subscribe(dateConditions => {
        this.timeOption = [];
        for (const tmpItem of dateConditions) {
          this.timeOption.push({ name: tmpItem['label'], code: tmpItem['value'], type: tmpItem['type'] });
        }
      });
      // tslint:disable-next-line:max-line-length
      this.http.getUrl<any>(this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/filterCondition?indexIds=[' + this.checkboxArr[0][1] + ']').subscribe(conditions => {
        this.areaOption = [];
        this.industryOption = [];
        for (const key of conditions.area) {
          this.areaOption.push({ name: key['label'], code: key['value'] });
        }
        for (const key of conditions.ind) {
          this.industryOption.push({ name: key['label'], code: key['value'] });
        }
      });
    });
  }
  // echart配制方法体
  chartOption(type) {
    if (type === 'bar') {
      this.barOption();
    } else if (type === 'line') {
      this.lineOption();
    } else if (type === 'pie') {
      this.pieOption();
    } else if (type === 'rose') {
      this.roseOption();
    } else if (type === 'scatter') {
      this.scatterOption();
    }
  }
  barOption() {
    const series = [];
    for (let index = 1; index < this.chartData.length; index++) {
      series.push({
        type: 'bar',
        data: this.chartData[index],
      });
    }
    this.optionTurn = {
      legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle',
        data: this.chartLegend,
      },
      xAxis: [
        {
          type: 'category',
          data: this.chartData[0],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: series,
    };
  }
  lineOption() {
    const series = [];
    for (let index = 1; index < this.chartData.length; index++) {
      series.push({
        type: 'line',
        data: this.chartData[index],
      });
    }
    this.optionTurn = {
      legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle',
        data: this.chartLegend,
      },
      xAxis: [
        {
          type: 'category',
          data: this.chartData[0],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: series,
    };
  }
  pieOption() {
    const pieData = [];
    for (let index = 1; index < this.chartData.length; index++) {
      pieData.push({
        name: this.chartLegend[index - 1],
        value: this.chartData[index][0],
      });
    }
    this.optionTurn = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle',
        data: this.chartLegend,
      },
      series: [{
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: pieData,
      },
      ],
    };
  }
  roseOption() {
    this.optionTurn = {

    };
  }
  scatterOption() {
    this.optionTurn = {

    };
  }
}
