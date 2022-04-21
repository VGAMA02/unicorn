import { NgModule } from "@angular/core";
import { Subject, Observable } from 'rxjs'

@NgModule()
export class Events {
    homeChangeSubject: Subject<any> = new Subject();
    homeChange: Observable<any> = this.homeChangeSubject.asObservable();
    constructor(){

    }
}