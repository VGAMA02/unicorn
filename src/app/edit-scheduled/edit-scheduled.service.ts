import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Observable } from "rxjs";

@Injectable()
export class EditScheduledService {

    apiEndpoint: string;

    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    getSchedules(id,option): Observable<any> {
        let data = {id,option}
        return this._http.post(this.apiEndpoint +'scheduled/getSchedulesByIdOptions',data);
    }
    changeScheduleDelete(id,idScheduled): Observable<any> {
        let data = {id,idScheduled}
        return this._http.post(this.apiEndpoint +'scheduled/changeScheduled',data);
    }
}