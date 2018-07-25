import { Injectable } from '@angular/core';
import { HttpApi } from './../../../shared/do-service/http-api.service';

@Injectable()
export class BigdatabasenewDataService {
    restapiUrlPrefix = 'http://219.239.97.111:10088/app/rest/v2/services/';

    constructor(private http: HttpApi) { }

    // 子库、指标、指标项查询API
    getAllDbTypeUrl() {
        return this.restapiUrlPrefix + 'bigscreen169_MenuService/getMenu';
    }
    /**
     * 表格数据查询API，当查询表格数据时，传入参数，含义如下：
     * @param type 查询的类型（概况、详情、进度）
     * @param indexIds 查询的列表项ID
     * @param dates 查询的时间
     * @param areas 查询的区域
     * @param industries 查询的领域
     */
    getQueryDataUrl(type, indexIds, dates, areas, industries) {
        // tslint:disable-next-line:max-line-length
        return this.restapiUrlPrefix + 'bigscreen169_QueryService/queryData?type=' + type + '&indexIds=' + indexIds + '&dates=' + dates + '&areas=' + areas + '&industries=' + industries;
    }
}
