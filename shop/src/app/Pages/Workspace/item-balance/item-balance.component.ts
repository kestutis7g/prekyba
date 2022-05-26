import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { ItemBalanceService } from 'src/app/services/itemBalance.service';
import { ItemBalance } from 'src/model/shop.types';

import { MomentDateAdapter } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { templateJitUrl } from '@angular/compiler';

//const moment = _rollupMoment || _moment;
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-item-balance',
  templateUrl: './item-balance.component.html',
  styleUrls: ['./item-balance.component.css'],
  providers: [DatePipe,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class ItemBalanceComponent implements OnInit {

  constructor(
    private itemBalanceService: ItemBalanceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  itemBalanceList: ItemBalance[] = [];
  itemId: number = 0;
  label: string = "";
  labels: string[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  daysSelected: number = 30;
  date = new FormControl(moment());

  amount: number[] = [];
  predicted1: number[] = [];
  predicted2: number[] = [];
  predicted3: number[] = [];
  predicted4: number[] = [];
  regression: number[] = [];

  ngOnInit(): void {

    let route = this.activatedRoute.params.subscribe(params => {
      this.itemId = params['id']
      this.predict();
    });

  }


  predict() {
    this.labels = [];
    this.amount = [];
    this.predicted1 = [];
    this.predicted2 = [];
    this.predicted3 = [];
    this.predicted4 = [];
    this.regression = [];
    let day: number = 0;
    this.itemBalanceService.getItemBalanceListByItemId(this.itemId).subscribe({
      next: (data) => {
        this.itemBalanceList = data;
        this.label = data[0].itemId.toString()

        this.itemBalanceList.sort((a,b) => a.date.localeCompare(b.date));

        if(this.range.value.start && this.range.value.end){

          let start = new Date(this.range.value.start.format('YYYY-MM-DD').toString());
          let end = new Date(this.range.value.end.format('YYYY-MM-DD').toString());
          let firstDate = new Date(this.itemBalanceList[0].date);

          if( 0 > Math.floor((Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) - Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate()) ) /(1000 * 60 * 60 * 24))){
            start = firstDate;
          }
          this.daysSelected = Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) ) /(1000 * 60 * 60 * 24)) + 1;

          this.itemBalanceList.forEach(balance => {
            let balanceDate = new Date(balance.date);


            if(balanceDate.getTime() >= start.getTime() && balanceDate.getTime() <= end.getTime()){
              this.amount.push(balance.amount)
              this.labels.push(balance.date)
              day++
            }
          });

        }
        else{
          this.itemBalanceList.forEach(balance => {
            this.amount.push(balance.amount)
            this.labels.push(balance.date)
            day++
          });
        }




        let date = new Date();

        while (day < this.daysSelected) {

          //sekanti diena
          date.setDate( date.getDate() + 1 );
          //date.setHours(12);
          //date.setMinutes(0);
          //date.setSeconds(0);
          //pakeiciam formta
          let d =this.datePipe.transform(date, 'yyyy-MM-dd');
          //pridedam i labels
          this.labels.push(d!.toString())
          day++;
        }

        this.linearRegression()
        this.getPrediction1()
        this.getPrediction2()
        this.getPrediction3()
        this.getPrediction4()


        this.salesData = {
          labels: this.labels,
          datasets: [
            { label: 'Kiekis', data: this.amount, tension: 0.5 },
            { label: 'Predicted', data: this.predicted1, tension: 0.5 },
            { label: 'Predicted', data: this.predicted2, tension: 0.5 },
            { label: 'Predicted', data: this.predicted3, tension: 0.5 },
            { label: 'Predicted', data: this.predicted4, tension: 0.5 },
            { label: 'regression', data: this.regression, tension: 0.5 },
          ],
        };
      },
      error: (error) => {
        console.log(error);
      }}
    );
  }

  getPrediction1(){
    let previousBalance: number = 0;
    let count = 0;
    let averageConsumption: number = 0;
    let day: number = 0;
    this.amount.forEach(balance => {

      this.predicted1.push(balance)
      day++
      if(previousBalance > balance){
        count++;
        averageConsumption = averageConsumption + (previousBalance - balance);
      }
      previousBalance = balance;


    });
    //jei nera duomenu tada turetu nuspet kad kiekviena diena mazeja po viena
    if(averageConsumption < 1){
      averageConsumption = 1
    }
    else{
      averageConsumption = averageConsumption / count;
    }

    previousBalance = this.amount[this.amount.length-1];


    while (previousBalance > 0 && this.daysSelected > day) {

      previousBalance -= averageConsumption;

      if(previousBalance < 0) previousBalance = 0;
      this.predicted1.push(previousBalance)
      day++

    }
  }

  getPrediction2(){
    let previousBalance: number = 0;
    let count = 0;
    let averageConsumption: number = 0;
    let day: number = 0;
    this.amount.forEach(balance => {

      //this.predicted2.push(balance.amount)
      if(previousBalance > 0){
        count++;
        averageConsumption = averageConsumption + (previousBalance - balance);
      }
      previousBalance = balance;


    });
    //jei nera duomenu tada turetu nuspet kad kiekviena diena mazeja po viena

    if(count == 0) count = 1
    averageConsumption = averageConsumption / count;


    //previousBalance = this.itemBalanceList[this.itemBalanceList.length-1].amount;
    previousBalance = this.amount[0];
    this.predicted2.push(previousBalance)
    day++


    while (previousBalance > 0 && this.daysSelected > day) {

      previousBalance -= averageConsumption;

      if(previousBalance < 0) previousBalance = 0;
      this.predicted2.push(previousBalance)
      day++
    }
  }

  getPrediction3(){
    let previousBalance: number = 0;
    let count = 0;
    let averageConsumption: number = 0;
    let day: number = 0;
    this.amount.forEach(balance => {

      this.predicted3.push(balance)
      day++
      if(previousBalance > balance){
        count++;
        averageConsumption = averageConsumption + (previousBalance - balance);
      }
      previousBalance = balance;


    });
    //jei nera duomenu tada turetu nuspet kad kiekviena diena mazeja po viena
    if(averageConsumption < 1){
      averageConsumption = 1
    }
    else{
      averageConsumption = averageConsumption / count;
    }

    previousBalance = this.itemBalanceList[this.itemBalanceList.length-1].amount;

    let maxPredict: number = 30;
    let listIndex: number = 0;

    while (previousBalance > 0 && this.daysSelected > day) {

      if(listIndex >= this.predicted3.length - 1) listIndex = 0;

      previousBalance = this.predicted3[listIndex] - averageConsumption

      if(previousBalance < 0) previousBalance = 0;
      this.predicted3.push(previousBalance)
      day++
      listIndex++;
    }
  }

  getPrediction4(){

    for (let index = 0; index < this.daysSelected; index++) {
      let average: number = 0;
      let p: number = 0;
      if(this.predicted1[index] != null){
        average += this.predicted1[index];
        p++;
      }
      if(this.predicted2[index] != null){
        average += this.predicted2[index];
        p++;
      }
      if(this.predicted3[index] != null){
        average += this.predicted3[index];
        p++;
      }
      if(this.regression[index] != null){
        average += this.regression[index];
        p++;
      }


      this.predicted4.push(average/4)

    }
  }

  linearRegression(){
  //  int n, i;
  //  float x[S], y[S], sumX=0, sumX2=0, sumY=0, sumXY=0, a, b;
    let n: number = this.amount.length
    let i: number = 0
    let x: number[] = []
    let y: number[] = []
    let sumX: number = 0
    let sumX2: number = 0
    let sumY: number = 0
    let sumXY: number = 0
    let a: number = 0
    let b: number = 0
  //  /* Input */
  //  cout<<"How many data points? ";
  //  cin>>n;

  //  cout<<"Enter data:"<< endl;

  //  for(i=1;i<=n;i++)
  //  {
  //   cout<<"x["<< i <<"] = ";
  //   cin>>x[i];
  //   cout<<"y["<< i <<"] = ";
  //   cin>>y[i];
  //  }
      this.amount.forEach(element => {
        x.push(i)
        y.push(element)
        i++
      });

  //  /* Calculating Required Sum */
  //  for(i=1;i<=n;i++)
  //  {
  //   sumX = sumX + x[i];
  //   sumX2 = sumX2 + x[i]*x[i];
  //   sumY = sumY + y[i];
  //   sumXY = sumXY + x[i]*y[i];
  //  }

      for (i = 0; i < n; i++) {
        sumX = sumX + x[i];
        sumX2 = sumX2 + x[i]*x[i];
        sumY = sumY + y[i];
        sumXY = sumXY + x[i]*y[i];
      }
  //  /* Calculating a and b */
  //  b = (n*sumXY-sumX*sumY)/(n*sumX2-sumX*sumX);
  //  a = (sumY - b*sumX)/n;
      b = (n*sumXY-sumX*sumY)/(n*sumX2-sumX*sumX);
      a = (sumY - b*sumX)/n;

  //  /* Displaying value of a and b */
  //  cout<<"Calculated value of a is "<< a << "and b is "<< b << endl;
  //  cout<<"Equation of best fit is: y = "<< a <<" + "<< b<<"x";

      //console.log("Equation of best fit is: y = " + a.toString() + '+' + b.toString() + 'x')

      for (let index = 0; index <= this.daysSelected-1; index++) {
        if( a + (b * index) <= 0) return

        this.regression.push( a + (b * index))

      }


  }





  salesData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: this.label, data: [], tension: 0.5 },

    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '',
      },
    },
  };

}
