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
    getOurflowsLimiter(id,limiter): Observable<any> {
        let data = {id,limiter}
        return this._http.post(this.apiEndpoint +'scheduled/getOutflowsLimiter',data);
    }
}