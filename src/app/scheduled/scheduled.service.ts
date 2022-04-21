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

}
