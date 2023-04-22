import { Injectable } from '@angular/core';
import 'rxjs';
import { Config } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ScheduledService {

    apiEndpoint: string;

    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    addScheduled(data): Observable<any> {
        return this._http.post(this.apiEndpoint +'scheduled/create',data);
    }
    //actualizarCagoriaDescheduled
    AsingCategoryDiversion(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/updateSchedulesDiversionController',data);
    }
    AsingCategoryHigiene(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/updateSchedulesHigieneController',data);
    }
    AsingCategoryRopa(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/updateSchedulesRopaController',data);
    }
    AsingCategoryTransporte(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/updateSchedulesTransporteController',data);
    }
    AsingCategoryCasa(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/updateSchedulesCasaController',data);
    }
    AsingCategoryCuentasPagos(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/updateSchedulesCuentasPagosController',data);
    }
    AsingCategoryAlimentacion(id): Observable<any> {
        let data = {id}
        return this._http.post(this.apiEndpoint +'analitycs/updateSchedulesAlimentacionController',data);
    }



}
