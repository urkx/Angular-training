import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { element } from 'protractor';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
       height: 100%;
       width: 100%;
     }

     .row{
       background-color: white;
       position: fixed;
       bottom: 50px;
       left: 50px;
       padding: 10px;
       border-radius: 5px;
       z-index: 999999;
       width: 400px;
     }
   `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-6.0051704, 37.408372];

  constructor() { }

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel
    });

    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola Mundo';

    new mapboxgl.Marker(
      //{element: markerHtml}
      )
      .setLngLat(this.center)
      .addTo(this.mapa);
  }

}
