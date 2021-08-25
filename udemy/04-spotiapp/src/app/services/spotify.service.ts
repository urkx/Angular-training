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
        'Authorization': 'Bearer BQCWenBcamG58Nckc4maajP_QnrOiI_RRih_HWIZfI3ltE8Eov7jYwNGpYa_dTo7W1XEcYQsnuJnVJlI3uk'
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

  getArtistas(termino: string){
    
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                .pipe( map( (data: any) => {
                      return data.artists.items;
                } ) );
  }

  getArtista(id: string){
    
    return this.getQuery(`artists/${id}`);
                
  }

  getTopTracks(id: string){
    
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
              .pipe( map( (data: any) => {
                return data.tracks;
          } ) );
                
  }
}
