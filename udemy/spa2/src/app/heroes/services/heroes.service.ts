import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(){

    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);

  }

  getHeroePorId(id: string){
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }
}
