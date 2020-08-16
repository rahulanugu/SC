import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-patient-healthcareview',
  templateUrl: './patient-healthcareview.component.html',
  styleUrls: ['./patient-healthcareview.component.css']
})
export class PatientHealthcareviewComponent implements OnInit {

  highcharts5 = Highcharts;
   chartOptions5 = {
      chart : {
         type:'pie',
         options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
         }
      },
      title : {
         text: 'Comprehensive Patient medical history'
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            shadow: false,
            center: ['50%', '50%'],
            size:'75%',
            innerSize: '40%' ,
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
               enabled: true,
               format: '<b>{point.name}%</b>: {point.percentage:.1f} ',
               style: {
                  color:
                  'black',
                  fontsize: '75%'
               },
            }
         }
      },
      series : [{
         type: 'pie',
         name: 'Patient History',
         data: [
            ['CoPays',   45.0],
            ['VisitinClaims',       26.8],
            {
               name: 'MedicalClaims',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['DentalClaims',    8.5],
            ['VisionClaims',     6.2],
            ['Others',      0.7]
         ]
      }]
   };

   highcharts2 = Highcharts;
  chartOptions2 = {
     chart: {
        type: 'bar',

     },
     title: {
        text: 'CardioVascular Risk Factor'
     },
     legend : {
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        x: 250,
        y: 100,
        floating: true,
        borderWidth: 1
        },
        xAxis:{
           categories: ['Congestive Heart Failure', 'Old myocardial infarction',
           'Hypertension', 'ASHD coronary artery', 'Atrial Fibrilliation'], title: {
           text: null
        },lineColor: 'transparent'
     },
     yAxis : {
        min: 0,
        title: {
           text: 'Risk Score (percentage)', align: 'middle'
        },
        visible:false,
        gridLineColor: 'transparent',
        gridTextColor: '#ffffff',
        lineColor: 'transparent',
        tickColor: 'transparent',
        showEmpty: false,

        labels: {
           overflow: 'allow'
        },
     },
     tooltip : {
        valueSuffix: ' ({point.percentage:.0f}%)'
     },
     plotOptions : {
    //   series:{
    //     colorByPoint: true,
    //  },

        bar: {
           dataLabels: {
              enabled: true,
              allowOverlap: true,
              useHTML: true,
           }
        }
     },
     credits:{
        enabled: false
     },
     series: [
        {
           data: [80, 30, 20, 5, 50],
          //  pointPadding: 0,
          //  groupPadding: 0.1
          stacking: 'normal',
          pointWidth: 30,
          pointPadding: 0.2,
        },
     ]
  };

   highcharts3 = Highcharts;
   chartOptions3 = {
      chart: {
        type: 'bar'
      },
      title: {
         text: 'Historic World Population by Region'
      },
      subtitle : {
         text: 'Source: Wikipedia.org'
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 250,
         y: 100,
         floating: true,
         borderWidth: 1,

         },
         xAxis:{
            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
            text: null
         }
      },
      yAxis : {
         min: 0, title: {
            text: 'Population (millions)', align: 'high'
         },
         labels: {
            overflow: 'justify'
         }
      },
      tooltip : {
         valueSuffix: ' millions'
      },
      plotOptions : {
         bar: {
            dataLabels: {
               enabled: true
            }
         },
         series: {
            stacking: 'normal'
         }
      },
      credits:{
         enabled: false
      },
      series: [
         {
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
         },
         {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
         },
         {
            name: 'Year 2008',
            data: [973, 914, 4054, 732, 34]
         }
      ]
   };
   highcharts4 = Highcharts;
   chartOptions4 = {
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Browser market shares at a specific website, 2014'
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            shadow: false,
            center: ['50%', '50%'],
            size:'45%',
            innerSize: '20%'
         }
      },
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
               name: 'Chrome',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['Others',      0.7]
         ]
      }]
   };
   highcharts = Highcharts;
   chartOptions = {
      chart: {
         type: "spline"
      },
      title: {
         text: "Monthly Average Temperature"
      },
      subtitle: {
         text: "Source: WorldClimate.com"
      },
      xAxis:{
         categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yAxis: {
         title:{
            text:"Temperature °C"
         }
      },
      tooltip: {
         valueSuffix:" °C"
      },
      series: [
         {
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
         },
         {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
         },
         {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
         },
         {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
         }
      ]
   };
  constructor() { }

  ngOnInit(): void {
  }

}
