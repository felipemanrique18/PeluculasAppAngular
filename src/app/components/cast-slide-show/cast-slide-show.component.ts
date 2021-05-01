import { Component, Input, OnInit } from '@angular/core';
import { Cast } from '../../interfaces/credits-response';

import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit {
  
  @Input() cast:Cast[];
  public swiper:Swiper;
  constructor() { }

  ngOnInit(): void {
    console.log(this.cast);
  }

  ngAfterViewInit(): void {
    //Add 'implements AfterViewInit' to the class.
    this.swiper=new Swiper('.swiper-container', {
      slidesPerView:5.3,
      freeMode:true,
      spaceBetween:15
    });
    
  }

  onSliderPrev(){
    this.swiper.slidePrev();
  }

  onSliderNext(){
    this.swiper.slideNext();
  }

}
