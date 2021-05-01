import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap,map, catchError } from "rxjs/operators";
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl="https://api.themoviedb.org/3";
  private carteleraPage=1;
  public cargando:boolean=false;

  constructor(private http:HttpClient) { 
    // this.getCartelera();
  }

  get params(){
    return {
      api_key:'80c3d3d44f559dffee92a2e6631ce6f2',
      language:'es',
      page:this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<Movie[]>{
    
    
    if (this.cargando){
      return of([]);
    }
    this.cargando=true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{params:this.params}).pipe(
      map((resp)=>resp.results),
      tap(()=>{ 
      this.carteleraPage+=1;
      this.cargando=false;
    }));
  }

  buscarPelicula(pelicula:string){

    const params={...this.params,page:'1',query:pelicula};
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{params}).pipe(
      map(resp=>resp.results)
    )
  }

  resetCarteleraPage(){
    this.carteleraPage=1;
  }

  getPeliculaDetalle(id:string){

    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`,{
      params:this.params
    }).pipe(
      catchError(err=>of(null))
    )
  }

  getCredits(id:string):Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`,{
      params:this.params
    }).pipe(
      map(resp=>resp.cast),
      catchError(err=>of(null))
    );
  }
}
