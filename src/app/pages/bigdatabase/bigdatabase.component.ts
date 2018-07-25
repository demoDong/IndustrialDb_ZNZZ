import { Router } from '@angular/router';
import { HttpApi } from './../../shared/do-service/http-api.service';
import { BigdatabaseChartService } from './bigdatabase-chart.service';
import { BigdatabaseTableService } from './bigdatabase-table.service';
import { BigdatabaseDbsrcService } from './bigdatabase-dbsrc.service';
import { BigdatabaseDataService } from './bigdatabase-data.service';
import {
  TreeNode, SelectItem, MultiSelectModule,
  InputTextModule, ButtonModule, TabViewModule, PanelModule,
} from 'primeng/primeng';
import { DoTreeService } from './../../shared/do-service/do-tree.service';
import { ExcelService } from './../../shared/do-exportexcel/excel-service.service';
import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'do-bigdatabase',
  templateUrl: 'bigdatabase.component.html',
  styleUrls: ['bigdatabase.component.scss'],
})
export class BigdatabaseComponent implements OnInit {

  theme = 'echart-theme';
  // 基础子库
  files: TreeNode[];
  selectedFiles: TreeNode;
  // 指标大类
  filesTwo: TreeNode[];
  selectedFilesTwo: TreeNode[];
  // 模糊查询
  fuzzyInput: string = '';
  // 指标项多选框
  selectedCategories: string[] = [];
  selectedCategoriesAll: string[] = [];
  checked: boolean = false;
  checkboxArr = [['指标项', '指标参数']];
  checkBoxMap = { '指标参数': '指标项' };
  checkBoxDtsrcMap = { '指标参数': '指标来源' };
  // 数据查询条件
  nameInput: string = '';
  nameCondition: boolean = true;
  timeCondition: boolean = false;
  timeOption: any[] = [{ name: '全部时间', code: '' }];
  selectedTime: any;
  areaOption: any[] = [{ name: '全国', code: '' }];
  selectedArea: any;
  industryOption: any[] = [{ name: '全部行业', code: '' }];
  selectedIndustry: any;
  // pgTable
  pgCols: any[];
  pgColsOption: SelectItem[];
  pgTableData: any[];
  pgTableDataOld: any[];
  selectedData: any[];
  // echart切换
  btnType: object[];
  btnActive = [];
  // theme = 'echart-theme';
  nameMap = 'china';
  optionTurn: any;
  // 数据来源
  dbArr = [];
  // 辅助变量
  selectedBigType: any[];
  selectedBigStyle: string;
  chartLegend: any[];
  chartData: any[];
  chartDataSrc: any[];
  initTime: number = 0;

  // 表格宽度变量
  tableWidth = '75vw';
  // 点击隐藏和显示
  classa: boolean = false;

  // 筛选框
  pgColsOption1 = [];
  pgColsOption2 = [];
  selectData = [];
  pgCols1: any[];
  pgCols2: any[];
  constructor(
    private DoTreeService: DoTreeService,
    private BigdatabaseChartService: BigdatabaseChartService,
    private BigdatabaseTableService: BigdatabaseTableService,
    private BigdatabaseDbsrcService: BigdatabaseDbsrcService,
    private BigdatabaseDataService: BigdatabaseDataService,
    private excelService: ExcelService,
    private http: HttpApi,
    private zone: NgZone,
    private router: Router) { }
  ngOnInit() {
    this.initSublibraryCategory();
    this.initLargeCategory();
    this.initIndexList();
    this.initChartArea();
    this.initDbsrcIconUrls();
  }

  back() {
    this.zone.run(() => this.router.navigate(['pages/homePage']));
  }
  // 树插件筛选方法
  nodeSelect(event) {
    this.selectedBigType = event.node;
    this.loadLargeCategory(event.node.data);
    this.setDateCondition(event.node.data);
    console.log(event.node.data);
  }
  nodeSelectTwo(event) {
    let result = '';
    if (this.selectedFilesTwo.length > 0) {
      const nodes = [];
      for (const node of this.selectedFilesTwo) {
        nodes.push(node.data);
      }
      result = JSON.stringify(nodes).replace(/"/g, '');
    } else {
      alert('请选择指标大类');
    }
    this.loadIndexList(this.BigdatabaseDataService.getIndexDetailsUrl(this.selectedFiles['data'], result));
  }
  // 加载基础库
  initSublibraryCategory() {
    this.DoTreeService.getFiles(this.BigdatabaseDataService.getDbTypeUrl()).then(files => this.files = files);
    this.selectedFiles = { data: 'ZN01', selectable: true, label: '智能制造专项' };
  }
  // 加载指标大类
  initLargeCategory() {
    const fakeEvent = { node: { data: 'ZN0101' } };
    this.nodeSelect(fakeEvent);
  }
  loadLargeCategory(dbCode) {
    this.selectedFilesTwo = [];
    this.selectedCategories = [];
    this.initDbsrcIconUrls();
    this.DoTreeService.getFiles(this.BigdatabaseDataService.getIndexBigTypeUrl(dbCode)).then(
      indexBigTypes => {
        this.filesTwo = indexBigTypes;
        // 当查询 企业库、园区库时，获取style字段：
        if (this.selectedBigType['data'] === 'PRK' || this.selectedBigType['data'] === 'COM') {
          this.selectedBigStyle = indexBigTypes[0]['style'];
          this.nameCondition = false;
          this.timeCondition = true;
        } else {
          this.nameCondition = true;
          this.timeCondition = false;
        }
      });
  }
  // 模糊查询指标项
  fuzzyQuery(event) {
    this.loadIndexList(this.BigdatabaseDataService.getFuzzyQuartUrl(this.fuzzyInput));
    this.setDateCondition('');
  }
  // 加载指标项
  initIndexList() {
    const fakeEvent = { data: 'ZN0101' };
    this.selectedFilesTwo = [];
    this.selectedFilesTwo.push(fakeEvent);
    this.nodeSelectTwo(fakeEvent);
  }
  loadIndexList(url) {
    this.http.getUrl<any>(url).subscribe(data => {
      if (data.length === 0) {
        return alert('无相关指标');
      }
      this.checkboxArr = data;
      this.selectedCategories = [];
      for (const key of this.checkboxArr) {
        this.selectedCategoriesAll.push(key[1]);
        this.checkBoxMap[key[1]] = key[0];
        this.checkBoxDtsrcMap[key[1]] = key[2];
      }
      this.selectedCategories = [this.checkboxArr[0][1]];
      this.changeDbShow();
      this.setAreaIndustryCondition(this.checkboxArr[0][1]);
    });
  }
  switchState(event) {
    // 全选框选择方法
    this.checked ? this.selectedCategories = this.selectedCategoriesAll : this.selectedCategories = [];
    this.changeDbShow();
  }
  onChangeimplementation(event) {
    this.select();
    this.resetCondition();
    this.selectedCategories.length !== this.selectedCategoriesAll.length ? this.checked = false : this.checked = true;
    const indexs = [];
    for (const category of this.selectedCategories) {
      indexs.push(category);
    }
    this.changeDbShow();
    this.setAreaIndustryCondition(JSON.stringify(indexs).replace(/\[|\]|\s/g, ''));
  }
  // 条件处理数据查询
  resetCondition() {
    this.nameInput = '';
    this.selectedTime = [];
    this.selectedArea = [];
    this.selectedIndustry = [];
  }
  setDateCondition(dateType) {
    this.selectedTime = [];
    this.http.getUrl<any>(this.BigdatabaseDataService.getFilterDateConditionUrl(dateType)).subscribe(
      dateConditions => {
        this.timeOption = [];
        for (const tmpItem of dateConditions) {
          this.timeOption.push({ name: tmpItem['label'], code: tmpItem['value'], type: tmpItem['type'] });
        }
      });
  }
  setAreaIndustryCondition(indexIds) {
    this.selectedArea = [];
    this.selectedIndustry = [];
    this.http.getUrl<any>(this.BigdatabaseDataService.getFilterConditionUrl(indexIds)).subscribe(
      conditions => {
        this.areaOption = [];
        this.industryOption = [];
        for (const key of conditions.area) {
          this.areaOption.push({ name: key['label'], code: key['value'] });
        }
        for (const key of conditions.ind) {
          this.industryOption.push({ name: key['label'], code: key['value'] });
        }
        this.select();
        this.initTime === 0 ? this.dataQuery(event) : this.initTime++;
        this.initTime++;
      });
  }
  dataQuery(event) {
    if (this.initTime === 0) {
      this.selectedCategories = ['ZN010101', 'ZN010102'];
      this.selectedTime = { name: '最近20年', code: '240', type: 'nd' };
      this.selectedArea = [{ name: '北京市', code: '110000', _$visited: true }];
      this.selectedIndustry = [];
      this.initTime++;
    }
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
    if (this.selectedBigType['data'] !== 'PRK'
      && this.selectedBigType['data'] !== 'COM'
      && this.selectedTime.length === 0) {
      alert('请选择日期');
      return;
    }
    // 处理地区条件
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
    // 处理行业条件
    let industryCodes = '';
    if (this.selectedIndustry && this.selectedIndustry.length > 0) {
      for (const ind of this.selectedIndustry) {
        industryCodes += ',' + ind['code'];
      }
      industryCodes = industryCodes.substr(1);
    }
    // 查询
    if (this.selectedBigType['data'] === 'PRK' || this.selectedBigType['data'] === 'COM') {
      // tslint:disable-next-line:max-line-length
      this.loadCompanyParkData(category, '', this.selectedBigStyle, areasCodes, industryCodes, this.nameInput);
    } else {
      this.loadIndexData(category, this.selectedTime.code, this.selectedTime.type, areasCodes, industryCodes, '');
    }
  }
  select() {
    this.selectedTime = { name: this.timeOption[0].name, code: this.timeOption[0].code, type: this.timeOption[0].type };
    // tslint:disable-next-line:max-line-length
    this.selectedArea = [{ name: this.areaOption[0].name, code: this.areaOption[0].code, _$visited: true }];
  }
  loadCompanyParkData(indexIds, date, dateType, areas, industries, search) {
    this.http.getUrl<any>(
      this.BigdatabaseDataService.getCompanyQueryDataUrl(indexIds, date, dateType, areas, industries, search),
    ).subscribe(data => {
      // 生成col字段
      const resultColumns = this.BigdatabaseTableService.getCols4PRKCOM(
        this.selectedBigType['data'],
        this.selectedCategories,
        this.checkBoxMap,
      );
      // 企业名称/园区名称索引位置填入结果
      const resultTable = this.BigdatabaseTableService.getTableData4PRKCOM(this.selectedBigStyle, data);
      this.loadPgTable(resultColumns, resultTable);
    });
  }
  loadIndexData(indexIds, date, dateType, areas, industries, search) {
    this.http.getUrl<any>(
      this.BigdatabaseDataService.getIndexQueryDataUrl(indexIds, date, dateType, areas, industries, search),
    ).subscribe(data => {
      // 生成col字段
      const resultColumns = this.BigdatabaseTableService.getCols4Index(
        'INDEX', this.selectedCategories, this.selectedArea, this.selectedIndustry, this.checkBoxMap);
      let resultTable = this.BigdatabaseTableService.getTableData4Index(
        this.selectedCategories, areas, industries, resultColumns, data);
      // 查询条件
      //  console.log(data);
      if (data.companyInfo != null || data.companyInfo !== undefined) {
        const result = [];
        // tslint:disable-next-line:forin
        for (const i in data.companyInfo) {
          const tableRow = { 'c0': data.companyInfo[i][0] };
          for (let idx = 1; idx < data.companyInfo[i].length; idx++) {
            tableRow['c' + idx] = data.companyInfo[i][idx];
          }
          result.push(tableRow);
        }
        resultTable = result;
      }
      // 表格数据
      // console.log(resultTable);
      resultTable.sort(function (x, y) {
        if (x.c0 > y.c0) {
          return 1;
        } else if (x.c0 === y.c0) {
          return x.c0 > y.c0 ? 1 : -1;
        } else if (x.c0 < y.c0) {
          return -1;
        }
      });
      this.loadPgTable(resultColumns, resultTable);
    });
  }
  // 加载pgTable
  loadPgTable(resultColumns, resultTable) {
    const formattedColsConf = this.BigdatabaseTableService.formatCols4PgTable(resultColumns);
    formattedColsConf.columns = _.uniqBy(formattedColsConf.columns, 'header');
    // formattedColsConf.option = _.uniqBy(formattedColsConf.option, 'lable');
    this.pgCols = formattedColsConf.columns;
    this.pgColsOption = formattedColsConf.option;
    this.pgTableData = resultTable;
    this.pgTableDataOld = resultTable;
    for (const key in this.pgCols) {
      if (this.pgCols[key].header.indexOf('承担单位') > 0) {
        // tslint:disable-next-line:forin
        for (const i in resultTable.map(a => a['c' + key])) {
          this.pgColsOption1.push({
            'label': resultTable.map(a => a['c' + key])[i],
            'value': {
              'filed': 'c' + key, 'header': resultTable.map(a => a['c' + key])[i],
            },
          });
        }
      }
    }
  }

  // 筛选
  selectedColsChange1(event) {
    this.pgTableData = this.pgTableDataOld;
    const selectTable = [];
    // tslint:disable-next-line:forin
    for (const key in this.pgCols1) {
      if (this.pgCols1[key].header.indexOf(this.pgTableData[key])) {
        selectTable.push(this.pgTableData[key]);
      }
    }
    this.pgTableData = selectTable;
  }
  selectedColsChange2(event) { }
  selectedColsChange(event) {
    this.loadChartData();
  }
  onHeaderCheckboxToggle(event) {
    this.loadChartData();
  }
  onRowSelect(event) {
    this.loadChartData();
  }
  onRowUnselect(event) {
    this.loadChartData();
  }
  loadChartData() {
    this.chartData = [];
    this.chartLegend = [];
    for (const col of this.pgCols) {
      const chartCol = [];
      for (let n = 0; n < this.selectedData.length; n++) {
        chartCol.push(this.selectedData[n][col['field']]);
      }
      this.chartData.push(chartCol);
      this.chartLegend.push(col['header']);
    }
    this.chartLegend.shift();
  }
  // 加载图区域
  initChartArea() {
    this.btnType = this.BigdatabaseChartService.getChartType();
    // tslint:disable-next-line:forin
    for (const i in this.btnType) {
      this.btnActive.push(false);
    }
  }
  loadChart(btnIndex) {
    this.zone.run(
      () => this.optionTurn = this.BigdatabaseChartService.chartOption(
        this.btnType[btnIndex]['value'],
        this.chartLegend,
        this.chartData));
  }
  onBtnActive(event, i) {
    this.btnActive.fill(false);
    this.btnActive[i] = true;
    this.loadChart(i);
  }
  // 加载数据来源
  initDbsrcIconUrls() {
    this.dbArr = this.BigdatabaseDbsrcService.initDbsrcIconUrls();
  }
  changeDbShow() {
    this.dbArr = this.BigdatabaseDbsrcService.updateDbsrcIconUrls(this.checkBoxDtsrcMap, this.selectedCategories);
  }

  According(btnIndex) {
    if (this.classa === false) {
      this.classa = true;
      this.tableWidth = '40vw';
    } else {
      this.classa = false;
      this.tableWidth = '75vw';
    }
  }

  exportExcel(e) {
    if (this.selectedData && this.selectedData !== null) {
      const jsondata = [];
      for (let i = 0; i < this.selectedData.length; i++) {
        const map = new Map();
        for (const col of this.pgCols) {
          map.set(col['header'], this.selectedData[i][col['field']]);
        }
        const obj = Object.create(null);
        map.forEach((value, key) => {
          obj[key] = value;
        });
        jsondata.push(obj);
      }
      this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(jsondata)), '智能制造');
    }
  }

}
