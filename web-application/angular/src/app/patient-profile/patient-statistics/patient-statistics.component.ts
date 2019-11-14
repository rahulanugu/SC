import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { PatientDataService } from "./../patient-data.service";

@Component({
  selector: "app-patient-statistics",
  templateUrl: "./patient-statistics.component.html",
  styleUrls: ["./patient-statistics.component.css"]
})
export class PatientStatisticsComponent implements OnInit {
  chart = [];

  constructor(private _PatientDataService: PatientDataService) {}

  ngOnInit() {
    let insuranceExpenses = this._PatientDataService.getInsuranceExpenses();
    this.chart = new Chart("lineChart", {
      type: "bar",
      label: ["asdf", "asdf"],
      data: {
        labels: [
          "Blood Pressure",
          "Sugar Level",
          "Heart Rate",
          "Temperature",
          "Pain Level"
        ],
        datasets: [
          {
            label: "asd",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.65)",
              "rgba(54, 162, 235, 0.65)",
              "rgba(255, 206, 86, 0.65)",
              "rgba(75, 192, 192, 0.65)",
              "rgba(153, 102, 255, 0.65)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1
          },
          {
            label: "fgh",
            data: [10, 23, 7, 3, 5, 4],
            backgroundColor: [
              "rgba(255, 99, 132, 0.65)",
              "rgba(54, 162, 235, 0.65)",
              "rgba(255, 206, 86, 0.65)",
              "rgba(75, 192, 192, 0.65)",
              "rgba(153, 102, 255, 0.65)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Medical History"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.chart = new Chart("bar2", {
      type: "horizontalBar",
      data: {
        labels: [
          "Co-Pay Expense for Doctor's Visits",
          "Out of Pocket Expense",
          "Co-pay for Prescription",
          "Out of Pocket Expense for Prescription"
        ],
        datasets: [
          {
            label: "Expenses in USD($)",
            data: [
              insuranceExpenses.copayExpenseforDoctorVisit,
              insuranceExpenses.outOfPocketExpenseforDoctorVisit,
              insuranceExpenses.coPayExpenseforPrescription,
              insuranceExpenses.OutofPocketExpenseforPrescription
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Insurance Information"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    this.chart = new Chart("bar3", {
      type: "doughnut",
      data: {
        labels: ["Number of Doctor's Notes Year to Date"],
        datasets: [
          {
            label: "Number of Doctor's Notes till today",
            data: [43],
            backgroundColor: ["rgba(54, 162, 235, 0.65)"],
            borderColor: ["rgba(54, 162, 235, 2)"],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Doctor's Note"
        }
      }
    });
  }
}
