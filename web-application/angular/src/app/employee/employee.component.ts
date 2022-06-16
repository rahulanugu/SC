import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  teamMembers: {
    id: number;
    icon: string;
    name: string;
    title: string;
    bio: string;
    about: string[];
  }[] = [
    {
      id: 1,
      icon: "../../assets/headshots/Moh Noori.png",
      name: "Moh Noori",
      title: "Founder/ CEO of ScriptChain Health",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "BlaBlASLorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "ASDASDLorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "!!!!!!!!!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 2,
      icon: "../../assets/headshots/Tejvir Saggu.png",
      name: "Tejvir Saggu",
      title: "Software Developer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 3,
      icon: "../../assets/headshots/Denis Hallvaxhiu.png",
      name: "Denis Hallvaxhiu",
      title: "Software Developer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 4,
      icon: "../../assets/headshots/Kefan Xu.png",
      name: "Kefan Xu",
      title: "Software Developer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 5,
      icon: "../../assets/headshots/Charan Jagwani.png",
      name: "Charan Jagwani",
      title: "Software Developer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 6,
      icon: "../../assets/headshots/Vincent Fang.png",
      name: "Vincent Fang",
      title: "Machine Learning Engineer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 7,
      icon: "../../assets/headshots/Rohith Nair.png",
      name: "Rohith Nair",
      title: "Machine Learning Engineer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 8,
      icon: "../../assets/headshots/Roger Chang.png",
      name: "Roger Chang",
      title: "Machine Learning Engineer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 9,
      icon: "../../assets/headshots/Anubhav Sharma.png",
      name: "Anubhav Sharma",
      title: "Machine Learning Engineer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 10,
      icon: "../../assets/headshots/Kate Chan.png",
      name: "Kate Chan",
      title: "Product Designer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 11,
      icon: "../../assets/headshots/Saachi Jain.png",
      name: "Saachi Jain",
      title: "Business Analyst",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 12,
      icon: "../../assets/headshots/Yuelin Liu.png",
      name: "Yuelin Liu",
      title: "Machine Learning Engineer",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      about: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias maxime, laboriosam error reprehenderit necessitatibus nesciunt accusantium, eveniet natus atque expedita possimus quisquam, perferendis fugit doloremque. Modi reprehenderit dicta molestias ipsum? Voluptates, illum asperiores totam quae sit laborum? Corporis nulla, magni modi soluta ipsam exercitationem vero tempore incidunt, sapiente rerum ipsum quaerat consectetur beatae blanditiis quae unde praesentium alias illo aliquam.",
      ],
    },
    {
      id: 13,
      icon: "../../assets/headshots/Dr. Denmark.png",
      name: "Dr. Denmark",
      title: "Medical Advisor",
      bio: "Comprehensive Cardiovascular Care involves treats the entire cardiovascular system including not only the heart; but also the arteries and the veins of the body. As an Interventional Cardiologist; Dr. David Denmark is particularly qualified to treat patients with diseases of the heart; arteries; and veins and has a special interest in Peripheral Artery Disease and Venous Insufficiency.",
      about: [
        "Boston Magazine Top Doctor, 2022",
        "Top Doctor - 2018 Boston Magazine Castle Connolly",
        "Top 10 Doctor - 2014",
        "Patients Choice Award - 2013-2014-2015",
        "Most Compassionate Doctor - 2013; 2014",
        "On-Time Doctor - 2014; 2015; 2016;",
        "I love the ability to help people. It is an honor to be trusted with another human being's health and well-being and it is extremely rewarding. Medicine is a profession in which people continue to learn and grow. There is constantly new technologies; data; protocols; and standards of care. Staying current is an important and intellectually stimulating aspect of being a doctor."
        ],
    },
    {
      id: 14,
      icon: "../../assets/headshots/Dr. Ruff.png",
      name: "Dr. Ruff",
      title: "Medical Advisor",
      bio: "Dr. Ruff graduated from Harvard University, earned his medical degree at Johns Hopkins University School of Medicine, and his masters of public health from the Harvard School of Public Health. Dr. Ruff completed his internal medicine residency and cardiovascular medicine fellowship at the Brigham and Women’s Hospital.",
      about: [
        "Christian T. Ruff, MD, MPH is the Director of General Cardiology in the Cardiovascular Division at Brigham and Women’s Hospital in Boston, MA and an Associate Professor of Medicine at Harvard Medical School.",
        "Dr. Ruff is a Senior Investigator in the Thrombolysis in Myocardial Infarction (TIMI) Study Group and serves the Director of the Genetics Core Laboratory and the Co-Chairman of the Clinical Events Committee. He has led a broad array of projects, ranging from investigator initiated studies of biomarkers and genetic variants to large clinical trials. ",
        "Dr. Ruff has served on international clinical guideline committees and has been invited to give hundreds of lectures nationally and internationally. He has authored many scholarly articles, editorials, reviews, and book chapters that include the New England Journal of Medicine, Lancet, Journal of the American Medical Association, American Journal of Medicine, Circulation, Journal of the American College of Cardiology, and Nature Reviews Cardiology.",
      ],
    },
  ];
  employee = "";
  employeeId: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.employee = this.route.snapshot.params.employee;
    this.employeeId = Number(this.employee) - 1;
  }
}
