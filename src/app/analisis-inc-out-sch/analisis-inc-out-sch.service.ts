import { Injectable } from '@angular/core';
import 'rxjs';
import { Config } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AnalisisIncOutSchService {
    apiEndpoint: string;
    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    //funciones para traer los datos de ingresos y egresos reales.
    getOutflowsByIdAndDateS(id,startDate,days): Observable<any>{
        let data = {id,startDate,days};
        return this._http.post(this.apiEndpoint +'outflow/getOutflowsAmountDate',data);
    }
    getIncomesByIdAndDateS(id,startDate,days): Observable<any>{
        let data = {id,startDate,days};
        return this._http.post(this.apiEndpoint +'income/getIncomesAmountDate',data);
    }
    /////////////Funciones para traer los schedules futuros
    getIncomesFuturos(id,days): Observable<any> {
        let data = {id,days}
        return this._http.post(this.apiEndpoint +'scheduled/getIngresosFuturos',data);
    }
    getEgresosFuturos(id,days): Observable<any> {
        let data = {id,days}
        return this._http.post(this.apiEndpoint +'scheduled/getEgresosFuturos',data);
    }
}