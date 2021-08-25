import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
        'Authorization': 'Bearer BQDgsEcvtVcoaU6CqfM6Jmgyjj5fhsAjD0uBUXpLg8mO-e--6cII3v_YPn6221_dxf9-bWWxLb9IFvLMyDA'
      }
    );

    return this._http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers});
  }
}
