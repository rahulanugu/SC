import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-faq1',
  templateUrl: './landing-faq1.component.html',
  styleUrls: ['./landing-faq1.component.css']
})
export class LandingFaq1Component implements OnInit {

  constructor() { }

  dataInfo: {
    title: string;
    info: string;
    isCollapsed: boolean;
  }[] = [
    {
      title: "What is ScriptChain Health?",
      info: "ScriptChain Health is an AI based platform that helps physicians with identifying high risk patients of readmission and cardiovascular disease with actionable insights. We are a plug-in to the major EMR systems that helps physicians save time and generate more revenue for their facility.",
      isCollapsed: true,
    },
    {
      title: "Who are the users?",
      info: "Our main users are Primary Care Physicians and Cardiologists.",
      isCollapsed: true,
    },
    {
      title: "How can I sign up?",
      info: "We have a sign up form that you can fill out and we will keep you informed with our progress and launch! Looking forward to speaking to you soon!",
      isCollapsed: true,
    },
    {
      title: "What is a digital health platform?",
      info: "Digital health technologies use computing platforms, connectivity, software, and sensors for health care and related uses. These technologies span a wide range of uses, from applications in general wellness to applications as a medical device.",
      isCollapsed: true,
    }
    ,
    {
      title: "What is AI in Cardiology?",
      info: "AI in cardiology programs computers to process and respond to data quickly and consistently for better treatment outcomes. Uses include detecting heart disease, treating strokes faster and enhancing diagnostic radiology capabilities.",
      isCollapsed: true,
    }
    ,
    {
      title: "Why are hospital readmissions a problem?",
      info: "Readmissions have a negative impact on revenue, due to penalties charged by CMS and other payers. The cost of hospital readmissions is enormous, estimated to be in the vicinity of $26 billion annually (Wilson, 2019), so it’s no wonder Medicare is working to reduce this amount. According to the Advisory Board, “In FY 2019, 82% of hospitals in the program received readmissions penalties.",
      isCollapsed: true,
    }
    ,
    {
      title: "What is the future of digital health?",
      info: "Innovations such as artificial intelligence are making a difference in quality of care, according to experts in a recent panel discussion.",
      isCollapsed: true,
    }
    ,
    {
      title: "Why is preventive health care important?",
      info: "      Getting preventive care reduces the risk for diseases, disabilities, and death — yet millions of people in the United States don’t get recommended preventive health care services",
      isCollapsed: true,
    }
    ,
    {
      title:"What is software as a medical device?",
      info:'It is "software intended to be used for one or more medical purposes that perform these purposes without being part of a hardware medical device."',
      isCollapsed:true
    }
  ];

  ngOnInit() {
  }

}
