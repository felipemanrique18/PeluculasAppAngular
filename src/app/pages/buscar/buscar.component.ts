import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public movies:Movie[];
  public pelicula:string;
  public cargando:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,
              private peliculasService:PeliculasService) {
                this.cargando=true;
               }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.pelicula=params.texto;
      this.peliculasService.buscarPelicula(params.texto).subscribe(movies=>{
        this.movies=movies;
        this.cargando=false;
      })
    })
  }

}
