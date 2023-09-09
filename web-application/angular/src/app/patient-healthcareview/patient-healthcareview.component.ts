import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HealthcareviewService } from '../shared/healthcareview.service';
import * as CanvasJS from '../../assets/js/canvasjs.min.js';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-patient-healthcareview',
   templateUrl: './patient-healthcareview.component.html',
   styleUrls: ['./patient-healthcareview.component.css']
})
export class PatientHealthcareviewComponent implements OnInit {

   startdate: any;
   enddate: any;
   vital: any;
   patientid: any;
   // JDW
   patientDetails = {
      'name': 'Theodore Grey',
      'id': '1234',
      'mrn': 'YTK89123456',
      'dob': '03/12/1951',
      'next_appt': {
         'date': '11/25/2020',
         'time': '10:30 am'
      }
   }

   readmissionRisk = 52

   symptomsComplaints = [
      {
         'name': 'Tiredness',
         'date': '11/25/2020',
         'details': ''
      }
   ]

   patientAnalytic = { "AGE": [1], "ETHNICITY": 1, "GENDER": 1, "50802": 1, "50804": 1, "50808": 1, "50809": 1, "50810": 1, "50811": 1, "50813": 1, "50818": 1, "50820": 1, "50821": 1, "50822": 1, "50824": 1, "50861": 1, "50862": 1, "50863": 1, "50868": 1, "50878": 1, "50882": 1, "50885": 1, "50893": 1, "50902": 1, "50910": 1, "50912": 1, "50931": 1, "50954": 1, "50960": 1, "50970": 1, "50971": 1, "50983": 1, "51006": 1, "51144": 1, "51146": 1, "51200": 1, "51221": 1, "51222": 1, "51237": 1, "51244": 1, "51248": 1, "51249": 1, "51250": 1, "51254": 1, "51256": 1, "51265": 1, "51274": 1, "51275": 1, "51277": 1, "51279": 1, "51301": 1, "51491": 1, "51498": 1, "ICD9_CODE_y": 1 };

   diagnosedConditions = [
      {
         'name': 'Coronary Artery Disease',
         'date': '1/20/2015',
         'details': ''
      },
      {
         'name': 'Diabetes (Type II)',
         'date': '07/13/2011',
         'details': ''
      },
      {
         'name': 'Hyperlipidemia',
         'date': '12/02/2009',
         'details': ''
      }
   ]

   conditionRisks = [
      {
         'name': 'Coronary Artery Disease',
         'value': '100',
         'link': '/healthcare-profile/patient/1234/93',
         'show': 'select',
         'diagnosed': true
      },
      {
         'name': 'Hypertension',
         'value': '83',
         'link': '/healthcare-profile/patient/1234/93',
         'show': 'select',
         'diagnosed': false
      },
      {
         'name': 'Heart Failure',
         'value': '45',
         'link': '/healthcare-profile/patient/1234/93',
         'show': 'select',
         'diagnosed': false
      },
      {
         'name': 'Atrial Fibrilation',
         'value': '27',
         'link': '/healthcare-profile/patient/1234/93',
         'show': 'select',
         'diagnosed': false
      }
   ]

   // Graphs
   title = 'Average Temperatures of Body';
   type = 'LineChart';
   data = [
      ["Jan", 98.3],
      ["Feb", 97.5],
      ["Mar", 98.6],
      ["Apr", 98.9],
      ["May", 96.5],
      ["Jun", 97.9],
      ["Jul", 98.7],
      ["Aug", 98.4],
      ["Sep", 99.7],
      ["Oct", 99.5],
      ["Nov", 98.4],
      ["Dec", 96.5]
   ];
   columnNames = ["Month", "Leslie"];
   options = {
      hAxis: {
         title: 'Month'
      },
      vAxis: {
         title: 'Temperature'
      },
   };
   width = 650;
   height = 300;

   public bottomdiv2: boolean = false;
   public bottomdiv3: boolean = false;
   public bottomdiv4: boolean = false;
   public bottomdiv: boolean = false;
   public bottomdiv5: boolean = false;
   displaybelow2() {
      this.bottomdiv2 = !this.bottomdiv2;
      this.bottomdiv = false;
      this.bottomdiv3 = false;
      this.bottomdiv4 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   displaybelow3() {
      this.bottomdiv3 = !this.bottomdiv3;
      this.bottomdiv = false;
      this.bottomdiv2 = false;
      this.bottomdiv4 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   displaybelow4() {
      this.bottomdiv4 = !this.bottomdiv4;
      this.bottomdiv = false;
      this.bottomdiv3 = false;
      this.bottomdiv2 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   displaybelow() {
      this.bottomdiv = !this.bottomdiv;
      this.bottomdiv2 = false;
      this.bottomdiv3 = false;
      this.bottomdiv4 = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
   }
   scrollRight() {
      var e = <HTMLDivElement>(document.getElementById("scroller"));
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
         e.scrollLeft += 30;
         scrollAmount += 30;
         if (scrollAmount >= 300) {
            window.clearInterval(slideTimer);
         }
      }, 25);
   }
   scrollLeft() {
      var e = <HTMLDivElement>(document.getElementById("scroller"));
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
         e.scrollLeft -= 30;
         scrollAmount += 30;
         if (scrollAmount >= 300) {
            window.clearInterval(slideTimer);
         }
      }, 25);
   }

   vitalData = {
      "weight": {
         "dates": ["2022/04/24", "2022/05/26", "2022/06/25", "2022/07/24", "2022/08/25", "2022/09/25",
            "2022/10/25"],
         "weights": [174.8, 175.2, 174.8, 175.4, 175.8, 176.1, 175]
      },
      "height": {
         "dates": ["2022/04/24", "2022/05/26", "2022/06/25", "2022/07/24", "2022/08/25", "2022/09/25",
            "2022/10/25"],
         "heights": [97, 97.2, 97.5, 98, 98.2, 99.5, 97.5]
      },
      'Diastolic': {
         'dates': ['2006/07/07', '2006/07/12', '2006/07/17', '2006/08/18', '2006/10/22', '2007/01/27', '2007/07/25', '2008/05/03', '2009/03/12', '2009/03/12', '2009/03/14', '2009/03/14', '2009/03/14', '2009/03/18', '2010/02/20', '2010/04/21', '2010/06/12', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/27'],
         'Diastolics': [98, 100, 100, 92, 86, 88, 88, 90, 60, 60, 62, 72, 84, 98, 88, 88, 85, 90, 80, 80, 80, 80, 80]
      },

      'Systolic': {
         'dates': ['2006/07/07', '2006/07/12', '2006/07/17', '2006/08/18', '2006/10/22', '2007/01/27', '2007/07/25', '2008/05/03', '2009/03/12', '2009/03/12', '2009/03/14', '2009/03/14', '2009/03/14', '2009/03/18', '2010/02/20', '2010/04/21', '2010/06/12', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/17', '2020/12/27'],
         'Systolics': [150, 156, 160, 148, 138, 138, 136, 140, 104, 110, 106, 116, 120, 150, 136, 138, 135, 120, 120, 120, 120, 120, 120]
      }
   }

   highcharts = Highcharts;
   chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Height",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10,
         },
         categories: this.vitalData["height"]["dates"]
      },
      yAxis: {
         title: {
            text: "Height cm",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent',
         }
      },
      tooltip: {
         valueSuffix: " cm"
      },
      series: [
         {
            data: this.vitalData["height"]["heights"],
            showInLegend: false
         }
      ]
   };
   weight_highcharts = Highcharts;
   weight_chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Weights",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10
         },
         categories: this.vitalData["weight"]["dates"]
      },
      yAxis: {
         title: {
            text: "Weight (lbs)",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent'
         }
      },
      tooltip: {
         valueSuffix: "lbs"
      },
      series: [
         {
            data: this.vitalData["weight"]["weights"],
            showInLegend: false
         }
      ]
   }

   diastolic_highcharts = Highcharts;
   diastolic_chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Diastolic Blood Pressure",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10
         },
         categories: this.vitalData["Diastolic"]["dates"]
      },
      yAxis: {
         title: {
            text: "Diastolic Blood Pressure (mm[Hg])",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent'
         }
      },
      tooltip: {
         valueSuffix: "mm[Hg]"
      },
      series: [
         {
            data: this.vitalData["Diastolic"]["Diastolics"],
            showInLegend: false
         }
      ]
   }

   systolic_highcharts = Highcharts;
   systolic_chartOptions = {
      credits: {
         enabled: false
      },
      chart: {
         type: "spline"
      },
      title: {
         text: "Systolic Blood Pressure",
         margin: 15,
         style: { "fontSize": "18px" }
      },
      xAxis: {
         title: {
            text: "Date",
            margin: 10
         },
         categories: this.vitalData["Systolic"]["dates"]
      },
      yAxis: {
         title: {
            text: "Systolic Blood Pressure (mm[Hg])",
            margin: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent'
         }
      },
      tooltip: {
         valueSuffix: "mm[Hg]"
      },
      series: [
         {
            data: this.vitalData["Systolic"]["Systolics"],
            showInLegend: false
         }
      ]
   }
   openNextView(patientId, diseaseId) {
      //console.log("patientId being rtried to access is "+patientId)
      this.router.navigate(["healthcare-profile/patient/" + patientId + "/" + diseaseId]);
   }

   printPage() {
      window.print()
   }

   dateValidate() {
      var start = new Date(this.startdate)
      var end = new Date(this.enddate)
      if (start.getTime() > end.getTime()) {
         this.startdate = ""
         this.enddate = ""
         window.alert("start date must before the end date")
      }

      if (this.vital == 'weight' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.weight.dates.length; i++) {
            var date = new Date(this.vitalData.weight.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.weight.dates[i]);
               data_lis.push(this.vitalData.weight.weights[i]);
            }
         }
         this.weight_chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Weights",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Weight (lbs)",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: "lbs"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         }
      }
      if (this.vital == 'temperature' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.height.dates.length; i++) {
            var date = new Date(this.vitalData.height.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.height.dates[i]);
               data_lis.push(this.vitalData.height.heights[i]);
            }
         }
         this.chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Height",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Height cm",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: " cm"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         };
      }
      if (this.vital == 'diastolic' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.Diastolic.dates.length; i++) {
            var date = new Date(this.vitalData.Diastolic.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.Diastolic.dates[i]);
               data_lis.push(this.vitalData.Diastolic.Diastolics[i]);
            }
         }
         this.diastolic_chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Diastolic Blood Pressure",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Diastolic Blood Pressure (mm[Hg])",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: "mm[Hg]"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         }
      }
      if (this.vital == 'systolic' && this.startdate && this.enddate) {
         var date_lis = [];
         var data_lis = [];
         for (var i = 0; i < this.vitalData.Systolic.dates.length; i++) {
            var date = new Date(this.vitalData.Systolic.dates[i]);
            if (date >= start && date <= end) {
               date_lis.push(this.vitalData.Systolic.dates[i]);
               data_lis.push(this.vitalData.Systolic.Systolics[i]);
            }
         }
         this.systolic_chartOptions = {
            credits: {
               enabled: false
            },
            chart: {
               type: "spline"
            },
            title: {
               text: "Systolic Blood Pressure",
               margin: 15,
               style: { "fontSize": "18px" }
            },
            xAxis: {
               title: {
                  text: "Date",
                  margin: 10
               },
               categories: date_lis
            },
            yAxis: {
               title: {
                  text: "Systolic Blood Pressure (mm[Hg])",
                  margin: 10,
                  gridLineWidth: 0,
                  minorGridLineWidth: 0,
                  gridLineColor: 'transparent'
               }
            },
            tooltip: {
               valueSuffix: "mm[Hg]"
            },
            series: [
               {
                  data: data_lis,
                  showInLegend: false
               }
            ]
         }
      }
   }

   constructor(private router: Router, private healthcareservice: HealthcareviewService, private route: ActivatedRoute) { }

   ngOnInit() {
      this.patientid = this.route.snapshot.params.patientid;
      this.healthcareservice.getFHIRdata(this.patientid).subscribe((data) => {
         var dict = JSON.parse(data.toString());
         this.patientDetails = dict["patientDetails"];
         this.readmissionRisk = dict["readimissionRisk"].toString();
         this.symptomsComplaints = dict["symptomsComplaints"];
         this.diagnosedConditions = dict["diagnosedConditions"];
         this.conditionRisks = dict["conditionRisks"];
         this.vitalData = dict["vitalData"];
      })
      this.healthcareservice.getAnalytic(this.patientAnalytic).subscribe((data) => {
         console.log(data);
         var dict = JSON.parse(data.toString());
         this.conditionRisks[0]['value'] = Math.round(dict["ASHD coronary artery"]).toString();
         this.conditionRisks[1]['value'] = Math.round(dict["Hypertension"]).toString();
         this.conditionRisks[2]['value'] = Math.round(dict["Congestive Heart Failure"]).toString();
         this.conditionRisks[3]['value'] = Math.round(dict["Atrial Fibrilliation"]).toString();
         console.log(this.conditionRisks);
      });
      // highcharts5 = Highcharts;
      // chartOptions5 = {
      //    chart: {
      //       type: 'pie',
      //       options3d: {
      //          enabled: true,
      //          alpha: 45,
      //          beta: 0
      //       }
      //    },
      //    title: {
      //       text: 'Comprehensive Patient medical history'
      //    },
      //    tooltip: {
      //       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      //    },
      //    plotOptions: {
      //       pie: {
      //          shadow: false,
      //          center: ['50%', '50%'],
      //          size: '75%',
      //          innerSize: '40%',
      //          allowPointSelect: true,
      //          cursor: 'pointer',
      //          depth: 35,
      //          dataLabels: {
      //             enabled: true,
      //             format: '<b>{point.name}%</b>: {point.percentage:.1f} ',
      //             style: {
      //                color:
      //                   'black',
      //                fontsize: '75%'
      //             },
      //          }
      //       }
      //    },
      //    series: [{
      //       type: 'pie',
      //       name: 'Patient History',
      //       data: [
      //          ['CoPays', 45.0],
      //          ['VisitinClaims', 26.8],
      //          {
      //             name: 'MedicalClaims',
      //             y: 12.8,
      //             sliced: true,
      //             selected: true
      //          },
      //          ['DentalClaims', 8.5],
      //          ['VisionClaims', 6.2],
      //          ['Others', 0.7]
      //       ]
      //    }]
      // };

      // highcharts2 = Highcharts;
      // chartOptions2 = {
      //    chart: {
      //       type: 'bar',

      //    },
      //    title: {
      //       text: 'CardioVascular Risk Factor'
      //    },
      //    legend: {
      //       layout: 'horizontal',
      //       align: 'right',
      //       verticalAlign: 'top',
      //       x: 250,
      //       y: 100,
      //       floating: true,
      //       borderWidth: 1
      //    },
      //    xAxis: {
      //       categories: ['Congestive Heart Failure', 'Old myocardial infarction',
      //          'Hypertension', 'ASHD coronary artery', 'Atrial Fibrilliation'], title: {
      //             text: null
      //          }, lineColor: 'transparent'
      //    },
      //    yAxis: {
      //       min: 0,
      //       title: {
      //          text: 'Risk Score (percentage)', align: 'middle'
      //       },
      //       visible: false,
      //       gridLineColor: 'transparent',
      //       gridTextColor: '#ffffff',
      //       lineColor: 'transparent',
      //       tickColor: 'transparent',
      //       showEmpty: false,

      //       labels: {
      //          overflow: 'allow'
      //       },
      //    },
      //    tooltip: {
      //       valueSuffix: ' ({point.percentage:.0f}%)'
      //    },
      //    plotOptions: {
      //       //   series:{
      //       //     colorByPoint: true,
      //       //  },

      //       bar: {
      //          dataLabels: {
      //             enabled: true,
      //             allowOverlap: true,
      //             useHTML: true,
      //          }
      //       }
      //    },
      //    credits: {
      //       enabled: false
      //    },
      //    series: [
      //       {
      //          data: [80, 30, 20, 5, 50],
      //          //  pointPadding: 0,
      //          //  groupPadding: 0.1
      //          stacking: 'normal',
      //          pointWidth: 30,
      //          pointPadding: 0.2,
      //          events: {
      //             click: function (event) {
      //                document.getElementById("dataToPlace").innerHTML = " (" + this.data[event.point.index].category + ")";
      //             }
      //          }
      //       },
      //    ]
      // };

      // highcharts3 = Highcharts;
      // chartOptions3 = {
      //    chart: {
      //       type: 'bar'
      //    },
      //    title: {
      //       text: 'Historic Patient Data'
      //    },
      //    legend: {
      //       layout: 'vertical',
      //       align: 'left',
      //       verticalAlign: 'top',
      //       x: 250,
      //       y: 100,
      //       floating: true,
      //       borderWidth: 1,

      //    },
      //    xAxis: {
      //       categories: ['Kidney Risk', 'Liver Risk', 'Heart Risk', 'Brain Risk', 'Lung Risk'], title: {
      //          text: null
      //       }
      //    },
      //    yAxis: {
      //       min: 0, title: {
      //          text: 'Risk', align: 'high'
      //       },
      //       labels: {
      //          overflow: 'justify'
      //       }
      //    },
      //    tooltip: {
      //       valueSuffix: ' millions'
      //    },
      //    plotOptions: {
      //       bar: {
      //          dataLabels: {
      //             enabled: true
      //          }
      //       },
      //       series: {
      //          stacking: 'normal'
      //       }
      //    },
      //    credits: {
      //       enabled: false
      //    },
      //    series: [
      //       {
      //          name: 'Year 2017',
      //          data: [107, 31, 635, 203, 2]
      //       },
      //       {
      //          name: 'Year 2018',
      //          data: [133, 156, 947, 408, 6]
      //       },
      //       {
      //          name: 'Year 2019',
      //          data: [973, 914, 4054, 732, 34]
      //       }
      //    ]
      // };
      // highcharts4 = Highcharts;
      // chartOptions4 = {
      //    chart: {
      //       plotBorderWidth: null,
      //       plotShadow: false
      //    },
      //    title: {
      //       text: 'Hospitals visited'
      //    },
      //    tooltip: {
      //       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      //    },
      //    plotOptions: {
      //       pie: {
      //          shadow: false,
      //          center: ['50%', '50%'],
      //          size: '45%',
      //          innerSize: '20%'
      //       }
      //    },
      //    series: [{
      //       type: 'pie',
      //       name: 'Hospitals share',
      //       data: [
      //          ['Stony Brook', 45.0],
      //          ['Mayo Clinic', 26.8],
      //          ['Cleveland Clinic', 8.5],
      //          ['Johns Hopkins Hospital', 6.2],
      //          ['MA General Hospital', 0.7]
      //       ]
      //    }]
      // };
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
   }

}
