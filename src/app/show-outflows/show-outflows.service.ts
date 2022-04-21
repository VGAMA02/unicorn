import { Injectable } from '@angular/core';
import 'rxjs';
import { Config } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ShowOutflowsService {
    apiEndpoint: string;
    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    getOutflows(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'scheduled/getOutflows',data);
    }
}
