import { Component, OnInit } from '@angular/core';
import { OutflowService } from './outflow.service';
@Component({
  selector: 'app-outflow',
  templateUrl: './outflow.page.html',
  styleUrls: ['./outflow.page.scss'],
  providers: [OutflowService]
})
export class OutflowPage implements OnInit {

  constructor(private _OutflowService:OutflowService) {
    this.getOutflowsLimiterPage();
   }
  limiter: number = 3;
  outflows: Array<any>;
  ngOnInit() {
  }
  getOutflowsLimiterPage(){
    this._OutflowService.getOurflowsLimiter(parseInt(localStorage.getItem("idUser")),this.limiter).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.outflows = res.outflows;
        console.log("\noutflows ----------------------\n");
        console.log(this.outflows);
        console.log("\n----------------------\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }

}
