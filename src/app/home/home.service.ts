import { Injectable } from '@angular/core';
import 'rxjs';
import { Config } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HomeService {

    apiEndpoint: string;

    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    getIncomes(id,startDate,days): Observable<any> {
        let data = {id,startDate,days}
        return this._http.post(this.apiEndpoint +'scheduled/getSchedules',data);
    }
    getSaldoActual(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'scheduled/getSaldoActual',data);
    }
    getSaldoFuturo(id,days): Observable<any> {
        let data = {id,days}
        return this._http.post(this.apiEndpoint +'scheduled/getSaldoFuturo',data);
    }
}
