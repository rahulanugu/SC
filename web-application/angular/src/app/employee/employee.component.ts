import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  teamMembers:{
    icon:string,
    name:string,
    title:string,
    credentials:string
  }[]=[
    {icon:"../../assets/headshots/Tejvir.jpg",name:"Tejvir",title:"Senior SE",credentials:"CS"},
    {icon:"../../assets/headshots/_DSC0131.JPG",name:"Someone1",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/_DSC7858.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/20190617_221757 (3).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/aditya_kashyap_2.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Denis_Hallvaxhiu.jpeg",name:"Denis Hallvaxhiu",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/DSCF9666.JPG",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Du_ProfilePhoto.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Headshot (2).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/headshot(1).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Headshot(2).png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/headshot(3).png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/headshot.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/headshot.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/headshot1.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Image.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/image0(1).jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/image0(2).jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_2151 copy.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_3047.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_3286.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_4753.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_5010.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_6134.JPG",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_7682.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_8975.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG_9040.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/IMG-0359.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Jaskaran Sondhi - Head Shot.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Kefan-Photo.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/LincolnImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/MelindaImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/NiranjanNimbargi.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Lucas.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/personphoto.png",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/pic.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/picture.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/PKR004636 (1).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/SammyImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/VinceImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
  ]
  employee ='';
  employeeId:number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.employee = this.route.snapshot.params.employee;
    this.employeeId=Number(this.employee)-1
  }

}
