import { Injectable } from '@angular/core';
import { HttpApi } from './../../shared/do-service/http-api.service';

@Injectable()
export class BigdatabasenewDataService {
    restapiUrlPrefix = 'http://10.3.64.151:10703/app/rest/v2/services/';

    constructor(private http: HttpApi) { }

    getDbTypeUrl() {
        return this.restapiUrlPrefix + 'bigscreen169_TreeMenuService/getChildDbType';
    }
    getIndexBigTypeUrl(dbCode) {
        return this.restapiUrlPrefix + 'bigscreen169_TreeMenuService/indexBigType?dbCode=' + dbCode;
    }
    getFilterDateConditionUrl(dateType) {
        return this.restapiUrlPrefix +
            'bigscreen169_FilterConditionQueryService/filterDateCondition?dateType=' + dateType;
    }
    getFilterConditionUrl(indexIds) {
        // tslint:disable-next-line:max-line-length
        return this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/filterCondition?indexIds='
            + '[' + indexIds + ']';
    }
    getIndexDetailsUrl(dbCode, groupIds) {
        return this.restapiUrlPrefix
            + 'bigscreen169_TreeMenuService/indexDetails?dbCode=' + dbCode
            + '&groupIds=' + groupIds;
    }
    /*
    *  当查询 企业库、园区库时，传入参数 含义如下：
    *  indexIds 表的字段
    *  date 企业创建日期，查询结果企业大于此日期
    *  dateType PRK='企业' 或者 COM='园区' 其他值代表指标库数据查询
    *  areas 代表地区
    *  industries 代表行业
    *  search 代表企业或园区名称
    */
    getCompanyQueryDataUrl(indexIds, date, dateType, areas, industries, search) {
        return this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/queryData?'
            + 'indexIds=' + indexIds
            + '&date=' + date
            + '&dateType=' + dateType
            + '&areas=' + areas
            + '&industries=' + industries
            + '&search=' + search;
    }
    /*
    *  当查询 指标库时，传入参数 含义如下：
    *  indexIds 指标id
    *  date 日期条件
    *  dateType 日期类型
    *  areas 地区
    *  industries 行业
    *  search 空，此接口无用
    */
    getIndexQueryDataUrl(indexIds, date, dateType, areas, industries, search) {
        // tslint:disable-next-line:forin
        // 判断是否是特殊表数据
        if (indexIds.indexOf('COM') !== -1 || indexIds.indexOf('DATA') !== -1) {
            dateType = 'companyInfo';
        }
        return this.restapiUrlPrefix + 'bigscreen169_FilterConditionQueryService/queryData?'
            + 'indexIds=' + indexIds
            + '&date=' + date
            + '&dateType=' + dateType
            + '&areas=' + areas
            + '&industries=' + industries
            + '&search=' + search;
    }
    getFuzzyQuartUrl(searchTerm) {
        return this.restapiUrlPrefix + 'bigscreen169_FuzzyQueryService/fuzzyQuery?searchTerm=' + searchTerm;
    }
}
