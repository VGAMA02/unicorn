import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Observable } from "rxjs";

@Injectable()
export class EditingScheduledService {

    apiEndpoint: string;

    constructor(private _http: HttpClient, private config: Config) {
        this.apiEndpoint = this.config.API_MAIN;
    }
    getScheduled(idScheduled,idUser): Observable<any> {
        let data = {idScheduled,idUser}
        return this._http.post(this.apiEndpoint +'scheduled/getScheduled',data);
    }
    modificarScheduled(data): Observable<any> {
        //let data = {idScheduled,idTypeInput,amount,description,idType,idUser,startDate}
        return this._http.post(this.apiEndpoint +'scheduled/changeScheduledAll',data);
    }
}