import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'UtIw1Wtv0xZeOZB3s2FtxqfVxXeDXsgr';

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) { }

  get historial()
  {
    return [...this._historial];
  }

  buscarGifs(query: string)
  {
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    .subscribe( response => {
      console.log(response.data);
      this.resultados = response.data;
    } );
    
  }
}
