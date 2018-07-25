import { Injectable } from '@angular/core';
import { HttpApi } from './../../shared/do-service/http-api.service';

@Injectable()
export class BigdatabaseDbsrcService {
    dbsrcCnt = 11;
    dtsrcs = {
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
        '外部委共享数据': '10',
    };
    constructor(private http: HttpApi) { }
    initDbsrcIconUrls() {
        const iconUrls = [];
        for (let idx = 0; idx < this.dbsrcCnt; idx++) {
            iconUrls.push('assets/images/dtsrc_' + idx + '.png');
        }
        return iconUrls;
    }
    updateDbsrcIconUrls(checkBoxDtsrcMap, selectedCategories) {
        const iconUrls = this.initDbsrcIconUrls();
        for (const category of selectedCategories) {
            if (checkBoxDtsrcMap[category]) {
                const idx = this.dtsrcs[checkBoxDtsrcMap[category]];
                const math = ['0', '1', '2', '3', '4'];
                for (const i of math) {
                    if (idx === i) {
                        iconUrls[10] = 'assets/images/dtsrc_' + 10 + 'a.png';
                    } else {
                        iconUrls[idx] = 'assets/images/dtsrc_' + idx + 'a.png';
                    }
                }
            }
        }
        return iconUrls;
    }
}
