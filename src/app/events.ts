import { NgModule } from "@angular/core";
import { Subject, Observable } from 'rxjs'

@NgModule()
export class Events {
    homeChangeSubject: Subject<any> = new Subject();
    homeChange: Observable<any> = this.homeChangeSubject.asObservable();

    scheduledChangeSubject: Subject<any> = new Subject();
    scheduledChange: Observable<any> = this.scheduledChangeSubject.asObservable();

    AnalisisChangeSubject: Subject<any> = new Subject();
    AnalisisChange: Subject<any> = new Subject();
    constructor(){

    }
}