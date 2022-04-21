import { Component, OnInit } from '@angular/core';
//import{MenuService} from './menu.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  //providers:[MenuService]
})
export class MenuPage implements OnInit {
  public paginas =[
    {
      titulo:'Inicio',
      url:'/menu/home',
      icon:'alert'
    }, 
    {
      titulo:'Ingresos',
      url:'/menu/income',
      icon:'alert'
    },
    {
      titulo:'Gastos',
      url:'/menu/outflow',
      icon:'alert'
    },
  ];
  selectedIndex: number;
  constructor(/* private _MenuService: MenuService, */
              public navCtrl:NavController,){
    
  }

  ngOnInit() {
  }
  changeSelectedIndex(index: number) {
      this.selectedIndex = index
    }
}
