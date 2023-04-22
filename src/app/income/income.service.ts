import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Observable } from "rxjs";

@Injectable()
export class IncomeService {

    apiEndpoint: string;

    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    getIncomesLimiter(id,limiter): Observable<any> {
        let data = {id,limiter}
        return this._http.post(this.apiEndpoint +'scheduled/getIncomesLimiter',data);
    }
    getBiggerIncomesInLastDaysS(id,limiter,days): Observable<any>{
        let data = {id,limiter,days};
        return this._http.post(this.apiEndpoint +'income/getBiggerIncomesInLastDays',data);
    }
    getIncomesByIdAndDateS(id,startDate,days): Observable<any>{
        let data = {id,startDate,days};
        return this._http.post(this.apiEndpoint +'income/getIncomesDate',data);
    }
}