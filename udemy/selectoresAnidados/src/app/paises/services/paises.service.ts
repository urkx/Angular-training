import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private _baseUrl: string = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }

  get regiones(): string[]{
    return [...this._regiones];
  }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]>{
    return this.http.get<PaisSmall[]>(`${this._baseUrl}/region/${region}?field=alpha3Code;name`);
  }

  getPaisPorCodigo(alpha: string): Observable<Pais | null>{
    if(!alpha){
      return of(null);
    }
    return this.http.get<Pais>(`${this._baseUrl}/alpha/${alpha}`);
  }

  getPaisPorCodigoSmall(alpha: string): Observable<PaisSmall>{
    return this.http.get<PaisSmall>(`${this._baseUrl}/alpha/${alpha}?field=alpha3Code;name`);
  }

  getPaisesPorFronteras(borders: string[]): Observable<PaisSmall[]>{
    if(!borders){
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach(codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
