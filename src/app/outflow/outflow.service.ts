import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Observable } from "rxjs";

@Injectable()
export class OutflowService {
    apiEndpoint: string;
    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    getOutflowsLimiter(id,limiter): Observable<any> {
        let data = {id,limiter}
        return this._http.post(this.apiEndpoint +'scheduled/getOutflowsLimiter',data);
    }
    getBiggerOutflowsInLastDaysS(id,limiter,days): Observable<any>{
        let data = {id,limiter,days};
        return this._http.post(this.apiEndpoint +'outflow/getBiggerOutflowsInLastDays',data);
    }
    getOutflowsByIdAndDateS(id,startDate,days): Observable<any>{
        let data = {id,startDate,days};
        return this._http.post(this.apiEndpoint +'outflow/getOutlowsDate',data);
    }
}