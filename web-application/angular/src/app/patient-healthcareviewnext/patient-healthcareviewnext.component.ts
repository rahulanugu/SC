import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-patient-healthcareviewnext',
  templateUrl: './patient-healthcareviewnext.component.html',
  styleUrls: ['./patient-healthcareviewnext.component.css']
})
export class PatientHealthcareviewnextComponent implements OnInit {
  title = 'Average Temperatures of Body';
   type = 'LineChart';
   data = [
      ["Jan",  98.3],
      ["Feb",  97.5],
      ["Mar",  98.6],
      ["Apr",  98.9],
      ["May",  96.5],
      ["Jun",  97.9],
      ["Jul",  98.7],
      ["Aug",  98.4],
      ["Sep",  99.7],
      ["Oct",  99.5],
      ["Nov",  98.4],
      ["Dec",  96.5]
   ];
   columnNames = ["Month","Leslie"];
   options = {   
      hAxis: {
         title: 'Month'
      },
      vAxis:{
         title: 'Temperature'
      },
   };
   width = 650;
   height = 300;

   public bottomdiv2:boolean = false;
   public bottomdiv3:boolean = false;
   public bottomdiv4:boolean = false;
   public bottomdiv:boolean = false;
   public bottomdiv5:boolean = false;
   displaybelow2(){
      this.bottomdiv2 = !this.bottomdiv2;
      this.bottomdiv = false;
      this.bottomdiv3 = false;
      this.bottomdiv4 = false;
      window.scrollTo({top:document.body.scrollHeight,behavior: 'smooth'});
   }
   displaybelow3(){
    this.bottomdiv3 = !this.bottomdiv3;
    this.bottomdiv = false;
    this.bottomdiv2 = false;
    this.bottomdiv4 = false;
    window.scrollTo({top:document.body.scrollHeight,behavior: 'smooth'});
 }
    displaybelow4(){
       this.bottomdiv4 = !this.bottomdiv4;
       this.bottomdiv = false;
       this.bottomdiv3 = false;
       this.bottomdiv2 = false;
       window.scrollTo({top:document.body.scrollHeight,behavior: 'smooth'});
    }
    displaybelow(){
       this.bottomdiv = !this.bottomdiv;
       this.bottomdiv2 = false;
       this.bottomdiv3 = false;
       this.bottomdiv4 = false;
       window.scrollTo({top:document.body.scrollHeight,behavior: 'smooth'});
    }
    scrollRight(){
       var e = <HTMLDivElement> (document.getElementById("scroller"));
       var scrollAmount = 0;
       var slideTimer = setInterval(function(){
          e.scrollLeft += 30;
          scrollAmount += 30;
          if(scrollAmount >= 300){
             window.clearInterval(slideTimer);
          }
       }, 25);
    }
    scrollLeft(){
       var e = <HTMLDivElement> (document.getElementById("scroller"));
       var scrollAmount = 0;
       var slideTimer = setInterval(function(){
          e.scrollLeft -= 30;
          scrollAmount += 30;
          if(scrollAmount >= 300){
             window.clearInterval(slideTimer);
          }
       }, 25);
    }

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
          events:{
             click: function (event) {
                  document.getElementById("dataToPlace").innerHTML = " ("+this.data[event.point.index].category+")";
            }
          }
        },
     ]
  };

   highcharts3 = Highcharts;
   chartOptions3 = {
      chart: {
        type: 'bar'
      },
      title: {
         text: 'Historic Patient Data'
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
            categories: ['Kidney Risk', 'Liver Risk', 'Heart Risk', 'Brain Risk', 'Lung Risk'], title: {
            text: null
         }
      },
      yAxis : {
         min: 0, title: {
            text: 'Risk', align: 'high'
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
            name: 'Year 2017',
            data: [107, 31, 635, 203, 2]
         },
         {
            name: 'Year 2018',
            data: [133, 156, 947, 408, 6]
         },
         {
            name: 'Year 2019',
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
         text: 'Hospitals visited'
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
         name: 'Hospitals share',
         data: [
            ['Stony Brook',   45.0],
            ['Mayo Clinic',    26.8],
            ['Cleveland Clinic',    8.5],
            ['Johns Hopkins Hospital',     6.2],
            ['MA General Hospital',      0.7]
         ]
      }]
   };
   highcharts = Highcharts;
   chartOptions = {
      chart: {
         type: "spline"
      },
      title: {
         text: "Vitals"
      },
      xAxis:{
         categories:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
            "Sat"]
      },
      yAxis: {
         title:{
            text:"Temperature °F"
         }
      },
      tooltip: {
         valueSuffix:" °F"
      },
      series: [
         {
            data: [97, 97.2, 97.5, 98, 98.2, 99.5, 97.5]
         }
      ]
   };
   openNextView(patientId,diseaseId){
      //console.log("patientId being rtried to access is "+patientId)
      this.router.navigate(["healthcare-profile/patient/"+patientId+"/"+diseaseId]);
    }
  constructor(
   private dataService: DataService,
   private router: Router
   ) {}

  ngOnInit() {
   /*var chart = new CanvasJS.Chart("chartContainer",{
      title:{
      text: "Vitals"
      },
      axisY:{
        includeZero: false

      },
      data: [
      {
        type: "line",

        dataPoints: [
        { x: new Date(2012, 0, 1), y: 97, indexLabel: "97" },
        { x: new Date(2012, 1, 1), y: 97.2, indexLabel: "97.2"},
          { x: new Date(2012, 2, 1), y: 97.4, indexLabel: "97.4"},
        { x: new Date(2012, 3, 1), y: 98, indexLabel: "98" },
        { x: new Date(2012, 4, 1), y: 98.2, indexLabel: "98.2" },
        { x: new Date(2012, 5, 1), y: 98.7, indexLabel: "98.7" },
        { x: new Date(2012, 6, 1), y: 99, indexLabel: "highest 99",markerColor: "red", markerType: "triangle" },
        { x: new Date(2012, 7, 1), y: 98.8, indexLabel: "98.8" },
        { x: new Date(2012, 8, 1), y: 98.6, indexLabel: "98.6" , }
  
        ]
      }
      ]
    });
    chart.render();*/
    /*this.dataService.getFromCache(localStorage.getItem("code")).subscribe(res1=>{console.log(res1);
      this.dataService.getAppointments(id,res1).subscribe(res=>{
         console.log(res);
      });
    });*/
    }
    printPage() {
      window.print();
    }
}
