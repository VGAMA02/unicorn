import { Injectable } from '@angular/core';
import 'rxjs';
import { Config } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RecomendacionesService {
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
    //Conseguir schedules de diversion
    getSchedulesAnalitics(id,category): Observable<any> {
        let data = {id,category}
        return this._http.post(this.apiEndpoint +'analitycs/analitycsGetScheduledDiversion',data);
    }
    getSchedulesAnaliticsLimiterDiversion(id,category,limiter,opcion): Observable<any> {
        let data = {id,category,limiter,opcion}
        return this._http.post(this.apiEndpoint +'analitycs/analitycsGetScheduledByCategoryLimiter',data);
    }
    getSchedulesAnaliticsTraport(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/analitycsGetScheduledTransport',data);
    }
    getSchedulesAnaliticsWork(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/analitycsGetScheduledWork',data);
    }






}