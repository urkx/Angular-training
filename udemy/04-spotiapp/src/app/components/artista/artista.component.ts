import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  loading: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _spotify: SpotifyService) {
    this._activatedRoute.params.subscribe(
      params => {
        this.getArtista(params['id']);
      }
    );
   }

  ngOnInit(): void {
  }

  getArtista(id: string)
  {
    this.loading = true;
    this._spotify.getArtista(id).subscribe(artista =>
      
      {
        this.artista = artista;
      }

      );
    this.loading = false;
  }

}
