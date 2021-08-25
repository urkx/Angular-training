import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _http: HttpClient) { 
    console.log('Spotify service listo');
  }

  getQuery(query: string){
    const URL = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer BQDuD9PQJMLf-XNTy6eo0Sk_hpvo6dKSKDD5eL8wmnbNanP7YDmD5aElQYIi0wRgpst1NDAbbwoidSQhyYQ'
      }
    );

    return this._http.get(URL, {headers});

  }

  getNewReleases(){

    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( (data: any) => {
                      return data.albums.items;
                } ) );
  }

  getArtista(termino: string){
    
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                .pipe( map( (data: any) => {
                      return data.artists.items;
                } ) );
  }
}
