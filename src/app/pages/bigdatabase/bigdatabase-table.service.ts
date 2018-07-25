import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { HttpApi } from './../../shared/do-service/http-api.service';
import { COSMIC_THEME } from '../../@theme/styles/theme.cosmic';

@Injectable()
export class BigdatabaseTableService {
  colsType = {
    'PRK': '园区名称',
    'COM': '企业名称',
    'INDEX': '日期',
  };
  cols: object[];
  columnOptions: SelectItem[];
  tableData: object[];
  constructor(private http: HttpApi) { }
  // 企业库园区库 [[数据映射, 表头显示]...]
  getCols4PRKCOM(type, selectedCategories, checkBoxMap) {
    const resultColumns = [['c0', this.colsType[type]]];
    for (let tmpIndex = 0; tmpIndex < selectedCategories.length; tmpIndex++) {
      const tmpCategory = selectedCategories[tmpIndex];
      // tslint:disable-next-line:max-line-length
      resultColumns.push(['c' + (tmpIndex + 1), checkBoxMap[tmpCategory]]);
    }
    return resultColumns;
  }
  // 企业库园区库 [{数据映射:数值...}...]
  getTableData4PRKCOM(type, data) {
    const resultTable = [];
    for (const tmpCategory of data[type]) {
      const resultMap = {};
      for (let j = 0; j < tmpCategory.length; j++) {
        const rowData = tmpCategory[j];
        rowData === null ? resultMap['c' + j] = '' : resultMap['c' + j] = rowData;
      }
      resultTable.push(resultMap);
    }
    return resultTable;
  }
  // 指标库表头
  getCols4Index(type, selectedCategories, selectedArea, selectedIndustry, checkBoxMap) {
    const resultColumns = [['c0', this.colsType[type]]];
    const resultMap = {};
    let tmpIndex = 1;
    // col字段
    let dataStr = '';
    for (const tmpArea of selectedArea) {
      if (selectedIndustry && selectedIndustry.length > 0) {
        for (const tmpInd of selectedIndustry) {
          for (const tmpCategory of selectedCategories) {
            // tslint:disable-next-line:max-line-length
            resultColumns.push(['c' + tmpIndex, tmpArea['name'] + '\n' + tmpInd['name'] + '\n' + checkBoxMap[tmpCategory], '']);
            tmpIndex++;
            dataStr += '_0';
          }
        }
      } else {
        for (const tmpCategory of selectedCategories) {
          // tslint:disable-next-line:max-line-length
          resultColumns.push(['c' + tmpIndex, tmpArea['name'] + '\n' + checkBoxMap[tmpCategory], '']);
          tmpIndex++;
          dataStr += '_0';
        }
      }
    }
    dataStr = dataStr.substr(1);
    return resultColumns;
  }
  // 指标库数据
  getTableData4Index(selectedCategories, areas, industries, resultColumns, data) {
    console.log(data instanceof Object);
    console.log(data.companyInfo);
    console.log(data);
    // 数据空行
    let dataStr = '';
    for (let i = 1; i < resultColumns.length; i++) {
      dataStr += '_0';
    }
    dataStr = dataStr.substr(1);
    // 日期索引位置填入变量
    let tmpIndex = 0;
    const resultMap = {};
    const resultTime = [];
    for (const tmpCategory of selectedCategories) {
      data[tmpCategory] === undefined ? data[tmpCategory] = [] : data[tmpCategory] = data[tmpCategory];
      for (const rowData of data[tmpCategory]) {
        // 按照日期初始化
        if (resultTime.indexOf(rowData[0]) < 0) {
          resultTime.push(rowData[0]);
          resultMap[rowData[0]] = dataStr.split('_');
          resultMap[rowData[0]][0] = rowData[0];
          console.log(rowData);
          console.log(resultMap);
        }
        // 日期行填指标数值
        const idx_area = areas.split(',').indexOf(rowData[1]) + 1;
        let idx_ind = 1;
        if (rowData[2] === null || industries === '') {
          idx_ind = 1;
        } else {
          idx_ind = industries.split(',').indexOf(rowData[2]) + 1;
        }
        console.log(rowData);
        console.log(resultMap);
        resultMap[rowData[0]][
          idx_area *
          idx_ind *
          (tmpIndex + 1)
        ] = rowData[3];
      }
      tmpIndex++;
    }
    // 转换格式
    const resultTable = [];
    for (const tmpTime of resultTime) {
      const tableRow = { 'c0': tmpTime };
      for (let idx = 1; idx < resultMap[tmpTime].length; idx++) {
        tableRow['c' + idx] = resultMap[tmpTime][idx];
      }
      resultTable.push(tableRow);
      console.log(resultTable);
    }
    return resultTable;
  }
  // pgTable格式处理方法
  formatCols4PgTable(resultColumns) {
    const formattedColsConf = { columns: [], option: [] };
    for (const col of resultColumns) {
      const column = { field: col[0], header: col[1] };
      formattedColsConf.columns.push({ field: col[0], header: col[1] });
      formattedColsConf.option.push({ label: col[1], value: column });
    }
    formattedColsConf.option.shift();
    return formattedColsConf;
  }
}
