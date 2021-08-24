import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  paises: any[] = [];

  constructor( private _spotify: SpotifyService) { 
    this._spotify.getNewReleases();
  }

  ngOnInit(): void {
  }

}
