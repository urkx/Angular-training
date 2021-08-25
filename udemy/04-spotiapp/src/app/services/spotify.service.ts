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

  getNewReleases(){
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer BQDuD9PQJMLf-XNTy6eo0Sk_hpvo6dKSKDD5eL8wmnbNanP7YDmD5aElQYIi0wRgpst1NDAbbwoidSQhyYQ'
      }
    );

    return this._http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers})
                .pipe( map( (data: any) => {
                      return data.albums.items;
                } ) );
  }

  getArtista(termino: string){
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer BQDuD9PQJMLf-XNTy6eo0Sk_hpvo6dKSKDD5eL8wmnbNanP7YDmD5aElQYIi0wRgpst1NDAbbwoidSQhyYQ'
      }
    );

    return this._http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers})
                .pipe( map( (data: any) => {
                      return data.artists.items;
                } ) );
  }
}
