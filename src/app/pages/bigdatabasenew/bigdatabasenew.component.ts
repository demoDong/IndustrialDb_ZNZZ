import { Router } from '@angular/router';
import { HttpApi } from './../../shared/do-service/http-api.service';
import { BigdatabasenewTableService } from './bigdatabasenewservice/bigdatabasenew-table.service';
import { BigdatabasenewDataService } from './bigdatabasenewservice/bigdatabasenew-data.service';
import {
  TreeNode,
  SelectItem,
  MultiSelectModule,
  InputTextModule,
  ButtonModule,
  TabViewModule,
  PanelModule,
  ListboxModule,
  SliderModule,
} from 'primeng/primeng';
import { DoTreeService } from './../../shared/do-service/do-tree.service';
import { ExcelService } from './../../shared/do-exportexcel/excel-service.service';
import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';
import { BigdatabaseTableService } from '../bigdatabase/bigdatabase-table.service';
import { BigdatabaseChartService } from '../bigdatabase/bigdatabase-chart.service';
@Component({
  selector: 'do-bigdatabasenew',
  templateUrl: 'bigdatabasenew.component.html',
  styleUrls: ['bigdatabasenew.component.scss'],
})
export class BigdatabasenewComponent implements OnInit {
  classa: boolean = false;
  overviewShow: boolean = true;
  detailShow: boolean = false;
  effectShow: boolean = false;
  theadData: Array<any>;
  tbodyData: Array<any>;
  treeData: any;
  // 详情选中项目获取
  selectedIndexAll: Array<any>;
  // 基础子库
  files: TreeNode[];
  selectedFiles: TreeNode;
  // 指标大类
  filesTwo: TreeNode[];
  selectedFilesTwo: TreeNode;
  selectedType: string;
  // 指标项多选框
  selectedThreeCode: TreeNode[] = [];
  selectedCategories: TreeNode[] = [];
  selectedIndexs: any;
  selectedParent: string;
  // 指标项是否可多选
  ifMultiple: boolean = false;
  checkboxArr: TreeNode[];
  multipleType: boolean = true;
  checkboxType: boolean = true;
  ifhideMaincode: boolean = false;
  // 数据查询条件
  nameInput: string = '';
  categoriesCondition: string = '';
  nameCondition: boolean = true;
  timeCondition: boolean = false;
  timeOption: any[] = [
    { name: '2015', code: '2015' },
    { name: '2016', code: '2016' },
    { name: '2017', code: '2017' },
  ];
  selectedTime: any;
  areaOption: any[] = [
    { code: '110000', name: '北京市' },
    { code: '120000', name: '天津市' },
    { code: '130000', name: '河北省' },
    { code: '140000', name: '山西省' },
    { code: '150000', name: '内蒙古自治区' },
    { code: '210000', name: '辽宁省' },
    { code: '220000', name: '吉林省' },
    { code: '230000', name: '黑龙江省' },
    { code: '310000', name: '上海市' },
    { code: '320000', name: '江苏省' },
    { code: '330000', name: '浙江省' },
    { code: '340000', name: '安徽省' },
    { code: '350000', name: '福建省' },
    { code: '360000', name: '江西省' },
    { code: '370000', name: '山东省' },
    { code: '410000', name: '河南省' },
    { code: '420000', name: '湖北省' },
    { code: '430000', name: '湖南省' },
    { code: '440000', name: '广东省' },
    { code: '450000', name: '广西壮族自治区' },
    { code: '460000', name: '海南省' },
    { code: '500000', name: '重庆市' },
    { code: '510000', name: '四川省' },
    { code: '520000', name: '贵州省' },
    { code: '530000', name: '云南省' },
    { code: '540000', name: '西藏自治区' },
    { code: '610000', name: '陕西省' },
    { code: '620000', name: '甘肃省' },
    { code: '630000', name: '青海省' },
    { code: '640000', name: '宁夏回族自治区' },
    { code: '650000', name: '新疆维吾尔自治区' },
  ];
  selectedArea: any;
  industryOption: any[] = [
    { name: '新一代信息技术', code: '新一代信息技术' },
    { name: '数控机床与机器人', code: '数控机床与机器人' },
    { name: '航空航天', code: '航空航天' },
    { name: '海工装备及船舶', code: '海工装备及船舶' },
    { name: '轨道交通', code: '轨道交通' },
    { name: '新能源汽车', code: '新能源汽车' },
    { name: '电力装备', code: '电力装备' },
    { name: '农业装备', code: '农业装备' },
    { name: '新材料', code: '新材料' },
    { name: '生物医药及器械', code: '生物医药及器械' },
    { name: '其他', code: '其他' },
  ];
  selectedIndustry: any;
  constructor(
    private DoTreeService: DoTreeService,
    private BigdatabaseTableService: BigdatabasenewTableService,
    private BigdatabaseDataService: BigdatabasenewDataService,
    private excelService: ExcelService,
    private http: HttpApi,
    private zone: NgZone,
    private router: Router,
  ) { }
  ngOnInit() {
    this.initSublibraryCategory();
  }

  back() {
    this.zone.run(() => this.router.navigate(['pages/homePage']));
  }
  // 初始化子库
  initSublibraryCategory() {
    this.http
      .getUrl<any>(this.BigdatabaseDataService.getAllDbTypeUrl())
      .toPromise().then(data => {
        this.treeData = data;
        const files = [];
        // tslint:disable-next-line:forin
        for (const iterator in data) {
          files.push({ data: data[iterator].data, label: data[iterator].label });
        }
        this.files = files;
        this.selectedFiles = this.files[0];
        this.initLargeCategory();
      });
  }
  // 初始化指标大类
  initLargeCategory() {
    for (const iterator of this.treeData) {
      if (iterator.data === this.selectedFiles.data) {
        this.filesTwo = _.cloneDeep(iterator.children);
      }
    }
    for (const iteratorFirst of this.filesTwo) {
      if (iteratorFirst.label === '智能制造专项') {
        iteratorFirst.expanded = true;
      }
      for (const iteratorSecond of iteratorFirst.children) {
        iteratorSecond.children = [];
      }
    }
    this.initIndexList();
  }
  // 初始化指标项列表
  initIndexList() {
    this.selectedFilesTwo = this.filesTwo[0].children[0];
    this.selectedFilesTwo['parent'] = this.filesTwo[0];
    this.analyzeTreeData(this.selectedFilesTwo);
    this.initQueryTraditions();
  }
  // 更新指标项列表
  updateNodeTree(event) {
    this.ifhideMaincode = false;
    this.analyzeTreeData(event.node);
    this.selectedThreeCode = [];
    this.selectedCategories = [];
    console.log(this.selectedType);
    if (this.selectedType === 'detail') {
      this.ifhideMaincode = true;
      this.selectedThreeCode.push(this.checkboxArr[0]);
      this.selectedThreeCode.push(this.checkboxArr[1]);
      this.selectedThreeCode.push(this.checkboxArr[2]);
    }
    this.onChangeimplementation();
  }
  // 解析指标项列表结构数据
  analyzeTreeData(param) {
    if (param['parent']) {
      this.selectedParent = param.parent.data;
      this.selectedType = param.style;
      const parentCode = param.parent.data;
      const childrenCode = param.data;
      const childrenStyle = param.style;
      childrenStyle === 'progress' ? this.ifMultiple = true : this.ifMultiple = false;
      // childrenStyle === 'progress' ? this.multipleType = false : this.multipleType = true;
      // childrenStyle === 'progress' ? this.checkboxType = false : this.checkboxType = true;
      for (const iteratorParent of this.treeData[0].children) {
        if (iteratorParent.data === parentCode) {
          for (const iteratorChildren of iteratorParent.children) {
            if (iteratorChildren.data === childrenCode) {
              this.checkboxArr = _.cloneDeep(iteratorChildren.children);
            }
          }
        }
      }
      console.log(this.checkboxArr);
      // return param.label;
    }
  }
  // 筛选指标项
  onChangeimplementation() {
    this.selectedIndexs = [];
    this.selectedIndexAll = [];
    // tslint:disable-next-line:max-line-length
    if (this.selectedType === 'detail' && (this.selectedCategories.length === 0 || this.selectedCategories.length === 1)) {
      this.selectedCategories = this.selectedCategories.concat(this.selectedThreeCode);
    }
    console.log(this.selectedCategories);
    for (const category of this.selectedCategories) {
      if (category['children']) {
        const aheadYearsCategories = category['children'];
        for (const _category of aheadYearsCategories) {
          this.selectedIndexs.push({ code: _category['data'] });
          this.selectedIndexAll.push({ data: _category['data'], label: _category['label'], unit: _category['unit'] });
        }
      } else {
        this.selectedIndexs.push({ code: category['data'] });
        this.selectedIndexAll.push({ data: category['data'], label: category['label'], unit: category['unit'] });
      }
    }
  }
  // 条件处理数据查询
  resetCondition() {
    this.nameInput = '';
    this.selectedTime = [];
    this.selectedArea = [];
    this.selectedIndustry = [];
  }
  // 查询条件筛选
  selectList(map, i, type) {
    const list = [];
    if (type !== '指标项' && map.length === i) {
      return 0;
    } else if (map.length === 0 || map.length === undefined) {
      alert('请选择' + type);
    } else {
      map.forEach((data) => {
        list.push(data.code);
      });
      return list.join(',');
    }
  }
  // 初始化查询条件、表格数据
  initQueryTraditions() {
    this.selectedCategories[0] = this.checkboxArr[0];
    this.onChangeimplementation();
    this.selectedTime = [this.timeOption[0]];
    this.selectedArea = [this.areaOption[0]];
    this.selectedIndustry = [this.industryOption[0]];
    this.dataQuery();
  }
  // 表格合并功能
  tableReset() {
    const t = setTimeout(function () {
      let tdDom = $('p-datatable tbody tr');
      let tdDomOther = $('p-datatable tbody tr');
      let tdText = '';
      let rowspanIndex = 1;
      const value = 1;
      $('p-datatable tbody tr').each(function (index) {
        if (index === 0) {
          tdDom = $(this);
          tdDomOther = $(this);
          tdText = $(this).find('td:eq(' + value + ')').find('span').text();
        } else {
          if (tdText === $(this).find('td:eq(' + value + ')').find('span').text()) {
            const parentThis = $(this);
            $(this).find('td:eq(' + value + ')').css({ 'display': 'none' });
            rowspanIndex++;
            tdDom.find('td:eq(' + value + ')').attr('rowspan', rowspanIndex);
            $.each([0, 2, 3], function (name, valueTd) {
              parentThis.find('td:eq(' + valueTd + ')').css({ 'display': 'none' });
              tdDomOther.find('td:eq(' + valueTd + ')').attr('rowspan', rowspanIndex);
            });
          } else {
            tdDom = $(this);
            tdDomOther = $(this);
            tdText = $(this).find('td:eq(' + value + ')').find('span').text();
            rowspanIndex = 1;
          }
        }
      });
    }, 1000);
  }
  // 查询表格数据
  dataQuery() {
    const selectedParent = this.selectedParent;
    const selectedType = this.selectedType;
    const selectIndexsCode = this.selectList(this.selectedIndexs, '', '指标项');
    const selectDateCode = this.selectList(this.selectedTime, this.timeOption.length, '时间');
    const selectAreaCode = this.selectList(this.selectedArea, this.areaOption.length, '省份');
    const selectIndCode = this.selectList(this.selectedIndustry, this.industryOption.length, '领域');
    // tslint:disable-next-line:max-line-length
    console.log(selectIndexsCode);
    if (selectedType && selectIndexsCode && (selectDateCode || selectDateCode === 0) && (selectDateCode || selectDateCode === 0) && (selectIndCode || selectIndCode === 0)) {
      // tslint:disable-next-line:max-line-length
      this.http.getUrl<any>(this.BigdatabaseDataService.getQueryDataUrl(selectedType, selectIndexsCode, selectDateCode, selectAreaCode, selectIndCode)).toPromise().then(
        data => {
          this.theadData = [];
          this.tbodyData = [];
          if (!data || data.length === 0) {
            alert('暂无数据!');
          } else {
            switch (selectedType) {
              case 'overview':
                this.overviewShow = true;
                this.detailShow = false;
                this.effectShow = false;
                const returnData = this.BigdatabaseTableService.analyseOverviewData(data);
                this.theadData = returnData.head;
                this.tbodyData = returnData.body;
                break;
              case 'detail':
                this.overviewShow = false;
                this.detailShow = true;
                this.effectShow = false;
                let mapData;
                if (selectedParent === 'ZN03') {
                  mapData = this.BigdatabaseTableService.detailsData2(data, this.selectedIndexAll);
                } else {
                  mapData = this.BigdatabaseTableService.detailsData(data, this.selectedIndexAll);
                }
                this.theadData = mapData.head;
                this.tbodyData = mapData.body;
                break;
              case 'progress':
                this.overviewShow = false;
                this.detailShow = false;
                this.effectShow = true;
                const effectData = this.BigdatabaseTableService.effectData(data);
                this.theadData = effectData.head;
                this.tbodyData = effectData.body;
                this.tableReset();
                break;
              default:
                break;
            }
          }
        },
      );
    }
  }
}
