import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdvisorService } from "../shared/advisor.service";
import { EmployService } from "../shared/employee.service";

//Charan Jagwani: turns advisor static data to dynamic
@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css']
})
export class AdvisorComponent implements OnInit {
  /*teamMembers: {
    id: number;
    icon: string;
    name: string;
    title: string;
    bio: string;
    about: string[];
  }[] = [
    {
      id: 1,
      icon: "../../assets/headshots/MohNoori.png",
      name: "Moh Noori",
      title: "Founder/ CEO of ScriptChain Health",
      bio: ' "Imagining the world with better patient outcomes and resolving some of the most challenging healthcare issues is where I turn my dreams into reality."  With a background in technology and sales working at companies such Intuit and Cutera, Moh has founded and leads the ScriptChain Health organization.',
      about: [
        "Moh Noori experienced a heartbreaking event while growing up with his grandmother who helped raise him as an infant to an early adolescent. He saw his grandmothers health deteriorate in front of his eyes over the years when one early morning in 1999, he received a call saying that his grandmother had passed away due to heart failure. Not only was Moh's heart shattered but he thought to himself why couldn't this illness been caught earlier on in its early stages to help his grandmothers health? Fast forward to entering business school at Boston College, the problem came back to Moh and that is where ScriptChain Health was born.",
        "Prior to starting ScriptChain Health, Moh has worked for companies such as Intuit, Cutera, Schneider Electric etc where he excelled in sales and technical product related roles. Moh holds a BS in Information Systems and Business Management as well as an MBA concentration in Data Analytics from Boston College. ",
        "When he isn't building solutions to the worlds largest healthcare issues he loves to stay active, workout, play sports, read non fiction books, and travel.",
      ],
    },
    {
      id: 2,
      icon: "../../assets/headshots/TejvirSaggu.png",
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
      icon: "../../assets/headshots/DenisHallvaxhiu.png",
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
      icon: "../../assets/headshots/KefanXu.png",
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
      icon: "../../assets/headshots/CharanJagwani.png",
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
      icon: "../../assets/headshots/VincentFang.png",
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
      icon: "../../assets/headshots/RohithNair.png",
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
      icon: "../../assets/headshots/RogerChang.png",
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
      icon: "../../assets/headshots/AnubhavSharma.png",
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
      icon: "../../assets/headshots/KateChan.png",
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
      icon: "../../assets/headshots/SaachiJain.png",
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
      icon: "../../assets/headshots/YuelinLiu.png",
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
      icon: "../../assets/headshots/Dr.Denmark.png",
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
      icon: "../../assets/headshots/Dr.Ruff.png",
      name: "Dr. Ruff",
      title: "Medical Advisor",
      bio: "Dr. Ruff graduated from Harvard University, earned his medical degree at Johns Hopkins University School of Medicine, and his masters of public health from the Harvard School of Public Health. Dr. Ruff completed his internal medicine residency and cardiovascular medicine fellowship at the Brigham and Women's Hospital.",
      about: [
        "Christian T. Ruff, MD, MPH is the Director of General Cardiology in the Cardiovascular Division at Brigham and Women's Hospital in Boston, MA and an Associate Professor of Medicine at Harvard Medical School.",
        "Dr. Ruff is a Senior Investigator in the Thrombolysis in Myocardial Infarction (TIMI) Study Group and serves the Director of the Genetics Core Laboratory and the Co-Chairman of the Clinical Events Committee. He has led a broad array of projects, ranging from investigator initiated studies of biomarkers and genetic variants to large clinical trials. ",
        "Dr. Ruff has served on international clinical guideline committees and has been invited to give hundreds of lectures nationally and internationally. He has authored many scholarly articles, editorials, reviews, and book chapters that include the New England Journal of Medicine, Lancet, Journal of the American Medical Association, American Journal of Medicine, Circulation, Journal of the American College of Cardiology, and Nature Reviews Cardiology.",
      ],
    },
  ];*/
  //makes blank object and put in id to get data required from row in db with same id
  advisors:[];
  advisorId:any;
  constructor(private router: Router,
    private advisorService: AdvisorService,
    private route: ActivatedRoute
) {
}

  ngOnInit() {
    this.advisorId=this.route.snapshot.paramMap.get('advisor');
    console.log(this.advisorId)
    this.advisorService.getAdvisor(this.advisorId).subscribe((data)=>{
      console.log(data)
      this.advisors=data
    })
  }
}