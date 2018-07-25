import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { HttpApi } from './../../../shared/do-service/http-api.service';
import { COSMIC_THEME } from '../../../@theme/styles/theme.cosmic';
import * as $ from 'jquery';
@Injectable()
export class BigdatabasenewTableService {
  private areaOption: Object = {
    '110000': '北京市',
    '120000': '天津市',
    '130000': '河北省',
    '140000': '山西省',
    '150000': '内蒙古自治区',
    '210000': '辽宁省',
    '220000': '吉林省',
    '230000': '黑龙江省',
    '310000': '上海市',
    '320000': '江苏省',
    '330000': '浙江省',
    '340000': '安徽省',
    '350000': '福建省',
    '360000': '江西省',
    '370000': '山东省',
    '410000': '河南省',
    '420000': '湖北省',
    '430000': '湖南省',
    '440000': '广东省',
    '450000': '广西壮族自治区',
    '460000': '海南省',
    '500000': '重庆市',
    '510000': '四川省',
    '520000': '贵州省',
    '530000': '云南省',
    '540000': '西藏自治区',
    '610000': '陕西省',
    '620000': '甘肃省',
    '630000': '青海省',
    '640000': '宁夏回族自治区',
    '650000': '新疆维吾尔自治区',
  };
  // 概况表格数据解析
  analyseOverviewData(data) {
    const tableHead = [];
    const tableBody = [];
    const dataObj = {};
    data.forEach(element => {
      const map = {};
      let name = '';
      if (element.period && element.value && element.locid && element.indexname && element.domain) {
        // tslint:disable-next-line:max-line-length
        name = this.areaOption[element.locid] + ' -- ' + element.domain + ' -- ' + element.indexname + '(' + element.unit + ')';
        if (dataObj[name] === undefined) {
          dataObj[name] = {};
        }
        if (dataObj[name][element.period] === undefined) {
          dataObj[name][element.period] = element.value;
          tableHead.push(element.period);
        }
      }
    });
    $.unique(tableHead);
    // tslint:disable-next-line:forin
    for (const key in dataObj) {
      const map = {};
      map['指标项'] = key;
      for (const iterator of tableHead) {
        if (dataObj[key][iterator]) {
          map[iterator] = dataObj[key][iterator];
        } else {
          map[iterator] = '';
        }
      }
      tableBody.push(map);
    }
    tableHead.unshift('指标项');
    return { head: tableHead, body: tableBody };
  }
  // 详情表格数据解析
  detailsData(data, choseList) {
    const tableHead = ['项目获批时间', '项目名称', '承担单位'];
    const tableBody = [];
    choseList.forEach(element => {
      if (element.label === '项目获批时间' || element.label === '项目名称' || element.label === '承担单位') {
      } else {
        if (element['unit']) {
          tableHead.push(element.label + '(' + element['unit'] + ')');
        } else {
          tableHead.push(element.label);
        }
      }
    });
    data.forEach(element => {
      const map = {};
      choseList.forEach(list => {
        if (list['unit']) {
          element[list.data] ? map[list.label + '(' + list['unit'] + ')'] = element[list.data] : map[list.label] = '';
        } else {
          element[list.data] ? map[list.label] = element[list.data] : map[list.label] = '';
        }
      });
      tableBody.push(map);
    });
    return { head: tableHead, body: tableBody };
  }
  detailsData2(data, choseList) {
    const tableHead = ['评估时间', '项目名称', '单位名称'];
    const tableBody = [];
    choseList.forEach(element => {
      if (element.label === '评估时间' || element.label === '项目名称' || element.label === '单位名称') {
      } else {
        if (element['unit']) {
          tableHead.push(element.label + '(' + element['unit'] + ')');
        } else {
          tableHead.push(element.label);
        }
      }
    });
    data.forEach(element => {
      const map = {};
      choseList.forEach(list => {
        if (list['unit']) {
          element[list.data] ? map[list.label + '(' + list['unit'] + ')'] = element[list.data] : map[list.label] = '';
        } else {
          element[list.data] ? map[list.label] = element[list.data] : map[list.label] = '';
        }
      });
      tableBody.push(map);
    });
    return { head: tableHead, body: tableBody };
  }
  // 成效表格数据整理
  effectData(data) {
    const tableHead = ['项目获批时间', '项目名称', '牵头单位', '所属领域'];
    const tableBody = data;
    Object.keys(data[0]).forEach(element => {
      if (element === '项目获批时间' || element === '项目名称' || element === '所属领域' || element === '牵头单位') {

      } else {
        tableHead.push(element);
      }
    });
    tableHead.forEach(element => {
      tableBody.forEach(list => {
        list[element] ? list[element] = list[element] : list[element] = '';
      });
    });
    return { head: tableHead, body: tableBody };
  }
}
