import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  
  public movie:MovieResponse;
  public cast:Cast[]=[];
  public cargando:boolean=true;

  constructor(private activatedRoute:ActivatedRoute,
              private peliculasService:PeliculasService,
              private location:Location,
              private router:Router) { 
                this.cargando=true;
              }

  ngOnInit(): void {
  
    const {id}=this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCredits(id)
    ]).subscribe(([movie,cast])=>{
      // console.log(objeto);
      if(!movie){
        return this.router.navigate(['/home']);
      }
      // console.log(movie);
      this.movie=movie;
      this.cast=cast.filter(actor=>actor.profile_path!=null);
      this.cargando=false;
    });

    // this.peliculasService.getPeliculaDetalle(id).subscribe(movie=>{
    //   if(!movie){
    //     return this.router.navigate(['/home']);
    //   }
    //   // console.log(movie);
    //   this.movie=movie;
    // });

    // this.peliculasService.getCredits(id).subscribe(cast=>{
      
    //   this.cast=cast.filter(actor=>actor.profile_path!=null);
    //   console.log(this.cast);
    // })
  }

  onRegresar(){
    this.location.back();
  }

}
