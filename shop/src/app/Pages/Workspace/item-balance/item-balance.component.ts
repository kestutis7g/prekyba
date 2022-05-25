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

  date = new FormControl(moment());

  amount: number[] = [];
  predicted1: number[] = [];
  predicted2: number[] = [];
  predicted3: number[] = [];
  predicted4: number[] = [];


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

    this.itemBalanceService.getItemBalanceListByItemId(this.itemId).subscribe({
      next: (data) => {
        this.itemBalanceList = data;
        this.label = data[0].itemId.toString()

        this.itemBalanceList.sort((a,b) => a.date.localeCompare(b.date));

        if(this.range.value.start && this.range.value.end){

          //let start: string = this.range.value.start._i.year.toString + '-' + this.range.value.start._i.month.toString
          this.itemBalanceList.forEach(balance => {
            let balanceDate = new Date(balance.date);
            let start = new Date(this.range.value.start.format('YYYY-MM-DD').toString());
            let end = new Date(this.range.value.end.format('YYYY-MM-DD').toString());

            if(balanceDate.getTime() >= start.getTime() && balanceDate.getTime() <= end.getTime()){
              this.amount.push(balance.amount)
              this.labels.push(balance.date)
            }
          });

        }
        else{
          this.itemBalanceList.forEach(balance => {
            this.amount.push(balance.amount)
            this.labels.push(balance.date)
          });
        }




        let date = new Date();
        let maxPredict: number = 30;

        while (maxPredict > 0) {

          //sekanti diena
          date.setDate( date.getDate() + 1 );
          //date.setHours(12);
          //date.setMinutes(0);
          //date.setSeconds(0);
          //pakeiciam formta
          let d =this.datePipe.transform(date, 'yyyy-MM-dd');
          //pridedam i labels
          this.labels.push(d!.toString())
          maxPredict--;
        }

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
    this.itemBalanceList.forEach(balance => {

      this.predicted1.push(balance.amount)
      if(previousBalance > balance.amount){
        count++;
        averageConsumption = averageConsumption + (previousBalance - balance.amount);
      }
      previousBalance = balance.amount;


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
    while (previousBalance > 0 && maxPredict > 0) {

      previousBalance -= averageConsumption;

      if(previousBalance < 0) previousBalance = 0;
      this.predicted1.push(previousBalance)

    }
  }


  getPrediction2(){
    let previousBalance: number = 0;
    let count = 0;
    let averageConsumption: number = 0;

    this.itemBalanceList.forEach(balance => {

      this.predicted2.push(balance.amount)
      if(previousBalance > 0){
        count++;
        averageConsumption = averageConsumption + (previousBalance - balance.amount);
      }
      previousBalance = balance.amount;


    });
    //jei nera duomenu tada turetu nuspet kad kiekviena diena mazeja po viena

    if(count == 0) count = 1
    averageConsumption = averageConsumption / count;


    previousBalance = this.itemBalanceList[this.itemBalanceList.length-1].amount;

    let maxPredict: number = 30;
    while (previousBalance > 0 && maxPredict > 0) {

      previousBalance -= averageConsumption;

      if(previousBalance < 0) previousBalance = 0;
      this.predicted2.push(previousBalance)
      maxPredict--;
    }
  }

  getPrediction3(){
    let previousBalance: number = 0;
    let count = 0;
    let averageConsumption: number = 0;
    this.itemBalanceList.forEach(balance => {

      this.predicted3.push(balance.amount)
      if(previousBalance > balance.amount){
        count++;
        averageConsumption = averageConsumption + (previousBalance - balance.amount);
      }
      previousBalance = balance.amount;


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

    while (previousBalance > 0 && maxPredict > 0) {

      if(listIndex >= this.predicted3.length - 1) listIndex = 0;

      previousBalance = this.predicted3[listIndex] - averageConsumption

      if(previousBalance < 0) previousBalance = 0;
      this.predicted3.push(previousBalance)
      maxPredict--;
      listIndex++;
    }
  }

  getPrediction4(){

    for (let index = 0; index < this.amount.length + 30; index++) {
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


      this.predicted4.push(average/3)

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
