import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private _spotify: SpotifyService) { 
    this.loading = true;
    this.error = false;

    this._spotify.getNewReleases()
    .subscribe( 
        (data: any) => 
        {

          this.nuevasCanciones = data;

        }, 
        (error) => 
        {
          this.error = true;
          this.mensajeError = error.error.error.message;
        } 
    );
    
    this.loading = false;
  }

  ngOnInit(): void {
  }

}
