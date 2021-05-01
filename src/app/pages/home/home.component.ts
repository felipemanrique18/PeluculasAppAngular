import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public movies:Movie[]=[];
  public moviesSlideShow:Movie[]=[];
  public cargando:boolean=false;

  @HostListener('window:scroll',['$event'])onScroll(){
    const pos=(document.documentElement.scrollTop || document.body.scrollTop)+1300;
    const max=(document.documentElement.scrollHeight || document.body.scrollHeight);
    

    if(pos>max){
      this.peliculasService.getCartelera().subscribe(resp=>{
        this.movies.push(...resp);
      })
    }

  }
  constructor(private peliculasService:PeliculasService) { }

  ngOnInit(): void {
    this.cargando=true;
    this.peliculasService.getCartelera().subscribe(movies=>{
      this.movies=movies;
      this.moviesSlideShow=movies;
      this.cargando=false;
    })

  }

  
  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }

}
