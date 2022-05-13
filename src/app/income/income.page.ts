import { Component, OnInit } from '@angular/core';
import { IncomeService } from './income.service';
import * as Chart from "chart.js"
import { ChangeDetectorRef } from '@angular/core'; 
import { NgxEchartsModule } from 'ngx-echarts';
import { color, EChartsOption } from 'echarts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  providers: [IncomeService,NgxEchartsModule,DatePipe],
  
})

export class IncomePage implements OnInit {
  limiter: number = 3;
  averageIncomes: number = 0;
  incomes: Array<any>;
  BiggerIncomes: Array<any>;
  incomesMonth: Array<any>;
  chartIncomes: Chart;
  chartIncomesMonth: Chart;
  ref: ChangeDetectorRef;
  bar: Ng2GoogleChartsModule;
  constructor(private _IncomeService:IncomeService, private datePipe: DatePipe,
    ) { 
      this.getBiggerIncomesInLastMounth();
      this.getIncomesLimiterPage();
    
    }

  ngOnInit() {
      //this.ref.detectChanges();
      //this.generateCharts();
      //this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
  }

  
  ngAfterContentInit(){
    //this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
    //this.graficoDos();
    //this.loadColumnChart(); 
    this.AverageIncomes();
  }
  ngAfterViewInit(){
    //this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
  }
  generarGraficoBoton(){
    //this.loadColumnChart();
    this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
    this.Incomes_Charts(this.incomesMonth);
  }
  getIncomesLimiterPage(){
    this._IncomeService.getIncomesLimiter(parseInt(localStorage.getItem("idUser")),this.limiter).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.incomes = res.incomes
        console.log("\n----------------------\n");
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;

    
  }
  getBiggerIncomesInLastMounth(){
    this._IncomeService.getBiggerIncomesInLastDaysS(parseInt(localStorage.getItem("idUser")),this.limiter,60).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.BiggerIncomes = res.incomes
        console.log("\n----------------------\n");
        this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;

    //this.BiggerIncomesInLastMounth_Charts(this.BiggerIncomes);
  }
  BiggerIncomesInLastMounth_Charts(BiggerIncomes: Array<any>) { //los ultimos 3 incomes con mayor ingreso del mes.
    const ctx = document.getElementById("myChart");

    if(this.chartIncomes != undefined){
      this.chartIncomes.destroy();
    }
    this.chartIncomes = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['primero', 'segundo', 'tercero'],
          datasets: [{
              label: ['primero', 'segundo', 'tercero'],
              data: [ BiggerIncomes[0].amount , BiggerIncomes[1].amount, BiggerIncomes[2].amount ],
              //data: [ Math.floor(Math.random()*(240-20+1)+20) ,Math.floor(Math.random()*(240-20+1)+20),Math.floor(Math.random()*(240-20+1)+20) ],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
          }]
      },
      options: {
        
        responsive: false,
        title: {
          display: true,
          text: 'Ingresos Mas significativos al mes'
        },
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
            
        },
    } 
  });
  this.chartIncomes.update();
  }
  AverageIncomes(){
    let ActualDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
    this._IncomeService.getIncomesByIdAndDateS(parseInt(localStorage.getItem("idUser")),ActualDate,60).subscribe((res)=>{
      if(res.status === true){
        console.log(res);
        this.incomesMonth = res.incomes
        console.log("\n----------------------\n");
        let AverageIncomes = 0;
        this.incomesMonth.forEach(income => {
          AverageIncomes += income.amount;
        });
        this.averageIncomes = AverageIncomes / this.incomesMonth.length;
        this.averageIncomes = parseFloat(this.averageIncomes.toFixed(2)); //dejar solo 2 decimales
        //console.log(AverageIncomes / this.FrecuenciesIncomes.length)
        this.Incomes_Charts(this.incomesMonth);
      } 
    },(error) =>{
      console.log(error);
    }).unsubscribe;
  }
  Incomes_Charts(incomesMonth: Array<any>) { //promedio de money ganada.
    const ctx = document.getElementById("myChart2");
    //if(this.chartIncomes != undefined){
    //  this.chartIncomes.destroy();
    //}
    console.log('Grafico average: ' + this.incomesMonth);
    this.chartIncomesMonth = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: [],
          datasets: [{
              label: [],
              data: [],
              backgroundColor: [
                  //'rgba(255, 99, 132, 0.2)',
                  //'rgba(54, 162, 235, 0.2)',
                  //'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  //'rgba(255, 99, 132, 1)',
                  //'rgba(54, 162, 235, 1)',
                  //'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
          }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
            
        },
        title: {
          display: true,
          text: 'Ingresos del mes'
        }
    } 
  });
  let rojo = 0, verde = 0, azul = 0;
  let color = 'rgba(255, 99, 132, 0.2)';
  let borde = 'rgba(255, 99, 132, 1)';
  incomesMonth.forEach(income => {
    this.chartIncomesMonth.data.datasets[0].data.push(income.amount);
    this.chartIncomesMonth.data.labels.push(income.description);
    rojo = Math.floor(Math.random()*(240-20+1)+20);  
    verde = Math.floor(Math.random()*(240-20+1)+20);
    azul = Math.floor(Math.random()*(240-20+1)+20);
    color = "rgba(" + rojo + "," + verde + "," + azul + ", 0.3)"; 
    borde = "rgba(" + rojo + "," + verde + "," + azul + ", 1)"; 
    this.chartIncomesMonth.data.datasets[0].backgroundColor.push(color);
    this.chartIncomesMonth.data.datasets[0].borderColor.push(borde);

  });
  this.chartIncomesMonth.update();
  }
  mostRepeatedIncomes_Charts(){ //Los ingresos que mas se repiten.
    
  }
 
  /*
  loadColumnChart() {
    console.log('grafico inicio: ' + this.bar);
    
    this.bar = {
      chartType: 'ColumnChart',
      dataTable: [
        ['City', '2010 Population'],
        ['New York City, NY', 8175000],
        ['Los Angeles, CA', 3792000],
        ['Chicago, IL', 2695000],
        ['Houston, TX', 2099000],
        ['Philadelphia, PA', 1526000]
      ],
      //opt_firstRowIsData: true,
      options: {
        title: 'Population of Largest U.S. Cities',
        height: 600,
        //chartArea: { height: '400' },
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      },

    };
    console.log(this.bar)
}

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        return `<b>${params['name']}</b> : $ ${params['value']}`;
      }
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680, 1890, 2300],
      type: 'line',
      areaStyle: {}
    }]
  }
  */

  /*
  chartsOption: EChartsOption = {
    tooltip : {
      trigger: 'item',
      formatter: '{c}'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: [50,60,80,40],
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      splitNumber: 4,
      axisLine: {
        show: false
      }
    },
    grid: {
      left: '10%',
      right: '0%'
    },
    series: [
      {
        id: 'earnings',
        name: 'Earnings',
        type: 'line'
      },
      {
        id: 'revenue',
        name: 'Revenue',
        type: 'line',
        lineStyle: {
          color: '#CCC',
          type: 'dashed'
        }
      }
    ]
  };
  */

  

}
