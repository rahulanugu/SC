import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-who-we-are',
  templateUrl: './landing-who-we-are.component.html',
  styleUrls: ['./landing-who-we-are.component.css']
})
export class LandingWhoWeAreComponent implements OnInit {

  // founder:{
  //   icon:string,
  //   name:string,
  //   text:string,
  //   credentials:string
  // }[]=[
  //   {icon:"../../assets/headshots/Headshot (2).jpg",name:"Full Name",text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi amet corporis quis iure nihil ducimus tempora, veritatis cumque deserunt quod! Autem nostrum placeat molestias necessitatibus dolorum. Earum excepturi animi odio.",credentials:"CS"},
  // ]

  teamMembers:{
    id:number,
    icon:string,
    name:string,
    title:string,
    credentials:string
  }[]=[
    {id:1,icon:"../../assets/headshots/Tejvir.jpg",name:"Tejvir",title:"title",credentials:"CS"},
    {id:2,icon:"../../assets/headshots/_DSC0131.JPG",name:"Someone1",title:"title",credentials:"CS"},
    {id:3,icon:"../../assets/headshots/_DSC7858.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:4,icon:"../../assets/headshots/20190617_221757 (3).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:5,icon:"../../assets/headshots/aditya_kashyap_2.png",name:"Full Name",title:"title",credentials:"CS"},
    {id:6,icon:"../../assets/headshots/Denis_Hallvaxhiu.jpeg",name:"Denis Hallvaxhiu",title:"title",credentials:"CS"},
    {id:7,icon:"../../assets/headshots/DSCF9666.JPG",name:"Full Name",title:"title",credentials:"CS"},
    {id:8,icon:"../../assets/headshots/Du_ProfilePhoto.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:9,icon:"../../assets/headshots/Headshot (2).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:10,icon:"../../assets/headshots/headshot(1).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:11,icon:"../../assets/headshots/Headshot(2).png",name:"Full Name",title:"title",credentials:"CS"},
    {id:12,icon:"../../assets/headshots/headshot(3).png",name:"Full Name",title:"title",credentials:"CS"},
    {id:13,icon:"../../assets/headshots/headshot.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:14,icon:"../../assets/headshots/headshot.png",name:"Full Name",title:"title",credentials:"CS"},
    {id:15,icon:"../../assets/headshots/headshot1.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {id:16,icon:"../../assets/headshots/Image.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {id:17,icon:"../../assets/headshots/image0(1).jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {id:18,icon:"../../assets/headshots/image0(2).jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {id:19,icon:"../../assets/headshots/IMG_2151 copy.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:20,icon:"../../assets/headshots/IMG_3047.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {id:21,icon:"../../assets/headshots/IMG_3286.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:22,icon:"../../assets/headshots/IMG_4753.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:23,icon:"../../assets/headshots/IMG_5010.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:24,icon:"../../assets/headshots/IMG_6134.JPG",name:"Full Name",title:"title",credentials:"CS"},
    {id:25,icon:"../../assets/headshots/IMG_7682.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:26,icon:"../../assets/headshots/IMG_8975.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {id:27,icon:"../../assets/headshots/IMG_9040.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:28,icon:"../../assets/headshots/IMG-0359.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:29,icon:"../../assets/headshots/Jaskaran Sondhi - Head Shot.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:30,icon:"../../assets/headshots/Kefan-Photo.jpeg",name:"Full Name",title:"title",credentials:"CS"},
    {id:31,icon:"../../assets/headshots/LincolnImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:32,icon:"../../assets/headshots/MelindaImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:33,icon:"../../assets/headshots/NiranjanNimbargi.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:34,icon:"../../assets/headshots/Lucas.png",name:"Full Name",title:"title",credentials:"CS"},
    {id:35,icon:"../../assets/headshots/personphoto.png",name:"Full Name",title:"title",credentials:"CS"},
    {id:36,icon:"../../assets/headshots/pic.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:37,icon:"../../assets/headshots/picture.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:38,icon:"../../assets/headshots/PKR004636 (1).jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:39,icon:"../../assets/headshots/SammyImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {id:40,icon:"../../assets/headshots/VinceImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
  ]
  advisors:{
    icon:string,
    name:string,
    title:string,
    credentials:string
  }[]=[
    {icon:"../../assets/headshots/DaveImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Dr.ChristianImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/Dr.NicholsonImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/TomImg.jpg",name:"Full Name",title:"title",credentials:"CS"},
    {icon:"../../assets/headshots/headshot+1.jpg",name:"Full Name",title:"title",credentials:"CS"}
  ]
  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewEmployee(teamMemberId){
    this.router.navigate(['/employees',teamMemberId]),{
      queryParams:{}
    }
  }
}
