import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {


  public swiper:Swiper;
  @Input() movies:Movie[];
  constructor() { }


  public ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.swiper=new Swiper('.swiper-container', {
      loop: true,
    });
    
  }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  onSliderPrev(){
    this.swiper.slidePrev();
  }

  onSliderNext(){
    this.swiper.slideNext();
  }

}
