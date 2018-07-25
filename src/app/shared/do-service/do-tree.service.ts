import { TreeNode } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DoTreeService {

    constructor(private http: Http) { }

    getFiles(files) {
        return this.http.get(files)
            .toPromise()
            .then(res => <TreeNode[]>res.json().data);
    }
}
