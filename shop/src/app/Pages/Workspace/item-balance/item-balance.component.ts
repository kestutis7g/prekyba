import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { ItemBalanceService } from 'src/app/services/itemBalance.service';
import { ItemBalance } from 'src/model/shop.types';

@Component({
  selector: 'app-item-balance',
  templateUrl: './item-balance.component.html',
  styleUrls: ['./item-balance.component.css'],
  providers: [DatePipe]
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

  averageConsumption: number = 0;


  amount: number[] = [];
  predicted1: number[] = [];


  ngOnInit(): void {

    let route = this.activatedRoute.params.subscribe(params => {
      this.itemId = params['id']
      this.predict();
    });


  }

  predict() {

    this.itemBalanceService.getItemBalanceListByItemId(this.itemId).subscribe({
      next: (data) => {
        this.itemBalanceList = data;
        this.label = data[0].itemId.toString()

        this.itemBalanceList.sort((a,b) => a.date.localeCompare(b.date));

        let previousBalance: number = 0;
        let count = 0;
        this.itemBalanceList.forEach(balance => {
          this.amount.push(balance.amount)
          this.labels.push(balance.date)
          this.predicted1.push(balance.amount)
          if(previousBalance > balance.amount){
            count++;
            this.averageConsumption = this.averageConsumption + (previousBalance - balance.amount);
          }
          previousBalance = balance.amount;


        });
        //jei nera duomenu tada turetu nuspet kad kiekviena diena mazeja po viena
        if(this.averageConsumption < 1){
          this.averageConsumption = 1
        }
        else{
          this.averageConsumption = this.averageConsumption / count;
        }


        let date = new Date();
        previousBalance = this.itemBalanceList[this.itemBalanceList.length-1].amount;

        while (previousBalance > 0) {

          //sekanti diena
          date.setDate( date.getDate() + 1 );
          date.setHours(12);
          date.setMinutes(0);
          date.setSeconds(0);
          //pakeiciam formta
          let d =this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
          //pridedam i labels
          this.labels.push(d!.toString())
          previousBalance -= this.averageConsumption;

          if(previousBalance < 0) previousBalance = 0;
          this.predicted1.push(previousBalance)


        }










        this.salesData = {
          labels: this.labels,
          datasets: [
            { label: 'Kiekis', data: this.amount, tension: 0.5 },
            { label: 'Predicted', data: this.predicted1, tension: 0.5 },
          ],
        };
      },
      error: (error) => {
        console.log(error);
      }}
    );
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
