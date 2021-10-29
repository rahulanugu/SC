// Created by Sammy - access to default blog data
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class BlogService {
    constructor() { }

    blogList = [
        { category: 'updates', link: '../../assets/images/food1.jpg' },
        { category: 'patient', link: '../../assets/images/familypic1.jpg' },
        { category: 'updates', link: '../../assets/images/graph1.jpg' },
        { category: 'patient', link: '../../assets/images/loveself1.jpg' },
        { category: 'invest', link: '../../assets/images/nurse1.jpg' },
        { category: 'invest', link: '../../assets/images/nurse2.jpg' },
        { category: 'updates', link: '../../assets/images/otoscope.jpg' },
        { category: 'ai', link: '../../assets/images/surgery1.jpg' },
    ];
    
    categoryList = [
        { value: "updates", name: "Scriptchain Updates" },
        { value: "ai", name: "AI" },
        { value: "invest", name: "Investing in Healthcare" },
        { value: "patient", name: "Patient Outcomes" },
        { value: "scholar", name: "Scholarly Articles" },
        { value: "industry", name: "What the Industry is Saying" }
    ];
}