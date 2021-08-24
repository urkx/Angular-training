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
        'Authorization': 'Bearer BQCyfruFXJzyAany5toZ7rm6zSnfdqZBR4g-Klo8Tsh1nwNtPQusJxlQC5yHfusBFrs9uwILAu82Kf4hMwY'
      }
    );

    this._http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers})
    .subscribe( data => {console.log(data);} );
  }
}
